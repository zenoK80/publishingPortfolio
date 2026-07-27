(() => {
const COMPONENT_STYLE = new URL('./SiteHeader.css', document.currentScript.src).href;

class SiteHeader extends HTMLElement {
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
    this.replaceChildren(this.createHeader(), this.createMenuModal());
  }

  createHeader() {
    const header = this.createElement('header', 'site-header');
    const inner = this.createElement('div', 'inner');
    header.append(inner);

    const logo = this.createElement('h1', 'logo');
    const logoLink = document.createElement('a');
    logoLink.href = 'index.html';
    logoLink.setAttribute('aria-label', 'Zeno 홈');

    const logoImg = document.createElement('img');
    logoImg.src = 'images/zenoLogo.png';
    logoImg.alt = '';
    logoImg.className = 'logo-img';

    logoLink.append(logoImg, this.createElement('span', 'logo-text', 'Zeno'));
    logo.append(logoLink);

    inner.append(logo, this.createNav(), this.createMenuButton());
    return header;
  }

  createNav() {
    const nav = this.createElement('nav', 'nav-links');

    const docs = this.createLink('https://zeno.it.kr/', 'Docs');
    docs.target = '_blank';
    docs.rel = 'noopener noreferrer';
    docs.dataset.nav = 'works';

    const works = this.createLink('index.html#works', 'Works');
    works.dataset.nav = 'works';

    const contact = this.createLink('mailto:zenok1992@gmail.com', 'Contact ');
    contact.className = 'nav-cta';
    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '→';
    contact.append(arrow);

    nav.append(docs, works, contact);
    return nav;
  }

  createMenuButton() {
    const button = document.createElement('button');
    button.type = 'button';
    button.id = 'menu-toggle';
    button.className = 'menu-btn';
    button.setAttribute('aria-label', '메뉴 열기');
    button.setAttribute('aria-expanded', 'false');
    button.append(this.createElement('span', 'line'), this.createElement('span', 'line'));
    return button;
  }

  createMenuModal() {
    const modal = this.createElement('div', 'menu-modal');
    modal.id = 'menu-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', '네비게이션 메뉴');
    modal.setAttribute('aria-hidden', 'true');

    const inner = this.createElement('div', 'menu-modal-inner');
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'modal-close';
    close.setAttribute('aria-label', '메뉴 닫기');
    close.append(this.createElement('span', 'material-symbols-outlined', 'close'));

    const menuLinks = this.createElement('ul', 'modal-nav');
    menuLinks.append(
      this.createListItem(this.createLink('index.html', 'Home')),
      this.createListItem(this.createLink('index.html#works', 'Works'))
    );

    const socials = this.createElement('ul', 'modal-social');
    socials.append(
      this.createListItem(this.createLink('mailto:zenok1992@gmail.com', 'zenok1992@gmail.com')),
      this.createListItem(this.createExternalLink('https://zeno.it.kr/', 'Docs'))
    );

    inner.append(close, menuLinks, socials);
    modal.append(inner);
    return modal;
  }

  createExternalLink(href, text) {
    const link = this.createLink(href, `${text} `);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.append(this.createElement('span', 'ext', '↗'));
    return link;
  }

  createLink(href, text) {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = text;
    return link;
  }

  createListItem(child) {
    const item = document.createElement('li');
    item.append(child);
    return item;
  }

  createElement(tagName, className = '', text = '') {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  }
}

if (!customElements.get('site-header')) {
  customElements.define('site-header', SiteHeader);
}

})();
