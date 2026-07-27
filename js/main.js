(() => {
  'use strict';

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => parent.querySelectorAll(selector);

  const Pagination = {
    pageSize: 9,
    currentPage: 1,
    totalPages: 1,
    visibleCards: [],
    pagination: null,
    list: null,
    prevBtn: null,
    nextBtn: null,
    initialized: false,

    init() {
      this.pagination = $('#pagination');
      this.list = $('#pagination-list');
      this.prevBtn = $('#pagination-prev');
      this.nextBtn = $('#pagination-next');
      this.initialized = true;

      if (!this.pagination || !this.list || !this.prevBtn || !this.nextBtn) return;

      this.prevBtn.addEventListener('click', () => this.goTo(this.currentPage - 1));
      this.nextBtn.addEventListener('click', () => this.goTo(this.currentPage + 1));
    },

    reset() {
      if (!this.initialized) return;

      this.visibleCards = Array.from($$('.card:not(.hidden)'));
      this.totalPages = Math.max(1, Math.ceil(this.visibleCards.length / this.pageSize));
      this.currentPage = 1;
      this.render();
      this.update();
    },

    goTo(page) {
      const nextPage = Math.min(Math.max(page, 1), this.totalPages);
      if (nextPage === this.currentPage) return;

      this.currentPage = nextPage;
      this.update();

      const works = $('#works');
      if (works) {
        works.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },

    render() {
      if (!this.pagination || !this.list) return;

      this.pagination.hidden = this.visibleCards.length <= this.pageSize;
      this.list.replaceChildren();

      for (let page = 1; page <= this.totalPages; page += 1) {
        const item = document.createElement('li');
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'pagination-page';
        button.textContent = String(page);
        button.setAttribute('aria-label', `${page} 페이지`);
        button.addEventListener('click', () => this.goTo(page));
        item.append(button);
        this.list.append(item);
      }
    },

    update() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;

      this.visibleCards.forEach((card, index) => {
        card.classList.toggle('paginated-hidden', index < start || index >= end);
      });

      if (this.prevBtn) this.prevBtn.disabled = this.currentPage === 1;
      if (this.nextBtn) this.nextBtn.disabled = this.currentPage === this.totalPages;

      $$('.pagination-page', this.list).forEach((button, index) => {
        const isCurrent = index + 1 === this.currentPage;
        button.classList.toggle('active', isCurrent);
        if (isCurrent) button.setAttribute('aria-current', 'page');
        else button.removeAttribute('aria-current');
      });
    }
  };

  const Filter = {
    cards: [],
    filterButtons: [],
    scopeButtons: [],
    visibleCountEl: null,
    totalCountEl: null,
    emptyState: null,
    liveRegion: null,
    currentCategory: 'all',
    currentScope: 'all',
    initialized: false,

    init() {
      this.cards = Array.from($$('.card'));
      this.filterButtons = $$('.category-filter-nav li');
      this.scopeButtons = $$('.scope-filter-nav li');
      this.visibleCountEl = $('.visible-count');
      this.totalCountEl = $('.total-count');
      this.emptyState = $('#empty-state');
      this.liveRegion = $('#filter-live-region');
      this.initialized = true;

      this.cards.forEach(card => {
        const order = parseInt(card.dataset.order, 10);
        if (!Number.isNaN(order)) {
          card.style.order = order;
        }
      });

      this.filterButtons.forEach(li => {
        const btn = li.querySelector('button');
        if (!btn) return;

        btn.addEventListener('click', () => {
          this.filterButtons.forEach(item => item.classList.remove('active'));
          li.classList.add('active');
          this.currentCategory = btn.dataset.filter;
          this.apply();
        });
      });

      this.scopeButtons.forEach(li => {
        const btn = li.querySelector('button');
        if (!btn) return;

        btn.addEventListener('click', () => {
          this.scopeButtons.forEach(item => item.classList.remove('active'));
          li.classList.add('active');
          this.currentScope = btn.dataset.scopeFilter;
          this.updateCategoryCounts();
          this.apply();
        });
      });

      this.updateCategoryCounts();
      this.apply();
    },

    updateCategoryCounts() {
      const scopedCards = this.cards.filter(
        card => this.currentScope === 'all' || card.dataset.scope === this.currentScope
      );

      const counts = { all: scopedCards.length, site: 0, toy: 0, UXUI: 0, Graphic: 0 };

      scopedCards.forEach(card => {
        const category = card.dataset.category;
        if (counts[category] !== undefined) counts[category] += 1;
      });

      const scopeCounts = { all: this.cards.length, personal: 0, work: 0 };
      this.cards.forEach(card => {
        const scope = card.dataset.scope || 'personal';
        if (scopeCounts[scope] !== undefined) scopeCounts[scope] += 1;
      });

      this.filterButtons.forEach(li => {
        const btn = li.querySelector('button');
        if (!btn) return;

        const filter = btn.dataset.filter;
        const countSpan = btn.querySelector('.count');
        if (countSpan) countSpan.textContent = `(${counts[filter] || 0})`;
      });

      this.scopeButtons.forEach(li => {
        const btn = li.querySelector('button');
        if (!btn) return;

        const filter = btn.dataset.scopeFilter;
        const countSpan = btn.querySelector('.count');
        if (countSpan) countSpan.textContent = `(${scopeCounts[filter] || 0})`;
      });

      if (this.totalCountEl) {
        this.totalCountEl.textContent = scopedCards.length;
      }
    },

    apply() {
      let visibleCount = 0;

      this.cards.forEach(card => {
        const category = card.dataset.category;
        const scopeMatch = this.currentScope === 'all' || card.dataset.scope === this.currentScope;
        const categoryMatch = this.currentCategory === 'all' || category === this.currentCategory;
        const shouldShow = scopeMatch && categoryMatch;

        card.classList.toggle('hidden', !shouldShow);
        if (shouldShow) visibleCount += 1;
      });

      if (this.visibleCountEl) {
        this.visibleCountEl.textContent = visibleCount;
      }

      if (this.emptyState) {
        this.emptyState.hidden = visibleCount !== 0;
      }

      if (this.liveRegion) {
        this.liveRegion.textContent = `${visibleCount}개의 작업물이 표시되었습니다.`;
      }

      Pagination.reset();
    }
  };

  const BackToTop = {
    btn: null,

    init() {
      this.btn = $('#back-to-top');
      if (!this.btn) return;

      let ticking = false;
      window.addEventListener('scroll', () => {
        if (ticking) return;

        requestAnimationFrame(() => {
          this.btn.classList.toggle('visible', window.scrollY > 600);
          ticking = false;
        });
        ticking = true;
      });

      this.btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  const Menu = {
    btn: null,
    modal: null,
    closeBtn: null,

    init() {
      this.btn = $('#menu-toggle');
      this.modal = $('#menu-modal');
      this.closeBtn = $('.modal-close');

      if (!this.btn || !this.modal) {
        console.warn('Menu elements not found.');
        return;
      }

      this.btn.addEventListener('click', () => this.toggle());

      if (this.closeBtn) {
        this.closeBtn.addEventListener('click', () => this.close());
      }

      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && this.modal.classList.contains('open')) {
          this.close();
        }
      });

      this.modal.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', () => this.close());
      });

      this.modal.addEventListener('click', event => {
        if (event.target === this.modal) this.close();
      });
    },

    open() {
      this.modal.classList.add('open');
      this.btn.classList.add('active');
      this.btn.setAttribute('aria-expanded', 'true');
      this.modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    },

    close() {
      this.modal.classList.remove('open');
      this.btn.classList.remove('active');
      this.btn.setAttribute('aria-expanded', 'false');
      this.modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    },

    toggle() {
      if (this.modal.classList.contains('open')) this.close();
      else this.open();
    }
  };

  const style = document.createElement('style');
  style.textContent = `
    .card.paginated-hidden { display: none !important; }
    .pagination[hidden] { display: none; }
  `;
  document.head.append(style);

  document.addEventListener('DOMContentLoaded', () => {
    Pagination.init();
    Filter.init();
    BackToTop.init();
    Menu.init();
  });
})();
