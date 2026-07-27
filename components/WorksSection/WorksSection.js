(() => {
const COMPONENT_STYLE = new URL('./WorksSection.css', document.currentScript.src).href;
const filters = ['all', 'site', 'toy', 'UXUI', 'Graphic'];
const scopeFilters = ['all', 'personal', 'work'];
const filterLabels = {
  all: '전체',
  site: '사이트',
  toy: '토이',
  UXUI: 'UX/UI',
  Graphic: '그래픽',
  personal: '개인작업',
  work: '실무작업'
};

class WorksSection extends HTMLElement {
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
    const section = this.createElement('section', 'works');
    section.id = 'works';

    const inner = this.createElement('div', 'inner');
    section.append(inner);

    inner.append(
      this.createHeader(),
      this.createFilters(),
      this.createGrid(),
      this.createEmptyState(),
      this.createPagination(),
      this.createLiveRegion()
    );

    this.replaceChildren(section);
  }

  createHeader() {
    const header = this.createElement('div', 'works-head');
    const titleWrap = document.createElement('div');

    const label = this.createElement('span', 'section-num', 'Works');
    const title = this.createElement('h3', 'section-title', 'Selected Works');
    titleWrap.append(label, title);

    const count = this.createElement('p', 'works-count');
    const visible = this.createElement('span', 'visible-count', '0');
    const total = this.createElement('span', 'total-count', '0');
    count.append(visible, document.createTextNode(' / '), total);

    header.append(titleWrap, count);
    return header;
  }

  createFilters() {
    const wrap = this.createElement('div', 'filters-wrap');
    const scopeNav = this.createFilterNav(scopeFilters, 'scope-filter-nav', '작업 성격 필터', 'scopeFilter');
    const categoryNav = this.createFilterNav(filters, 'category-filter-nav', '작업 분류 필터', 'filter');

    wrap.append(scopeNav, categoryNav);
    return wrap;
  }

  createFilterNav(items, className, ariaLabel, datasetKey) {
    const nav = this.createElement('ul', 'filter-nav');
    nav.classList.add(className);
    nav.setAttribute('role', 'tablist');
    nav.setAttribute('aria-label', ariaLabel);

    items.forEach((filter, index) => {
      const item = document.createElement('li');
      if (index === 0) item.classList.add('active');

      const button = document.createElement('button');
      button.type = 'button';
      button.dataset[datasetKey] = filter;
      button.append(document.createTextNode(`${filterLabels[filter] || filter} `), this.createElement('span', 'count'));

      item.append(button);
      nav.append(item);
    });

    return nav;
  }

  createGrid() {
    const grid = this.createElement('div', 'works-grid');
    grid.id = 'portfolio-grid';

    portfolioItems.forEach(item => {
      const card = document.createElement('portfolio-card');
      card.setAttribute('project-id', item.id);
      card.setAttribute('category', item.category);
      card.setAttribute('tech', item.tech);
      card.setAttribute('order', String(item.order));
      card.setAttribute('href', item.href);
      card.setAttribute('image', item.image);
      card.setAttribute('alt', item.alt);
      card.setAttribute('tag', item.tag);
      card.setAttribute('scope', item.scope || 'personal');
      card.setAttribute('date', item.date);
      card.setAttribute('stack', item.stack);
      card.setAttribute('title', item.title);
      card.setAttribute('desc', item.desc);
      grid.append(card);
    });

    return grid;
  }

  createEmptyState() {
    const empty = this.createElement('div', 'empty-state');
    empty.id = 'empty-state';
    empty.hidden = true;

    const icon = this.createElement('span', 'material-symbols-outlined', 'inventory_2');
    const title = document.createElement('h4');
    title.textContent = '작업물이 준비 중입니다.';

    const desc = document.createElement('p');
    desc.textContent = '곧 새로운 작업물로 채워둘게요.';

    empty.append(icon, title, desc);
    return empty;
  }

  createPagination() {
    const pagination = this.createElement('nav', 'pagination');
    pagination.id = 'pagination';
    pagination.setAttribute('aria-label', '작업물 페이지');

    const prev = this.createElement('button', 'pagination-arrow');
    prev.id = 'pagination-prev';
    prev.type = 'button';
    prev.setAttribute('aria-label', '이전 페이지');
    prev.append(this.createElement('span', 'material-symbols-outlined', 'chevron_left'));

    const list = this.createElement('ol', 'pagination-list');
    list.id = 'pagination-list';

    const next = this.createElement('button', 'pagination-arrow');
    next.id = 'pagination-next';
    next.type = 'button';
    next.setAttribute('aria-label', '다음 페이지');
    next.append(this.createElement('span', 'material-symbols-outlined', 'chevron_right'));

    pagination.append(prev, list, next);
    return pagination;
  }

  createLiveRegion() {
    const liveRegion = this.createElement('div', 'visually-hidden');
    liveRegion.id = 'filter-live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    return liveRegion;
  }

  createElement(tagName, className = '', text = '') {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  }
}

if (!customElements.get('works-section')) {
  customElements.define('works-section', WorksSection);
}
})();
