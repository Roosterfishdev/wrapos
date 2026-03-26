// Nav scroll
window.addEventListener('scroll', () => {
  document.getElementById('nav').style.background =
    scrollY > 40 ? 'rgba(13,15,16,0.95)' : 'rgba(13,15,16,0.7)';
});

// Mobile menu
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  const toggle = document.getElementById('menuToggle');
  const open = menu.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  if (toggle) {
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
}

// Swatch interaction
document.querySelectorAll('.swatch').forEach(s => {
  s.addEventListener('click', () => {
    document.querySelectorAll('.swatch').forEach(x => x.classList.remove('active'));
    s.classList.add('active');
    // Update car color in mockup
    const carPaths = document.querySelectorAll('#carGrad stop, #carGrad2 stop');
    // just a fun visual nod
  });
});

// Pill interaction
document.querySelectorAll('.finish-pills').forEach(group => {
  group.querySelectorAll('.pill').forEach(p => {
    p.addEventListener('click', () => {
      group.querySelectorAll('.pill').forEach(x => x.classList.remove('active'));
      p.classList.add('active');
      // Update mock price
      const prices = { 'Full wrap': '$1,200', 'Partial': '$680', 'Hood only': '$290' };
      const sel = p.textContent;
      if (prices[sel]) document.getElementById('mockPrice').textContent = prices[sel];
    });
  });
});

// How it works steps
const stepData = [
  { icon: '🎛️', title: 'Create your widget', desc: 'Define pricing rules, vehicle types, and finishes from a simple dashboard.' },
  { icon: '🎨', title: 'Customize the experience', desc: 'Adjust colors, branding, and options to match your business.' },
  { icon: '📋', title: 'Embed on your website', desc: 'Copy one script tag and paste into any platform. You\'re live.' },
  { icon: '📥', title: 'Start capturing leads', desc: 'High-intent quote requests with full visual context start rolling in.' },
];

function setStep(i) {
  document.querySelectorAll('.step-item').forEach((s, idx) => {
    s.classList.toggle('active', idx === i);
  });
  const d = stepData[i];
  const icon = document.getElementById('stepIcon');
  const title = document.getElementById('stepTitle');
  const desc = document.getElementById('stepDesc');
  icon.style.animation = 'none';
  icon.offsetHeight;
  icon.style.animation = 'stepPop 0.4s ease';
  icon.textContent = d.icon;
  title.textContent = d.title;
  desc.textContent = d.desc;
}

// Auto-cycle steps
let currentStep = 0;
setInterval(() => {
  currentStep = (currentStep + 1) % 4;
  setStep(currentStep);
}, 3000);

// FAQ toggle
function toggleFaq(el) {
  el.classList.toggle('open');
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // Animate progress bars when why section visible
      const fills = e.target.querySelectorAll('.wp-fill');
      fills.forEach(f => {
        const w = f.getAttribute('data-w');
        setTimeout(() => {
          f.style.width = w + '%';
          // Animate counter
          const id = f.id.replace('f', 'v');
          animateCounter(id, parseInt(w));
        }, 300);
      });
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function animateCounter(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.round(current) + '%';
    if (current >= target) clearInterval(timer);
  }, 16);
}
