// BRILLIANT Baseball Club — common.js
// Animation persona: Minimal + Directional (DESIGN.md準拠)

(() => {
  'use strict';

  // 1. Sticky header shadow on scroll
  const header = document.querySelector('[data-header]');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // 2. Mobile nav toggle
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link tap
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          navToggle.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });
  }

  // 3. Fadeup on scroll (Directional animation persona)
  const fadeTargets = document.querySelectorAll('.js-fadeup');
  if ('IntersectionObserver' in window && fadeTargets.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-shown');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    fadeTargets.forEach(el => io.observe(el));
  } else {
    fadeTargets.forEach(el => el.classList.add('is-shown'));
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealOnScroll = (targets, options = {}) => {
    if (!targets.length) return;

    targets.forEach((el, index) => {
      el.classList.add('av-scroll');
      el.style.setProperty('--av-delay', `${Math.min(index % 8, 7) * (options.delayStep || 65)}ms`);
    });

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('is-av-shown'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-av-shown');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: options.threshold || 0.16,
      rootMargin: options.rootMargin || '0px 0px -72px 0px'
    });

    targets.forEach(el => observer.observe(el));
  };

  const watchSections = (sections) => {
    if (!sections.length || prefersReducedMotion || !('IntersectionObserver' in window)) {
      sections.forEach(section => section.classList.add('is-av-section-shown'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('is-av-section-active', entry.isIntersecting);
        if (entry.isIntersecting) {
          entry.target.classList.add('is-av-section-shown');
        }
      });
    }, { threshold: 0.2, rootMargin: '-8% 0px -28% 0px' });

    sections.forEach(section => observer.observe(section));
  };

  // 4. Alvamos-inspired home motion
  const avHome = document.querySelector('.alvamos-home');
  if (avHome) {
    document.body.classList.add('av-motion-ready');

    requestAnimationFrame(() => {
      avHome.classList.add('is-av-loaded');
    });

    const avMotionTargets = [
      '.av-important',
      '.av-section-label',
      '.av-spirit__statement span',
      '.av-movie',
      '.av-spirit__body',
      '.av-interval__img',
      '.av-uniform__card',
      '.av-news .av-heading',
      '.av-news__pickup',
      '.av-news-row',
      '.av-partners__grid li',
      '.av-app__body > *'
    ];

    const avTargets = avMotionTargets
      .flatMap(selector => Array.from(document.querySelectorAll(selector)));

    avTargets.forEach((el, index) => {
      el.classList.add('av-animate');
      el.style.setProperty('--av-delay', `${Math.min(index % 6, 5) * 70}ms`);
    });

    if (!prefersReducedMotion && 'IntersectionObserver' in window && avTargets.length) {
      const avObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-av-shown');
            avObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.16, rootMargin: '0px 0px -80px 0px' });

      avTargets.forEach(el => avObserver.observe(el));
    } else {
      avTargets.forEach(el => el.classList.add('is-av-shown'));
    }

    watchSections(Array.from(avHome.querySelectorAll('section')));
  }

  // 5. Subpage motion translated from the reference site
  const avSubpage = document.querySelector('.av-subpage');
  if (avSubpage) {
    document.body.classList.add('av-motion-ready');

    requestAnimationFrame(() => {
      avSubpage.classList.add('is-av-loaded');
    });

    const heroTargets = [
      '.page-hero__eyebrow',
      '.page-hero__title',
      '.page-hero__lead',
      '.member-hero .section-head__eyebrow',
      '.member-hero h1',
      '.member-hero p:not(.section-head__eyebrow)',
      '.member-status'
    ].flatMap(selector => Array.from(avSubpage.querySelectorAll(selector)));

    heroTargets.forEach((el, index) => {
      el.classList.add('av-hero-reveal');
      el.style.setProperty('--av-delay', `${index * 90}ms`);
    });

    const subpageTargets = [
      '.section-head',
      '.team-story__text p',
      '.team-story__facts li',
      '.value-grid li',
      '.news-card-list li',
      '.next-match__card',
      '.stats-card',
      '.table-wrap',
      '.recruit-card',
      '.detail-list > div',
      '.faq-item',
      '.contact-form',
      '.contact-info',
      '.gallery-item',
      '.player-card',
      '.staff-card',
      '.timeline__item',
      '.captain-msg__body',
      '.cta-band__inner',
      '.member-login__box',
      '.member-card'
    ].flatMap(selector => Array.from(avSubpage.querySelectorAll(selector)));

    revealOnScroll(subpageTargets);
    watchSections(Array.from(avSubpage.querySelectorAll('section')));
  }

  // 6. Scroll-driven parallax and kinetic accents
  const motionRoot = document.querySelector('.alvamos-home, .av-subpage');
  if (motionRoot && !prefersReducedMotion) {
    const parallaxItems = Array.from(document.querySelectorAll([
      '[data-av-parallax]',
      '.av-hero__visual img',
      '.av-interval__img',
      '.av-uniform__bg',
      '.av-subpage .page-hero__media img',
      '.av-subpage .next-match__bg img'
    ].join(',')));
    const stripeHosts = Array.from(document.querySelectorAll([
      '.av-hero',
      '.av-uniform__stage',
      '.av-app',
      '.av-subpage .page-hero__inner',
      '.av-subpage .member-hero__grid',
      '.av-subpage .next-match'
    ].join(',')));

    let ticking = false;
    let lastY = window.scrollY;
    const updateParallax = () => {
      const viewportH = window.innerHeight || 1;
      const scrollY = window.scrollY || 0;
      const docH = Math.max(1, document.documentElement.scrollHeight - viewportH);
      const progress = Math.min(1, Math.max(0, scrollY / docH));
      document.documentElement.style.setProperty('--av-page-progress', progress.toFixed(4));
      document.body.classList.toggle('av-scroll-down', scrollY > lastY);
      document.body.classList.toggle('av-scroll-up', scrollY < lastY);

      const hero = document.querySelector('.av-hero, .av-subpage .page-hero, .av-subpage .member-hero');
      if (hero) {
        const heroProgress = Math.min(1, Math.max(0, scrollY / Math.max(1, hero.offsetHeight)));
        hero.style.setProperty('--av-hero-lift', `${Math.round(heroProgress * -56)}px`);
        hero.style.setProperty('--av-hero-zoom', `${(heroProgress * 0.035).toFixed(3)}`);
      }

      parallaxItems.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > viewportH + 120) return;
        const center = rect.top + rect.height / 2;
        const localProgress = (center - viewportH / 2) / viewportH;
        const depth = Number(el.dataset.avParallax || (index % 2 ? 18 : -14));
        el.style.setProperty('--av-parallax-y', `${Math.round(localProgress * depth)}px`);
      });

      stripeHosts.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -180 || rect.top > viewportH + 180) return;
        const localProgress = (rect.top + rect.height / 2 - viewportH / 2) / viewportH;
        const polarity = index % 2 ? -1 : 1;
        el.style.setProperty('--av-stripe-x', `${Math.round(localProgress * 42 * polarity)}px`);
        el.style.setProperty('--av-stripe-y', `${Math.round(localProgress * -22)}px`);
      });

      document.querySelectorAll('.av-scroll:not(.is-av-shown)').forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < viewportH * 1.2) {
          el.classList.add('is-av-shown');
        }
      });

      lastY = scrollY;
      ticking = false;
    };

    const requestParallax = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateParallax);
      }
    };

    requestParallax();
    window.addEventListener('scroll', requestParallax, { passive: true });
    window.addEventListener('resize', requestParallax);
  }

  // 7. Topics ticker — duplicate items for seamless infinite scroll
  const ticker = document.querySelector('[data-ticker]');
  if (ticker) {
    const items = Array.from(ticker.children);
    items.forEach(item => ticker.appendChild(item.cloneNode(true)));
  }

  // 8. FAQ accordion
  document.querySelectorAll('[data-faq] .faq-item__q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  // 9. Gallery filter
  const tabs = document.querySelectorAll('[data-gallery-tabs] .filter-tabs__btn');
  const grid = document.querySelector('[data-gallery-grid]');
  if (tabs.length && grid) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');
        const filter = tab.dataset.filter;
        grid.querySelectorAll('.gallery-item').forEach(item => {
          const cat = item.dataset.cat;
          const show = filter === 'all' || cat === filter;
          item.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  // 10. Contact form — friendly stub
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = form.querySelector('.form-note');
      if (note) {
        note.textContent = 'まだ送信されません。公開前に公式LINEまたはSNSのDMリンクを接続してください。';
        note.style.color = 'var(--hit-red)';
      }
    });
  }
})();
