// Efeito Typewriter Sobre Mim
const textToType = "PENSANDO. DESENVOLVENDO. EVOLUINDO.";
const typeTarget = document.getElementById('typewriter-text');
let typeIndex = 0;
let isTypingStarted = false;

function typeWriter() {
    if (typeTarget && typeIndex < textToType.length) {
        typeTarget.innerHTML += textToType.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 60); 
    }
}

// Scroll Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.closest('#sobre') && !isTypingStarted) {
                isTypingStarted = true;
                setTimeout(typeWriter, 400); 
            }
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

// Lógica do Menu Mobile
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        } else {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    });

    // Fechar menu ao clicar num link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('flex');
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}