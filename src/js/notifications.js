// Caminho do currículo (ajustado de acordo com a nova estrutura de pastas)
const cvPath = 'src/docs/curriculo-gabriel.pdf';

function downloadCV() {
    const link = document.createElement('a');

    link.href = cvPath;
    link.download = 'Curriculo-Gabriel-Oliveira.pdf';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const toast = document.getElementById('toast');

    if (toast) {
        toast.classList.remove('translate-y-24', 'opacity-0');

        setTimeout(() => {
            toast.classList.add('translate-y-24', 'opacity-0');
        }, 3000);
    }
}