(() => {
const COMPONENT_STYLE = new URL('./PortfolioCard.css', document.currentScript.src).href;

class PortfolioCard extends HTMLElement {
  static get observedAttributes() {
    return [
      'category',
      'tech',
      'order',
      'href',
      'image',
      'alt',
      'tag',
      'scope',
      'date',
      'stack',
      'title',
      'desc',
      'project-id'
    ];
  }

  connectedCallback() {
    this.loadStyle();
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  loadStyle() {
    if (document.querySelector(`link[href="${COMPONENT_STYLE}"]`)) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = COMPONENT_STYLE;
    document.head.appendChild(link);
  }

  render() {
    const category = this.getAttribute('category') || '';
    const tech = this.getAttribute('tech') || '';
    const order = this.getAttribute('order') || '999';
    const href = this.getAttribute('href') || '#';
    const image = this.getAttribute('image') || '';
    const alt = this.getAttribute('alt') || this.getAttribute('title') || '';
    const tag = this.getAttribute('tag') || category;
    const scope = this.getAttribute('scope') || 'personal';
    const scopeLabel = scope === 'work' ? '실무작업' : '개인작업';
    const date = this.getAttribute('date') || '';
    const stack = this.getAttribute('stack') || tech.split(',').join(' · ');
    const title = this.getAttribute('title') || '';
    const desc = this.getAttribute('desc') || '';

    this.classList.add('card');
    this.dataset.category = category;
    this.dataset.tech = tech;
    this.dataset.order = order;
    this.dataset.scope = scope;

    const link = document.createElement('a');
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    const media = document.createElement('figure');
    media.className = 'card-media';

    const thumbnail = document.createElement('img');
    thumbnail.src = image;
    thumbnail.alt = alt;
    thumbnail.loading = 'lazy';

    const tagGroup = document.createElement('div');
    tagGroup.className = 'card-tags';

    const scopeEl = document.createElement('span');
    scopeEl.className = 'card-tag card-scope';
    scopeEl.textContent = scopeLabel;

    const tagEl = document.createElement('span');
    tagEl.className = 'card-tag card-category';
    tagEl.textContent = tag;

    tagGroup.append(scopeEl, tagEl);
    media.append(thumbnail, tagGroup);

    const body = document.createElement('div');
    body.className = 'card-body';

    const meta = document.createElement('div');
    meta.className = 'card-meta';

    const dateEl = document.createElement('span');
    dateEl.className = 'card-date';
    dateEl.textContent = date;

    const stackEl = document.createElement('span');
    stackEl.className = 'card-tech';
    stackEl.textContent = stack;

    meta.append(dateEl, stackEl);

    const titleEl = document.createElement('h4');
    titleEl.className = 'card-title';
    titleEl.textContent = title;

    const descEl = document.createElement('p');
    descEl.className = 'card-desc';
    descEl.textContent = desc;

    const arrow = document.createElement('span');
    arrow.className = 'card-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '↗';

    body.append(meta, titleEl, descEl, arrow);
    link.append(media, body);
    this.replaceChildren(link);
  }
}

if (!customElements.get('portfolio-card')) {
  customElements.define('portfolio-card', PortfolioCard);
}
})();
