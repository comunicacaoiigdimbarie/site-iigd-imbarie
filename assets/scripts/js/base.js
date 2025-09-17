/* ==========================================================================
   FUNÇÃO: INCLUIR LAYOUT (HEADER / FOOTER)
   ========================================================================== */
/**
 * Insere conteúdo HTML de um arquivo externo dentro de uma tag específica.
 * @param {string} tagName - Nome da tag onde o conteúdo será inserido.
 * @param {string} file - Caminho do arquivo HTML.
 * @returns {Promise<void>}
 */
function includeLayout(tagName, file) {
    const element = document.querySelector(tagName);
    if (!element) return Promise.resolve();

    return fetch(file)
        .then(response => {
            if (!response.ok) throw new Error(`Erro ao carregar ${file}`);
            return response.text();
        })
        .then(data => {
            element.innerHTML = data;
        });
}

/* ==========================================================================
   EVENTO: DOCUMENTO PRONTO
   ========================================================================== */
document.addEventListener("DOMContentLoaded", async () => {
    // Inclui o header
    await includeLayout("header", "/assets/base/header.html");

    // Inicializa funcionalidades visuais após renderização
    requestAnimationFrame(() => {
        initDropdowns();
        initChevronToggle();
    });

    // Inclui o footer
    await includeLayout("footer", "/assets/base/footer.html");
});

/* ==========================================================================
   FUNÇÃO: DROPDOWNS (MENU HOVER)
   ========================================================================== */
/**
 * Inicializa os dropdowns customizados por ID.
 */
function initDropdowns() {
    const setupDropdown = (triggerId, dropdownId) => {
        const trigger = document.querySelector(`#${triggerId}`);
        const dropdown = document.querySelector(`#${dropdownId}`);
        const header = document.querySelector('header');

        if (!trigger || !dropdown || !header) return;

        let hideTimeout;

        /**
         * Posiciona o dropdown abaixo do header alinhado ao trigger.
         */
        function positionDropdown() {
            const headerRect = header.getBoundingClientRect();
            const triggerRect = trigger.getBoundingClientRect();

            dropdown.style.position = 'absolute';
            dropdown.style.top = `${headerRect.bottom}px`;
            dropdown.style.left = `${triggerRect.left}px`;
        }

        /**
         * Mostra o dropdown com transição suave.
         */
        function showDropdown() {
            clearTimeout(hideTimeout);
            positionDropdown();

            dropdown.style.display = 'flex';
            dropdown.style.opacity = '0';
            dropdown.style.transform = 'translateY(-20px)';
            dropdown.style.pointerEvents = 'none';

            requestAnimationFrame(() => {
                dropdown.style.opacity = '1';
                dropdown.style.transform = 'translateY(0)';
                dropdown.style.pointerEvents = 'auto';
            });
        }

        /**
         * Oculta o dropdown com animação e delay.
         */
        function hideDropdown() {
            dropdown.style.opacity = '0';
            dropdown.style.transform = 'translateY(-20px)';
            dropdown.style.pointerEvents = 'none';

            hideTimeout = setTimeout(() => {
                dropdown.style.display = 'none';
            }, 300);
        }

        // Eventos de entrada e saída do cursor
        trigger.addEventListener('mouseenter', showDropdown);
        dropdown.addEventListener('mouseenter', showDropdown);

        trigger.addEventListener('mouseleave', () => {
            hideTimeout = setTimeout(() => {
                if (!dropdown.matches(':hover')) hideDropdown();
            }, 200);
        });

        dropdown.addEventListener('mouseleave', () => {
            hideTimeout = setTimeout(() => {
                if (!trigger.matches(':hover')) hideDropdown();
            }, 200);
        });

        // Reposiciona em redimensionamento de tela
        window.addEventListener('resize', () => {
            if (dropdown.style.display === 'flex') {
                positionDropdown();
            }
        });
    };

    // Inicializa os dropdowns específicos
    setupDropdown('dropdown-ministerios-trigger', 'dropdown-ministerios-menu');
    setupDropdown('dropdown-redes-trigger', 'dropdown-redes-menu');
}

/* ==========================================================================
   FUNÇÃO: TOGGLE DE ÍCONES (CHEVRONS)
   ========================================================================== */
/**
 * Inicializa lógica de troca de ícones (ex: chevron para abrir/fechar menus).
 * Implementar lógica personalizada conforme necessidade.
 */
function initChevronToggle() {
    // Lógica a ser implementada conforme a necessidade do projeto
}
