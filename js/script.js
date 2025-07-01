// Garante que todo o processo só comece depois que a página principal (o "molde") estiver carregada
document.addEventListener('DOMContentLoaded', function() {

    // 1. Definimos a função que vai rodar DEPOIS que o conteúdo for carregado.
    //    Ela contém toda a lógica de interatividade (rolagem, animação, etc.).
    function ativarInteratividade() {
        console.log("Conteúdo injetado. Ativando scripts de interatividade...");

        // --- ROLAGEM SUAVE PARA LINKS DE NAVEGAÇÃO ---
        const navLinks = document.querySelectorAll('.main-nav a, .cta-button');

        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // --- ANIMAÇÃO DE ELEMENTOS AO ROLAR A PÁGINA ---
        const revealElements = document.querySelectorAll('.reveal');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Opcional: para a animação não repetir, descomente a linha abaixo
                    // observer.unobserve(entry.target); 
                }
            });
        }, {
            threshold: 0.1 // Ativa quando 10% do elemento está visível
        });

        revealElements.forEach(element => {
            observer.observe(element);
        });
        
        // ... adicione aqui qualquer outro script que precise manipular o conteúdo carregado ...
    }


    // 2. Iniciamos o carregamento do conteúdo externo
    const placeholder = document.getElementById('content-placeholder'); // Assumindo que você tem este ID no seu index.html

    // Se o placeholder não existir, não faz nada.
    if (!placeholder) {
        console.error("Elemento com id 'content-placeholder' não foi encontrado.");
        return;
    }

    // Busca o arquivo 'recursos.html'
    fetch('pages/recursos.html') // Certifique-se de que o caminho está correto
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na rede ao carregar o conteúdo. Status: ' + response.status);
            }
            return response.text();
        })
        .then(html => {
            // Injeta o HTML buscado dentro do nosso placeholder
            placeholder.innerHTML = html;

            // 3. CHAMADA CRUCIAL: Agora que o conteúdo está na página,
            //    executamos a função para ativar a interatividade nos novos elementos.
            ativarInteratividade();
        })
        .catch(error => {
            console.error('Erro ao carregar o conteúdo:', error);
            placeholder.innerHTML = '<p style="text-align: center; color: red;">Desculpe, não foi possível carregar o conteúdo da página.</p>';
        });
});