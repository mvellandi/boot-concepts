// Inject Arcuata font once
if (!document.querySelector("style[data-arcuata]")) {
  const style = document.createElement("style");
  style.dataset.arcuata = "1";
  style.textContent = `
    @font-face {
      font-family: 'Arcuata';
      src: url('./arcuata/Arcuata-Regular.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
    }
    @font-face {
      font-family: 'Arcuata';
      src: url('./arcuata/Arcuata-Bold.woff2') format('woff2');
      font-weight: 700;
      font-style: normal;
    }
  `;
  document.head.appendChild(style);
}

class TestimonialCard extends HTMLElement {
  connectedCallback() {
    const avatar = this.getAttribute("avatar") || "";
    const org = this.getAttribute("org") || "";
    const person = this.getAttribute("person") || "";
    const quote = this.getAttribute("quote") || "";

    const avatarContent = avatar
      ? `<img src="${avatar}" alt="${org}" style="width:48px;height:48px;border-radius:50%;object-fit:cover;flex-shrink:0;">`
      : `<div style="width:48px;height:48px;border-radius:50%;background:#3c424f;flex-shrink:0;"></div>`;

    this.style.cssText = `
      display: flex;
      flex-direction: column;
      flex: 0 0 300px;
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
      <p style="font-family:'Arcuata',Georgia,serif;font-size:16px;color:#ffffff;line-height:1.65;margin:0;">${quote}</p>
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
      padding: 0 32px;
      box-sizing: border-box;
    `;

    // Gradient fade overlays on left and right edges
    if (!document.querySelector("style[data-testimonial-gradients]")) {
      const style = document.createElement("style");
      style.dataset.testimonialGradients = "1";
      style.textContent = `
        testimonial-strip::before,
        testimonial-strip::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 52px;
          z-index: 5;
          pointer-events: none;
        }
        testimonial-strip::before {
          left: 0;
          background: linear-gradient(to right, #121620 0%, transparent 100%);
        }
        testimonial-strip::after {
          right: 0;
          background: linear-gradient(to left, #121620 0%, transparent 100%);
        }
      `;
      document.head.appendChild(style);
    }

    // Build the scrollable track
    const track = document.createElement("div");
    track.dataset.track = "1";
    track.style.cssText = `
      display: flex;
      gap: 16px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      padding: 8px 0 16px 60px;
      -webkit-overflow-scrolling: touch;
      cursor: grab;
    `;
    cards.forEach((card) => { track.appendChild(card); });
    this.appendChild(track);

    // Hide webkit scrollbar
    if (!document.querySelector("style[data-testimonial-strip]")) {
      const style = document.createElement("style");
      style.dataset.testimonialStrip = "1";
      style.textContent = `
        [data-track]::-webkit-scrollbar { display: none; }
        [data-track].dragging { cursor: grabbing; user-select: none; }
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
      const cardWidth = track.querySelector("testimonial-card")?.offsetWidth + 16 || 316;
      track.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
    };

    prev.addEventListener("click", () => scrollBy(-1));
    next.addEventListener("click", () => scrollBy(1));

    this.appendChild(prev);
    this.appendChild(next);

    // Drag to scroll
    let isDown = false, startX, scrollLeft;

    track.addEventListener("mousedown", (e) => {
      isDown = true;
      track.classList.add("dragging");
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });
    track.addEventListener("mouseleave", () => { isDown = false; track.classList.remove("dragging"); });
    track.addEventListener("mouseup", () => { isDown = false; track.classList.remove("dragging"); });
    track.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      track.scrollLeft = scrollLeft - (x - startX);
    });
  }
}

customElements.define("testimonial-strip", TestimonialStrip);
