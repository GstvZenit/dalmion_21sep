// Change only this value if you ever want a new password.
const SITE_PASSWORD = '4038NGC4039';

const form = document.querySelector('#login-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const password = document.querySelector('#password');
    const message = document.querySelector('#message');
    if (password.value === SITE_PASSWORD) {
      sessionStorage.setItem('gallery-access', 'yes');
      location.href = 'album.html';
    } else {
      message.textContent = 'ACCESS DENIED — try again.';
      password.value = '';
      password.focus();
    }
  });
} else if (sessionStorage.getItem('gallery-access') !== 'yes') {
  location.href = 'index.html';
}
