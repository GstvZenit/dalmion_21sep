const gallery = document.querySelector('.gallery');
const lightbox = document.querySelector('#lightbox');

gallery.addEventListener('click', (event) => {
  const image = event.target.closest('img');
  if (!image) return;
  lightbox.querySelector('img').src = image.src;
  // Show both the old-school filename and the thoughtful description in the full view.
  lightbox.querySelector('p').textContent = image.nextElementSibling.textContent + ' — ' + image.alt;
  lightbox.showModal();
});

document.querySelector('#close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});
document.querySelector('#logout').addEventListener('click', () => {
  sessionStorage.removeItem('gallery-access');
  location.href = 'index.html';
});

let visits = Number(localStorage.getItem('tiny-visitor-count') || 4038) + 1;
localStorage.setItem('tiny-visitor-count', visits);
document.querySelector('#counter').textContent = String(visits).padStart(6, '0');

// Little early-web Easter eggs. They are deliberately simple to maintain.
const secretBox = document.querySelector('#secret-box');
const secretMessage = document.querySelector('#secret-message');
function showSecret(message) {
  secretMessage.textContent = message;
  secretBox.showModal();
}
document.querySelector('#secret-close').addEventListener('click', () => secretBox.close());
secretBox.addEventListener('click', (event) => { if (event.target === secretBox) secretBox.close(); });

const counterMessages = [
  'Visitante numero ' + String(visits).padStart(6, '0') + ': siempre mi visitante favorita.'
];
document.querySelector('#counter').addEventListener('click', () => {
  showSecret(counterMessages[Math.floor(Math.random() * counterMessages.length)]);
});

let typed = '';

document.addEventListener('keydown', (event) => {
  // 1. Ignorar teclas de control (Shift, Enter, etc.) para que no rompan el texto
  if (event.key.length !== 1) return;

  // 2. Acumular y mantener las últimas 5 letras (suficiente para "love" y "check")
  typed = (typed + event.key.toLowerCase()).slice(-5);

  // 3. Verificar la primera palabra ("love" tiene 4 letras)
  if (typed.slice(-4) === 'love') {
    typed = '';
    showSecret('love? july 16th? amor! mi amor! sweetheart te amo');
  }
  
  // 4. Verificar la segunda palabra ("check" tiene 5 letras)
  if (typed.slice(-5) === 'check') {
    typed = '';
    showSecret('jaque mate, tengo que llevar esos tusitos al registro civil');
  }

  if (typed.slice(-5) === 'lain') {
    typed = '';
    showSecret('present time present day hahaha');
  }
  if (typed.slice(-5) === 'dalma') {
    typed = '';
    showSecret('la chica mas linda del universo');
  }
});

let heartClicks = 0;
document.querySelector('#heart-note').addEventListener('click', () => {
  heartClicks += 1;
  if (heartClicks === 10) {
    heartClicks = 0;
    showSecret('10 clicks, te amo te amo te amo te amo te amo te amo te amo te amo te amo te amo ♥, lukita modric nro.10');
  }
});
