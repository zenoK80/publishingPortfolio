(() => {
const COMPONENT_STYLE = new URL('./SiteFooter.css', document.currentScript.src).href;

class SiteFooter extends HTMLElement {
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
    this.replaceChildren(this.createFooter(), document.createElement('back-to-top'));
  }

  createFooter() {
    const footer = this.createElement('footer', 'site-footer');
    const inner = this.createElement('div', 'inner');

    inner.append(this.createHeadline(), this.createFooterGrid(), this.createBottom());
    footer.append(inner);
    return footer;
  }

  createHeadline() {
    const headline = this.createElement('div', 'footer-headline');
    const title = document.createElement('h3');

    const firstLine = this.createElement('span', '', "Let's create");
    const secondLine = document.createElement('span');
    const emphasis = document.createElement('em');
    emphasis.textContent = 'something';
    secondLine.append(emphasis, document.createTextNode(' together.'));
    title.append(firstLine, secondLine);

    const cta = this.createLink('mailto:zenok1992@gmail.com', 'Get in touch');
    cta.className = 'footer-cta';
    cta.append(this.createElement('span', 'material-symbols-outlined', 'arrow_outward'));

    headline.append(title, cta);
    return headline;
  }

  createFooterGrid() {
    const grid = this.createElement('div', 'footer-grid');
    grid.append(
      this.createBrandColumn(),
      this.createLinkColumn('Sitemap', [
        { href: 'index.html', text: 'Home' },
        { href: 'index.html#works', text: 'Works' }
      ]),
      this.createLinkColumn('Channels', [
        { href: 'https://zeno.it.kr/', text: 'Docs', external: true }
      ]),
      this.createLinkColumn('Contact', [
        { href: 'mailto:zenok1992@gmail.com', text: 'zenok1992@gmail.com' }
      ])
    );
    return grid;
  }

  createBrandColumn() {
    const column = this.createElement('div', 'footer-col');
    const brand = this.createElement('div', 'footer-brand');

    const logo = document.createElement('img');
    logo.src = 'images/zenoLogo.png';
    logo.alt = 'Zeno';

    brand.append(logo, this.createElement('strong', '', 'Zeno'));

    const desc = document.createElement('p');
    desc.append(document.createTextNode('Web Designer & Publisher'), document.createElement('br'), document.createTextNode('based in Korea.'));

    column.append(brand, desc);
    return column;
  }

  createLinkColumn(title, links) {
    const column = this.createElement('div', 'footer-col');
    column.append(this.createElement('h5', '', title));

    const list = document.createElement('ul');
    links.forEach(item => {
      const link = this.createLink(item.href, item.text);
      if (item.external) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.append(document.createTextNode(' '), this.createElement('span', 'ext', '↗'));
      }
      const listItem = document.createElement('li');
      listItem.append(link);
      list.append(listItem);
    });

    column.append(list);
    return column;
  }

  createBottom() {
    const bottom = this.createElement('div', 'footer-bottom');
    bottom.append(
      this.createElement('span', '', '© 2026 Zeno'),
      this.createElement('span', '', 'Designed & Built by Zeno')
    );
    return bottom;
  }

  createLink(href, text) {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = text;
    return link;
  }

  createElement(tagName, className = '', text = '') {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  }
}

if (!customElements.get('site-footer')) {
  customElements.define('site-footer', SiteFooter);
}

})();
