// Inject Arcuata font once
if (!document.querySelector('link[data-arcuata]')) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.cdnfonts.com/css/arcuata';
  link.dataset.arcuata = '1';
  document.head.appendChild(link);
}

class TestimonialCard extends HTMLElement {
  connectedCallback() {
    const avatar = this.getAttribute('avatar') || '';
    const org = this.getAttribute('org') || '';
    const person = this.getAttribute('person') || '';
    const quote = this.getAttribute('quote') || '';

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
      <p style="font-family:'Arcuata',Georgia,serif;font-size:14px;color:#ffffff;line-height:1.65;margin:0;">${quote}</p>
    `;
  }
}

customElements.define('testimonial-card', TestimonialCard);

class TestimonialStrip extends HTMLElement {
  connectedCallback() {
    this.style.cssText = `
      display: flex;
      gap: 16px;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      padding: 8px 0 16px;
      -webkit-overflow-scrolling: touch;
    `;

    // Hide webkit scrollbar via a one-time injected style tag
    if (!document.querySelector('style[data-testimonial-strip]')) {
      const style = document.createElement('style');
      style.dataset.testimonialStrip = '1';
      style.textContent = 'testimonial-strip::-webkit-scrollbar { display: none; }';
      document.head.appendChild(style);
    }
  }
}

customElements.define('testimonial-strip', TestimonialStrip);
