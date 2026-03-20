// ===== SECURITY WARNING (spustí se po 3 sekundách) =====
window.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('security-warning');

  // Zobraz warning po 3s
  
    if (overlay) overlay.classList.add('show');
  }, 3000);

  // Popupy se spustí po 7s bez ohledu na zavření warningu
  setTimeout(() => {
    startPopups();
  }, 7000);

  // Zavření warningu
  const closeBtn = document.getElementById('close-warning');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (overlay) overlay.classList.remove('show');
    });
  }


// ===== POPUP ADS =====
const popupData = [
  {
    title: '🔥 Nová zpráva!',
    subtitle: 'Klikni hned!',
    img: 'images/girl_in_bikiny.webp',
    text: 'Eva je 5 km od tebe 😍 Čeká na tebe!',
    cta: 'Zobrazit profil'
  },
  {
    title: '💋 Ty jsi náš výherce!',
    subtitle: 'Exkluzivní nabídka',
    img: 'images/sweetee_fox.webp',
    text: 'Nadržené maminy ve vašem okolí hledají partnera!',
    cta: 'Chci vědět více'
  },
  {
    title: '🏆 Speciální nabídka',
    subtitle: 'Jen pro tebe!',
    img: 'images/sweetee_fox1.webp',
    text: 'Klára (32) je 2 km od tebe a chce se potkat!',
    cta: 'Odpovědět'
  },
  {
    title: '💰 Vyhral jsi!',
    subtitle: 'Klikni pro výhru',
    img: 'images/girl_in_bikiny.webp',
    text: 'Blahopřejeme! Jsi vybrán pro speciální odměnu!',
    cta: 'Převzít výhru'
  },
];

let popupIntervalId = null;
const activePopups = [];

function getRandomPosition() {
  const margin = 20;
  const popupW = 280;
  const popupH = 320;
  const maxX = window.innerWidth - popupW - margin;
  const maxY = window.innerHeight - popupH - margin;
  const x = Math.max(margin, Math.floor(Math.random() * maxX));
  const y = Math.max(margin, Math.floor(Math.random() * maxY));
  return { x, y };
}

function createPopup() {
  // Max 4 popups at once
  if (activePopups.length >= 4) {
    // Remove the oldest
    const oldest = activePopups.shift();
    if (oldest && oldest.parentNode) oldest.parentNode.removeChild(oldest);
  }

  const data = popupData[Math.floor(Math.random() * popupData.length)];
  const pos = getRandomPosition();

  const popup = document.createElement('div');
  popup.className = 'popup-ad';
  popup.style.left = pos.x + 'px';
  popup.style.top = pos.y + 'px';

  popup.innerHTML = `
    <div class="popup-header">
      ${data.title} <span>${data.subtitle}</span>
    </div>
    <div class="popup-body">
      <img src="${data.img}" alt="popup" onerror="this.style.display='none'">
      <p>${data.text}</p>
      <a href="#" class="popup-cta" onclick="return false;">${data.cta}</a>
    </div>
    <button class="popup-close" title="Zavřít">✕</button>
  `;

  // Close button
  popup.querySelector('.popup-close').addEventListener('click', () => {
    popup.style.animation = 'none';
    popup.style.opacity = '0';
    popup.style.transition = 'opacity 0.2s';
    setTimeout(() => {
      if (popup.parentNode) popup.parentNode.removeChild(popup);
      const idx = activePopups.indexOf(popup);
      if (idx > -1) activePopups.splice(idx, 1);
    }, 200);
  });

  document.body.appendChild(popup);
  activePopups.push(popup);
}

function startPopups() {
  // First popup after 1.5s
  setTimeout(createPopup, 1500);
  // Then every 3.5s
  popupIntervalId = setInterval(createPopup, 3500);
}

// ===== MOBILE MENU TOGGLE (for responsive) =====
function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) navLinks.classList.toggle('open');
}
