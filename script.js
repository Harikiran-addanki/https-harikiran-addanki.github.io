const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach(item => observer.observe(item));

const counters = document.querySelectorAll('[data-count]');
let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;
  countersStarted = true;

  counters.forEach(counter => {
    const target = Number(counter.dataset.count);
    const duration = 1300;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(target * eased);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

const metricsSection = document.querySelector('#impact');
const metricsObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    animateCounters();
    metricsObserver.disconnect();
  }
}, { threshold: 0.25 });

if (metricsSection) metricsObserver.observe(metricsSection);

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

menuButton?.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  mobileNav.setAttribute('aria-hidden', String(!open));
});

document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
  });
});

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', event => {
  if (window.innerWidth > 900 && glow) {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }
});

document.querySelector('#year').textContent = new Date().getFullYear();
