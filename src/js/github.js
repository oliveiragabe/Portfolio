// Lista de Repositórios Fixados do Usuário
const reposFixados = ['Portfolio', 'AluraBooks', 'JazzSchool', 'CardapioOnline', 'PetLife', 'Projeto-poo-web'];

async function fetchGitHubProjects() {
    const grid = document.getElementById('github-projects-grid');
    if (!grid) return;

    try {
        const res = await fetch('https://api.github.com/users/oliveiragabe/repos?per_page=100');
        const repos = await res.json();
        
        // Filtrar apenas os do reposFixados ou os 6 primeiros
        let pinnedRepos = repos.filter(repo => reposFixados.includes(repo.name));
        if (pinnedRepos.length === 0) pinnedRepos = repos.slice(0, 6);

        grid.innerHTML = ''; 

        pinnedRepos.forEach(repo => {
            const desc = repo.description || "Sem descrição no repositório.";
            const lang = repo.language || "Code";
            
            const cardHTML = `
                <div class="glow-card rounded-2xl p-8 cursor-pointer h-full flex flex-col justify-between bg-white dark:bg-[#120a24]" 
                     onclick="openModal('${repo.name}', \`${desc}\`, '${lang}', '${repo.html_url}', '${repo.homepage || ''}')">
                    <div class="glow-content">
                        <div class="flex justify-between items-start mb-6">
                            <div class="p-3 bg-lightBase dark:bg-white/10 text-accentPurple rounded-xl border border-gray-200 dark:border-white/5">
                                <i class="fa-solid fa-folder-open text-xl"></i>
                            </div>
                            <i class="fa-solid fa-arrow-up-right-from-square text-gray-400 group-hover:text-accentPurple transition-colors"></i>
                        </div>
                        <h4 class="text-2xl font-bold mb-3 text-gray-900 dark:text-white break-words">${repo.name}</h4>
                        <p class="text-gray-500 dark:text-gray-400 mb-6 line-clamp-2 text-sm leading-relaxed">${desc}</p>
                    </div>
                    <div class="glow-content mt-auto">
                        <span class="px-3 py-1 bg-lightBase dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-md text-xs font-bold text-gray-700 dark:text-gray-300">
                            ${lang}
                        </span>
                    </div>
                </div>
            `;
            grid.insertAdjacentHTML('beforeend', cardHTML);
        });

        applyGlowEffect();

    } catch (error) {
        grid.innerHTML = '<p class="col-span-full text-center text-red-500">Erro ao carregar repositórios do GitHub.</p>';
    }
}

function applyGlowEffect() {
    document.querySelectorAll('.glow-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
}

// Inicializa a busca dos projetos
fetchGitHubProjects();