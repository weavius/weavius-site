/* ==========================================================================
   WEAVIUS — SCRIPT PRINCIPAL
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. SLIDER AUTOMATIQUE & DEFILEMENT CRAN PAR CRAN (3 CARTES VISIBLES)
  // --------------------------------------------------------------------------
  const wrapper = document.querySelector('.products-slider-wrapper');
  const slider = document.querySelector('.products-slider');
  
  if (wrapper && slider) {
    const cards = slider.querySelectorAll('.phone-card');
    let autoScrollInterval = null;
    const speed = 3500; // Temps de pause entre chaque slide (3.5s)

    function slideNext() {
      if (!cards.length) return;
      
      const cardWidth = cards[0].offsetWidth;
      const gap = parseFloat(window.getComputedStyle(slider).gap) || 0;
      const step = cardWidth + gap;

      // Si on touche la fin du slider, on revient au début en douceur
      if (wrapper.scrollLeft + wrapper.clientWidth >= slider.scrollWidth - 10) {
        wrapper.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        wrapper.scrollBy({ left: step, behavior: 'smooth' });
      }
    }

    function startAutoSlide() {
      stopAutoSlide();
      autoScrollInterval = setInterval(slideNext, speed);
    }

    function stopAutoSlide() {
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
    }

    // Démarrage du défilement automatique
    startAutoSlide();

    // Pause au survol de la souris ou au touch
    wrapper.addEventListener('mouseenter', stopAutoSlide);
    wrapper.addEventListener('mouseleave', startAutoSlide);
    wrapper.addEventListener('touchstart', stopAutoSlide, { passive: true });
    wrapper.addEventListener('touchend', startAutoSlide, { passive: true });
  }

  // --------------------------------------------------------------------------
  // 2. BARRE DE PROGRESSION DE DÉFILEMENT (PROGRESS BAR)
  // --------------------------------------------------------------------------
  const progress = document.querySelector('.progress');

  function updateProgress() {
    if (!progress) return;
    const d = document.documentElement;
    const max = d.scrollHeight - d.clientHeight;
    progress.style.width = (max > 0 ? (d.scrollTop / max) * 100 : 0) + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // --------------------------------------------------------------------------
  // 3. MENU MOBILE TOGGLE
  // --------------------------------------------------------------------------
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  // --------------------------------------------------------------------------
  // 4. ANIMATIONS D'APPARITION (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach(el => observer.observe(el));
  }

  // --------------------------------------------------------------------------
  // 5. CURSEUR SUR MESURE (CUSTOM CURSOR)
  // --------------------------------------------------------------------------
  const cursor = document.querySelector('.cursor');

  if (cursor && window.matchMedia('(pointer:fine)').matches) {
    window.addEventListener('pointermove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width = '48px';
        cursor.style.height = '48px';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width = '28px';
        cursor.style.height = '28px';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. EFFET MAGNÉTIQUE (MAGNETIC ELEMENTS)
  // --------------------------------------------------------------------------
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });

    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
    });
  });

  // --------------------------------------------------------------------------
  // 7. DÉFILEMENT DOUX (SMOOTH SCROLL)
  // --------------------------------------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --------------------------------------------------------------------------
  // 8. ANNÉE DYNAMIQUE EN FOOTER
  // --------------------------------------------------------------------------
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});