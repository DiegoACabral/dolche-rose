// Nav scroll shadow
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.getElementById('navLinks');
toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Gallery — auto-loads assets/img/galeria/1.png, 2.png…
const galeriaGrid = document.getElementById('galeriaGrid');
let loaded = 0;

function tryGaleriaImage(n) {
  const exts = ['jpg', 'jpeg', 'png', 'webp'];
  let i = 0;
  function next() {
    if (i >= exts.length) {
      if (loaded === 0) addPlaceholders();
      return;
    }
    const img = new Image();
    img.src = `assets/img/galeria/${n}.${exts[i]}`;
    img.onload = () => {
      loaded++;
      const wrap = document.createElement('div');
      wrap.className = 'foto-item';
      const el = document.createElement('img');
      el.src = img.src;
      el.alt = `Dolche Rosé – foto ${n}`;
      el.loading = 'lazy';
      wrap.appendChild(el);
      galeriaGrid.appendChild(wrap);
      tryGaleriaImage(n + 1);
    };
    img.onerror = () => { i++; next(); };
  }
  next();
}

function addPlaceholders() {
  for (let k = 0; k < 6; k++) {
    const el = document.createElement('div');
    el.className = 'foto-placeholder';
    el.innerHTML = '<span>🍰</span><p>Fotos próximamente</p>';
    galeriaGrid.appendChild(el);
  }
}

tryGaleriaImage(1);

// Menu tabs
document.querySelectorAll('.menu-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.menu-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.menu-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
  });
});

// Load menu images
document.querySelectorAll('.menu-grid').forEach(grid => {
  const base = grid.dataset.menuBase;
  const count = parseInt(grid.dataset.count);
  const exts = ['jpg', 'jpeg', 'png', 'webp'];

  for (let n = 1; n <= count; n++) {
    (function(num) {
      let i = 0;
      function next() {
        if (i >= exts.length) return;
        const img = new Image();
        img.src = `${base}${num}.${exts[i]}`;
        img.onload = () => {
          const wrap = document.createElement('div');
          wrap.className = 'menu-img-wrap';
          const el = document.createElement('img');
          el.src = img.src;
          el.alt = `Menú ${num}`;
          el.loading = 'lazy';
          wrap.appendChild(el);
          grid.appendChild(wrap);
        };
        img.onerror = () => { i++; next(); };
      }
      next();
    })(n);
  }
});

// Lightbox — works for gallery and menu images
document.addEventListener('click', e => {
  if (!e.target.matches('.foto-item img, .menu-img-wrap img')) return;
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;z-index:999;cursor:zoom-out;padding:1rem';
  const img = document.createElement('img');
  img.src = e.target.src;
  img.style.cssText = 'max-width:90vw;max-height:90vh;object-fit:contain;border-radius:0.75rem';
  overlay.appendChild(img);
  overlay.addEventListener('click', () => overlay.remove());
  document.addEventListener('keydown', function esc(ev) {
    if (ev.key === 'Escape') { overlay.remove(); document.removeEventListener('keydown', esc); }
  });
  document.body.appendChild(overlay);
});
