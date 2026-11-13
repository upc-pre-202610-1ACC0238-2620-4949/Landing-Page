const languageButton = document.querySelector('#languageBtn');
const currentLanguage = document.querySelector('#currentLang');
const menuButton = document.querySelector('#menuButton');
const navMenu = document.querySelector('#navMenu');
const registerButton = document.querySelector('#registerButton');
const backButton = document.querySelector('#backButton');

function setLanguage(language) {
  const selectedLanguage = language === 'en' ? 'en' : 'es';
  document.body.classList.toggle('lang-es', selectedLanguage === 'es');
  document.documentElement.lang = selectedLanguage;
  currentLanguage.textContent = selectedLanguage.toUpperCase();
  localStorage.setItem('preferredLanguage', selectedLanguage);
}

languageButton?.addEventListener('click', () => {
  setLanguage(document.body.classList.contains('lang-es') ? 'en' : 'es');
});

registerButton?.addEventListener('click', () => {
  sessionStorage.setItem('smartgas-registration-started', 'true');
});

function updateBackButton() {
  const shouldShow = sessionStorage.getItem('smartgas-registration-started') === 'true'
    && window.history.length > 1;
  backButton?.classList.toggle('is-visible', shouldShow);
}

backButton?.addEventListener('click', () => {
  sessionStorage.removeItem('smartgas-registration-started');
  window.history.back();
});

window.addEventListener('pageshow', updateBackButton);
window.addEventListener('focus', updateBackButton);

menuButton?.addEventListener('click', () => {
  navMenu?.classList.toggle('is-open');
  menuButton.classList.toggle('is-open');
});

document.querySelectorAll('.nav-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu?.classList.remove('is-open');
    menuButton?.classList.remove('is-open');
  });
});

setLanguage(localStorage.getItem('preferredLanguage') || 'es');
updateBackButton();
