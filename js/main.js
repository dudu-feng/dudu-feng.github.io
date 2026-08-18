(function () {
  'use strict';

  /* ============================================================
     1. 滚动渐显动画
     首屏内的元素不做动画（直接可见，避免加载闪烁），
     首屏以下元素进入视口时淡入。
     ============================================================ */
  var revealTargets = document.querySelectorAll(
    '.section__head, .about__grid, .about__highlights, .skill-group, ' +
      '.project-card, .timeline__item, .award-card, .contact__lead, .contact__links'
  );

  var viewportH = window.innerHeight;

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  revealTargets.forEach(function (el) {
    if (el.getBoundingClientRect().top >= viewportH) {
      el.classList.add('reveal');
      io.observe(el);
    }
  });

  /* ============================================================
     2. 导航滚动高亮（scrollspy）
     ============================================================ */
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    var scrollPos = window.scrollY + 88;
    var currentId = null;

    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) {
        currentId = sec.id;
      }
    });

    navLinks.forEach(function (link) {
      var match = link.getAttribute('href') === '#' + currentId;
      link.classList.toggle('active', match);
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  /* ============================================================
     3. 移动端菜单
     ============================================================ */
  var toggle = document.getElementById('nav-toggle');
  var navList = document.getElementById('nav-links');

  function closeMenu() {
    navList.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '打开菜单');
  }

  toggle.addEventListener('click', function () {
    var open = navList.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
  });

  navList.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeMenu();
  });

  /* ============================================================
     4. 灯箱（证书大图查看）
     ============================================================ */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.hidden = false;
    requestAnimationFrame(function () {
      lightbox.classList.add('open');
    });
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function () {
      if (!lightbox.classList.contains('open')) {
        lightbox.hidden = true;
      }
    }, 220);
  }

  document.querySelectorAll('[data-lightbox]').forEach(function (el) {
    el.addEventListener('click', function () {
      openLightbox(el.getAttribute('data-lightbox'));
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
})();
