// Lógica do Switch de Tema
const themeBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        htmlElement.classList.toggle('dark');
    });
}