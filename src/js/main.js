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
}, { threshold: 0.2 });

document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));