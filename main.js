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
  hamburger.addEventListener('click', () => {
    navMobile.classList.toggle('open');
  });
  navMobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navMobile.classList.remove('open'));
  });
}

// ── REVEAL ON SCROLL ──────────────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── HERO DEMO TYPEWRITER ──────────────────────────────────────────────────
const demoText = document.getElementById('demo-text');
const demoCursor = document.getElementById('demo-cursor');
const demoWave = document.getElementById('demo-wave');
const demoCcs = document.getElementById('demo-ccs');
const ccsValue = document.getElementById('ccs-value');
const ccsStatus = document.getElementById('ccs-status');

if (demoText) {
  const phrase = "Customer confirmed interest in Q4 enterprise tier. Follow up scheduled for next Tuesday. Key stakeholder: Sarah Chen, VP of Engineering.";

  let phase = 'idle';
  let charIndex = 0;
  let loopTimeout;

  function runDemo() {
    // Phase 1: show waveform (listening)
    phase = 'listening';
    demoText.textContent = '';
    demoCursor.style.display = 'inline-block';
    demoWave.classList.add('active');
    demoCcs.classList.remove('visible');

    setTimeout(() => {
      // Phase 2: start typing (transcribing)
      demoWave.classList.remove('active');
      phase = 'typing';
      charIndex = 0;
      typeNextChar();
    }, 1800);
  }

  function typeNextChar() {
    if (charIndex < phrase.length) {
      demoText.textContent = phrase.slice(0, charIndex + 1);
      charIndex++;
      const delay = 28 + Math.random() * 18;
      loopTimeout = setTimeout(typeNextChar, delay);
    } else {
      // Phase 3: show CCS
      phase = 'ccs';
      demoCursor.style.display = 'none';
      demoCcs.classList.add('visible');

      // Animate score counting up
      let score = 72;
      const target = 96;
      const countUp = setInterval(() => {
        score += 2;
        if (score >= target) {
          score = target;
          clearInterval(countUp);
          ccsStatus.textContent = 'Auto-committed ✓';
          ccsValue.style.color = 'var(--teal)';
        }
        ccsValue.textContent = score + '%';
      }, 35);

      // Phase 4: reset after pause
      setTimeout(() => {
        demoCcs.classList.remove('visible');
        demoText.textContent = '';
        demoCursor.style.display = 'inline-block';
        ccsValue.textContent = '96%';
        ccsStatus.textContent = 'Auto-committing...';
        ccsValue.style.color = '';
        runDemo();
      }, 3800);
    }
  }

  // Start after a small delay so the page can load
  setTimeout(runDemo, 1200);
}

// ── CODE TABS ─────────────────────────────────────────────────────────────
const codeTabs = document.querySelectorAll('.code-tab');
const codePanes = document.querySelectorAll('.code-pane');

codeTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    codeTabs.forEach(t => t.classList.remove('active'));
    codePanes.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    const pane = document.getElementById('tab-' + target);
    if (pane) pane.classList.add('active');
  });
});

// ── TRIAL FORM ────────────────────────────────────────────────────────────
const trialForm = document.getElementById('trial-form');
if (trialForm) {
  trialForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = trialForm.querySelector('button[type="submit"]');
    btn.textContent = 'Request received! ✓';
    btn.style.background = 'var(--green)';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Start free trial →';
      btn.style.background = '';
      btn.disabled = false;
      trialForm.reset();
    }, 4000);
  });
}

// ── SMOOTH SCROLL FOR ANCHOR LINKS ────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
