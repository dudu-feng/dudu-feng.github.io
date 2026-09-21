(function () {
  'use strict';

  /* ============================================================
     1. 滚动渐显动画
     首屏内的元素不做动画（直接可见，避免加载闪烁），
     首屏以下元素进入视口时淡入。
     ============================================================ */
  var revealTargets = document.querySelectorAll(
    '.section__head, .about__grid, .about__block, .about__highlights, .skill-group, ' +
      '.project-card, .timeline__item, .intern-gallery, .awards-list__item, ' +
      '.awards-onsite, .cert-filter, .certs__grid, .contact__lead, .contact__links'
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
     4. 图片轮播
     基于 CSS scroll-snap：禁用 JS 时仍可横向滑动，
     这里补上箭头按钮、圆点指示器与键盘操作。
     ============================================================ */
  var ARROW_LEFT = 37;
  var ARROW_RIGHT = 39;

  function initCarousel(root) {
    var track = root.querySelector('.carousel__track');
    var prev = root.querySelector('.carousel__nav--prev');
    var next = root.querySelector('.carousel__nav--next');
    if (!track) return;

    var slides = Array.prototype.slice.call(track.children);
    if (slides.length < 2) {
      if (prev) prev.hidden = true;
      if (next) next.hidden = true;
      return;
    }

    track.tabIndex = 0;
    track.setAttribute('role', 'group');
    track.setAttribute('aria-label', root.getAttribute('aria-label') || '图片轮播');

    var dotsBox = document.createElement('div');
    dotsBox.className = 'carousel__dots';
    var dots = slides.map(function (_, i) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel__dot';
      dot.setAttribute('aria-label', '第 ' + (i + 1) + ' 张，共 ' + slides.length + ' 张');
      dot.addEventListener('click', function () {
        goTo(i);
      });
      dotsBox.appendChild(dot);
      return dot;
    });
    root.appendChild(dotsBox);

    var current = -1;

    function index() {
      var w = track.clientWidth || 1;
      return Math.min(slides.length - 1, Math.max(0, Math.round(track.scrollLeft / w)));
    }

    function goTo(i) {
      var target = Math.min(slides.length - 1, Math.max(0, i));
      track.scrollTo({ left: target * track.clientWidth, behavior: 'smooth' });
    }

    function sync() {
      var i = index();
      if (i === current) return;
      current = i;
      dots.forEach(function (dot, n) {
        dot.classList.toggle('is-active', n === i);
        dot.setAttribute('aria-current', n === i ? 'true' : 'false');
      });
      if (prev) prev.disabled = i === 0;
      if (next) next.disabled = i === slides.length - 1;
    }

    var ticking = false;
    track.addEventListener(
      'scroll',
      function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          ticking = false;
          sync();
        });
      },
      { passive: true }
    );

    if (prev) {
      prev.addEventListener('click', function () {
        goTo(index() - 1);
      });
    }
    if (next) {
      next.addEventListener('click', function () {
        goTo(index() + 1);
      });
    }

    track.addEventListener('keydown', function (e) {
      if (e.keyCode === ARROW_LEFT) {
        e.preventDefault();
        goTo(index() - 1);
      } else if (e.keyCode === ARROW_RIGHT) {
        e.preventDefault();
        goTo(index() + 1);
      }
    });

    sync();
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-carousel]'), initCarousel);

  /* ============================================================
     5. 灯箱（图片大图查看）
     ============================================================ */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.getElementById('lightbox-close');

  // 记录按下位置：在轮播里横向拖动后不应触发灯箱
  var pointerStartX = null;

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

  document.addEventListener(
    'pointerdown',
    function (e) {
      pointerStartX = e.clientX;
    },
    true
  );

  document.querySelectorAll('[data-lightbox]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      // clientX 为 0 表示键盘触发，不做拖动判定
      if (e.clientX !== 0 && pointerStartX !== null && Math.abs(e.clientX - pointerStartX) > 8) {
        return;
      }
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

  /* ============================================================
     6. 获奖证书分类筛选
     ============================================================ */
  var filterBtns = document.querySelectorAll('.cert-filter__btn');
  var certCards = document.querySelectorAll('#certs-grid .cert-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter');

      filterBtns.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      certCards.forEach(function (card) {
        var show = filter === 'all' || card.getAttribute('data-category') === filter;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* ============================================================
     7. 邮箱防爬（拼接后注入）
     源码中既不出现完整的 "@" 地址，也不出现 mailto:，
     绝大多数正则爬虫扫 HTML 源码时抓不到；
     禁用 JS 时页面保留 "xxx [at] yyy" 的降级显示，人工仍可读。
     data-mail-user / data-mail-host 用逗号分隔多段，逗号会被还原成点。
     ============================================================ */
  Array.prototype.forEach.call(document.querySelectorAll('[data-mail]'), function (card) {
    var user = (card.getAttribute('data-mail-user') || '').split(',').join('.');
    var host = (card.getAttribute('data-mail-host') || '').split(',').join('.');
    if (!user || !host) return;

    var addr = user + '@' + host;
    card.setAttribute('href', 'mailto:' + addr);

    var text = card.querySelector('.contact__card-value');
    if (text) text.textContent = addr;
  });
})();
