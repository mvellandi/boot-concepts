class TestimonialCard extends HTMLElement {
  connectedCallback() {
    const avatar = this.getAttribute("avatar") || "";
    const org = this.getAttribute("org") || "";
    const person = this.getAttribute("person") || "";
    const quote = this.getAttribute("quote") || "";

    const avatarContent = avatar
      ? `<img src="${avatar}" alt="${org}" style="width:48px;height:48px;border-radius:50%;object-fit:cover;flex-shrink:0;">`
      : `<div style="width:48px;height:48px;border-radius:50%;background:#3c424f;flex-shrink:0;"></div>`;

    this.classList.add("t-card");
    this.style.cssText = `
      display: flex;
      flex-direction: column;
      scroll-snap-align: start;
      background: rgba(32, 35, 48, 0.75);
      border: 2px solid #e5ae3c;
      border-radius: 0;
      padding: 20px;
      gap: 14px;
      box-sizing: border-box;
    `;

    this.innerHTML = `
      <div style="display:flex;align-items:center;gap:12px;">
        ${avatarContent}
        <div>
          <div style="font-weight:600;font-size:15px;color:#ffffff;line-height:1.3;">${org}</div>
          <div style="font-size:13px;color:#919dab;margin-top:3px;">${person}</div>
        </div>
      </div>
      <p style="font-family:'Arcuata',Georgia,serif;font-size:17px;color:#ffffff;line-height:1.5;margin:0;letter-spacing:-0.3px;">${quote}</p>
    `;
  }
}

customElements.define("testimonial-card", TestimonialCard);

class TestimonialStrip extends HTMLElement {
  connectedCallback() {
    // Wrap the slotted cards in a scrollable track + arrow buttons
    const cards = Array.from(this.children);

    this.style.cssText = `
      display: block;
      position: relative;
      padding: 0 50px;
      box-sizing: border-box;
    `;

    // Build the scrollable track
    const track = document.createElement("div");
    track.dataset.track = "1";
    track.style.cssText = `
      display: flex;
      gap: 16px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      padding: 8px 0 16px 16px;
      -webkit-overflow-scrolling: touch;
      cursor: grab;
    `;
    cards.forEach((card) => {
      track.appendChild(card);
    });
    this.appendChild(track);

    // Hide webkit scrollbar
    if (!document.querySelector("style[data-testimonial-strip]")) {
      const style = document.createElement("style");
      style.dataset.testimonialStrip = "1";
      style.textContent = `
        [data-track]::-webkit-scrollbar { display: none; }
        [data-track].dragging { cursor: grabbing; user-select: none; }
        .t-card { flex: 0 0 254px; }
        @media (min-width: 640px) {
          .t-card { flex: 0 0 300px; }
          [data-track] { padding-left: 60px; }
        }
      `;
      document.head.appendChild(style);
    }

    // Arrow buttons
    const btnStyle = `
      position: absolute;
      top: 50%;
      transform: translateY(-60%);
      background: rgba(32,35,48,0.85);
      border: 1px solid #e5ae3c;
      color: #e5ae3c;
      width: 36px;
      height: 36px;
      border-radius: 0;
      cursor: pointer;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      line-height: 1;
    `;

    const prev = document.createElement("button");
    prev.innerHTML = "&#8249;";
    prev.setAttribute("aria-label", "Previous");
    prev.style.cssText = `${btnStyle}left: 0;`;

    const next = document.createElement("button");
    next.innerHTML = "&#8250;";
    next.setAttribute("aria-label", "Next");
    next.style.cssText = `${btnStyle}right: 0;`;

    const scrollBy = (dir) => {
      const cardWidth =
        track.querySelector("testimonial-card")?.offsetWidth + 16 || 316;
      track.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
    };

    prev.addEventListener("click", () => scrollBy(-1));
    next.addEventListener("click", () => scrollBy(1));

    this.appendChild(prev);
    this.appendChild(next);

    // Drag to scroll
    let isDown = false,
      startX,
      scrollLeft;

    track.addEventListener("mousedown", (e) => {
      isDown = true;
      track.classList.add("dragging");
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });
    track.addEventListener("mouseleave", () => {
      isDown = false;
      track.classList.remove("dragging");
    });
    track.addEventListener("mouseup", () => {
      isDown = false;
      track.classList.remove("dragging");
    });
    track.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      track.scrollLeft = scrollLeft - (x - startX);
    });
  }
}

customElements.define("testimonial-strip", TestimonialStrip);
