// Lista de Repositórios Fixados do Usuário
const reposFixados = ['Portfolio', 'AluraBooks', 'JazzSchool', 'CardapioOnline', 'PetLife', 'Projeto-poo-web'];

// Dicionário de cores oficiais das linguagens
const languageColors = {
    JavaScript: { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' },
    HTML: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
    CSS: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
    PHP: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/20' },
    Vue: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
    Blade: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
    Python: { bg: 'bg-blue-500/10', text: 'text-blue-300', border: 'border-blue-500/20' },
    TypeScript: { bg: 'bg-blue-600/10', text: 'text-blue-400', border: 'border-blue-600/20' },
    Java: { bg: 'bg-amber-600/10', text: 'text-amber-500', border: 'border-amber-600/20' },
    C: { bg: 'bg-gray-500/10', text: 'text-gray-300', border: 'border-gray-500/20' },
    "C++": { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/20' },
    Dart: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20' },
    // Cor padrão caso a linguagem não esteja mapeada
    default: { bg: 'bg-white/5', text: 'text-gray-300', border: 'border-white/10' }
};

// Função para pegar as classes de estilo da linguagem
function getLanguageStyle(langName) {
    return languageColors[langName] || languageColors.default;
}

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

        // Para cada repositório, buscamos as top 3 linguagens de forma assíncrona
        for (const repo of pinnedRepos) {
            const desc = repo.description || "Sem descrição no repositório.";
            
            // Busca as linguagens específicas do repositório
            const topLanguages = await fetchRepoTopLanguages(repo.owner.login, repo.name, repo.language);

            // Cria o HTML das tags com cores personalizadas baseadas na linguagem
            const languagesHTML = topLanguages.map(lang => {
                const style = getLanguageStyle(lang);
                return `
                    <span class="px-3 py-1 ${style.bg} border ${style.border} rounded-md text-xs font-bold ${style.text}">
                        ${lang}
                    </span>
                `;
            }).join('');
            
            const cardHTML = `
                <div class="glow-card rounded-2xl p-8 cursor-pointer h-full flex flex-col justify-between bg-white dark:bg-[#120a24]" 
                     onclick="openModal('${repo.name}', \`${desc}\`, '${topLanguages.join(', ')}', '${repo.html_url}', '${repo.homepage || ''}')">
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
                        <div class="flex flex-wrap gap-2">
                            ${languagesHTML}
                        </div>
                    </div>
                </div>
            `;
            grid.insertAdjacentHTML('beforeend', cardHTML);
        }

        applyGlowEffect();

    } catch (error) {
        grid.innerHTML = '<p class="col-span-full text-center text-red-500">Erro ao carregar repositórios do GitHub.</p>';
    }
}

// Função auxiliar para buscar as até 3 linguagens mais usadas no repositório
async function fetchRepoTopLanguages(owner, repoName, fallbackLanguage) {
    try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repoName}/languages`);
        if (!res.ok) return [fallbackLanguage || "Code"];
        
        const languagesData = await res.json();
        
        // Ordena por quantidade de bytes de código decrescente e pega as 3 primeiras
        const sortedLangs = Object.entries(languagesData)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(item => item[0]);

        return sortedLangs.length > 0 ? sortedLangs : [fallbackLanguage || "Code"];
    } catch (e) {
        return [fallbackLanguage || "Code"];
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