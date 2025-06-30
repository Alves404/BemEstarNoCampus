document.addEventListener('DOMContentLoaded', () => {

    // --- ROLAGEM SUAVE PARA LINKS DE NAVEGAÇÃO ---
    const navLinks = document.querySelectorAll('.main-nav a, .cta-button');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Verifica se o link é para uma âncora na página
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
                // Opcional: para a animação não repetir
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // Ativa quando 10% do elemento está visível
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });

});