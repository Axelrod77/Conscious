// ── NAV SCROLL ────────────────────────────────────────────────────────────
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ── HAMBURGER ─────────────────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('nav-mobile');
if (hamburger && navMobile) {
  hamburger.addEventListener('click', () => navMobile.classList.toggle('open'));
  navMobile.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navMobile.classList.remove('open'))
  );
}

// ── REVEAL ON SCROLL ──────────────────────────────────────────────────────
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── HERO DEMO ─────────────────────────────────────────────────────────────
const demoText   = document.getElementById('demoText');
const demoCursor = document.getElementById('demoCursor');
const voiceWaves = document.getElementById('voiceWaves');
const demoCcs    = document.getElementById('demoCcs');
const ccsBar     = document.getElementById('ccsBar');
const ccsScore   = document.getElementById('ccsScore');
const ccsMsg     = document.getElementById('ccsMsg');

if (demoText) {
  const PHRASE = "Called Sarah Chen — VP Engineering. They're evaluating Q4 enterprise tier. She wants a pilot with the infrastructure team first. Budget pre-approved: $80K/yr. Follow-up Tuesday 2pm.";

  function runDemo() {
    // Reset state
    demoText.textContent = '';
    demoCursor.style.display = 'inline-block';
    voiceWaves.classList.remove('active');
    demoCcs.classList.remove('visible');
    ccsBar.style.width = '0%';
    ccsScore.textContent = '0%';
    ccsMsg.textContent = 'Analysing...';

    // Phase 1: listening waveform (1.5s)
    voiceWaves.classList.add('active');

    setTimeout(() => {
      voiceWaves.classList.remove('active');

      // Phase 2: typewrite the transcription
      let i = 0;
      const interval = setInterval(() => {
        if (i < PHRASE.length) {
          demoText.textContent = PHRASE.slice(0, ++i);
        } else {
          clearInterval(interval);

          // Phase 3: CCS score animation
          demoCursor.style.display = 'none';
          demoCcs.classList.add('visible');

          let score = 60;
          const target = 96;
          const scoreAnim = setInterval(() => {
            score = Math.min(score + 3, target);
            ccsScore.textContent = score + '%';
            ccsBar.style.width = score + '%';
            if (score >= target) {
              clearInterval(scoreAnim);
              ccsMsg.textContent = 'Auto-committed ✓';
              // Loop demo after 3.5s pause
              setTimeout(runDemo, 3500);
            }
          }, 30);
        }
      }, 22 + Math.random() * 16);
    }, 1600);
  }

  // Start demo after short delay
  setTimeout(runDemo, 1000);
}

// ── CODE TABS ─────────────────────────────────────────────────────────────
document.querySelectorAll('.ctab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    document.querySelectorAll('.ctab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.cpane').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const pane = document.getElementById('tab-' + target);
    if (pane) pane.classList.add('active');
  });
});

// ── TRIAL FORM ────────────────────────────────────────────────────────────
const trialForm = document.getElementById('trialForm');
if (trialForm) {
  trialForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = trialForm.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    btn.textContent = '✓ Request received! We\'ll be in touch within 24h.';
    btn.style.background = 'var(--green)';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
      btn.disabled = false;
      trialForm.reset();
    }, 5000);
  });
}

// ── SMOOTH SCROLL ─────────────────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const t = document.querySelector(this.getAttribute('href'));
    if (t) {
      e.preventDefault();
      window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
    }
  });
});

// ── COUNTER ANIMATION (for the big 3x / 40 / 150 numbers) ────────────────
function animateCounter(el, target, duration = 1200, suffix = '') {
  const start = performance.now();
  const startVal = 0;
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startVal + (target - startVal) * eased);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// Trigger counters when the tax-versus section comes into view
const versusSection = document.querySelector('.tax-versus');
if (versusSection) {
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const typingNum = versusSection.querySelector('.tv-typing .tv-number');
        const voiceNum  = versusSection.querySelector('.tv-voice .tv-number');
        if (typingNum) animateCounter(typingNum, 40, 1000);
        if (voiceNum)  setTimeout(() => animateCounter(voiceNum, 150, 1200), 300);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  counterObs.observe(versusSection);
}

// Animate hero stats
const heroStatNums = document.querySelectorAll('.hstat-num');
if (heroStatNums.length) {
  const heroObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        heroStatNums.forEach((el, i) => {
          const raw = el.textContent.replace(/[^0-9.×%]/g, '');
          // Only animate pure numbers
          const num = parseFloat(raw);
          if (!isNaN(num) && !el.dataset.animated) {
            el.dataset.animated = '1';
            const suffix = el.textContent.replace(/[0-9]/g, '').trim();
            setTimeout(() => animateCounter(el, Math.round(num), 900, suffix), i * 150);
          }
        });
        heroObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  heroObs.observe(document.querySelector('.hero-stat-row'));
}
