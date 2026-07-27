(() => {
const COMPONENT_STYLE = new URL('./HeroSection.css', document.currentScript.src).href;

class HeroSection extends HTMLElement {
  connectedCallback() {
    this.loadStyle();
    this.render();
  }

  loadStyle() {
    if (document.querySelector(`link[href="${COMPONENT_STYLE}"]`)) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = COMPONENT_STYLE;
    document.head.appendChild(link);
  }

  render() {
    const section = this.createElement('section', 'hero');
    const inner = this.createElement('div', 'inner');

    const tag = this.createElement('span', 'hero-tag', 'Available for work - 2026');

    const title = this.createElement('h2', 'hero-title');
    const lineOne = this.createElement('span', 'line line-1', "Hi, I'm ");
    const name = document.createElement('em');
    name.textContent = 'Zeno';
    lineOne.append(name, document.createTextNode('.'));

    const lineTwo = this.createElement('span', 'line line-2', 'Developer who designs.');

    title.append(lineOne, lineTwo);
    inner.append(tag, title);
    section.append(inner);
    this.replaceChildren(section);
  }

  createElement(tagName, className = '', text = '') {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  }
}

if (!customElements.get('hero-section')) {
  customElements.define('hero-section', HeroSection);
}
})();
