(() => {
const COMPONENT_STYLE = new URL('./BackToTop.css', document.currentScript.src).href;

class BackToTop extends HTMLElement {
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
    const button = document.createElement('button');
    button.id = 'back-to-top';
    button.setAttribute('aria-label', '페이지 상단으로 이동');

    const icon = document.createElement('span');
    icon.className = 'material-symbols-outlined';
    icon.textContent = 'arrow_upward';

    button.append(icon);
    this.replaceChildren(button);
  }
}

if (!customElements.get('back-to-top')) {
  customElements.define('back-to-top', BackToTop);
}

})();
