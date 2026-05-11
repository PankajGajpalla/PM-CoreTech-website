/* =========================================================
   SPOTLIGHT CURSOR
   ========================================================= */
(function () {
  const spotlight = document.getElementById('spotlight');
  if (!spotlight) return;
  let x = window.innerWidth / 2, y = window.innerHeight / 2;
  let tx = x, ty = y;
  document.addEventListener('mousemove', (e) => { tx = e.clientX; ty = e.clientY; });
  function loop() {
    x += (tx - x) * 0.1;
    y += (ty - y) * 0.1;
    spotlight.style.left = x + 'px';
    spotlight.style.top = y + 'px';
    requestAnimationFrame(loop);
  }
  loop();
})();

/* =========================================================
   NAVBAR SCROLL
   ========================================================= */
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
})();

/* =========================================================
   CLOCK
   ========================================================= */
(function () {
  const clockEl = document.getElementById('navClock');
  if (!clockEl) return;
  function tick() {
    const now = new Date();
    const t = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kolkata' });
    clockEl.textContent = `Bhilai · ${t} IST`;
  }
  tick();
  setInterval(tick, 30000);
})();

/* =========================================================
   HAMBURGER
   ========================================================= */
(function () {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
})();

/* =========================================================
   REVEAL ON SCROLL
   ========================================================= */
(function () {
  const els = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in'), i * 60);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
  els.forEach(el => io.observe(el));
})();

/* =========================================================
   COUNTERS
   ========================================================= */
(function () {
  const counters = document.querySelectorAll('.counter');
  let triggered = false;
  function animate() {
    if (triggered) return;
    const first = counters[0];
    if (!first) return;
    const rect = first.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      triggered = true;
      counters.forEach(c => {
        const target = +c.dataset.target;
        const duration = 1500;
        const start = performance.now();
        function step(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          c.textContent = Math.floor(target * eased);
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }
  }
  window.addEventListener('scroll', animate);
  animate();
})();

/* =========================================================
   MAGNETIC BUTTONS
   ========================================================= */
(function () {
  document.querySelectorAll('[data-magnetic]').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.05)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
})();

/* =========================================================
   CONTACT FORM
   ========================================================= */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const success = document.getElementById('formSuccess');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit] span:first-child');
    const original = btn.textContent;
    btn.textContent = 'Sending…';
    setTimeout(() => {
      success.classList.add('show');
      btn.textContent = original;
      form.reset();
      setTimeout(() => success.classList.remove('show'), 5000);
    }, 900);
  });
})();

/* =========================================================
   CHAT DEMO ROTATE
   ========================================================= */
(function () {
  const chats = [
    { user: "Hi, what's the fee structure?", bot: "Hello! Our 2025-26 batches start from ₹15,000/year. Want me to schedule a callback? ✨" },
    { user: "When is the next batch?", bot: "Next batch starts April 15th. Should I reserve a seat for you? 🎓" },
    { user: "Do you offer demo classes?", bot: "Yes! Free demo every Saturday at 10 AM. Want me to add you to the list? 📚" },
    { user: "Is online class available?", bot: "Yes — hybrid mode is available. Live + recorded lectures. Want details? 💻" },
  ];
  const userEl = document.querySelector('.chat-msg.user');
  const botEl = document.querySelector('.chat-msg.bot');
  if (!userEl || !botEl) return;
  userEl.style.transition = 'opacity 0.4s';
  botEl.style.transition = 'opacity 0.4s';
  let i = 0;
  setInterval(() => {
    i = (i + 1) % chats.length;
    userEl.style.opacity = '0';
    botEl.style.opacity = '0';
    setTimeout(() => {
      userEl.textContent = chats[i].user;
      userEl.style.opacity = '1';
      setTimeout(() => {
        botEl.textContent = chats[i].bot;
        botEl.style.opacity = '1';
      }, 600);
    }, 400);
  }, 5000);
})();
