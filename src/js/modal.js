// Lógica da Modal Dividida 50/50
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');

async function openModal(title, desc, lang, githubUrl, homepageUrl) {
    document.getElementById('modal-desc').innerText = desc;
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-lang').innerText = lang;
    document.getElementById('modal-github-link').href = githubUrl;

    const projectImages = {
        'CardapioOnline': 'https://github.com/gabrielkkskx/cardapio/assets/111579958/c42bd2a2-0a26-4d61-9abd-cb9b4df16e40',
        'AluraBooks': 'https://github.com/user-attachments/assets/89510ed4-31c6-45c5-9d89-58a6f73fa827',
        'JazzSchool': 'https://user-images.githubusercontent.com/43050548/220467949-310dce95-db36-45ed-b6f9-5afcf2fafc2d.png',
        'PetLife': 'https://github.com/isaacpontes/petlife/assets/43050548/2e2f0c7c-f48c-4d3a-bd3f-96c2dc79b802'
    };

    // Gerar Banner Social Oficial do GitHub
    document.getElementById('modal-banner').src = projectImages[title] || `https://opengraph.githubassets.com/1/oliveiragabe/${title}`;

    // Botão Visualizar Projeto
    const liveLinkBtn = document.getElementById('modal-live-link');
    if (homepageUrl && homepageUrl.trim() !== '') {
        liveLinkBtn.href = homepageUrl;
        liveLinkBtn.classList.remove('hidden');
        liveLinkBtn.classList.add('inline-flex');
    } else {
        liveLinkBtn.classList.add('hidden');
        liveLinkBtn.classList.remove('inline-flex');
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    setTimeout(() => {
        modal.classList.remove('opacity-0');
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    }, 10);
    
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.add('opacity-0');
    modalContent.classList.remove('scale-100');
    modalContent.classList.add('scale-95');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = '';
    }, 300); 
}