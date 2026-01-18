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
   FUNÇÃO: DARK / LIGHT THEME
   ========================================================================== */
function initThemeToggle() {
    const toggle = document.querySelector("#theme-toggle");
    const html = document.documentElement;

    if (!toggle) return;

    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        html.setAttribute("data-theme", "dark");
        toggle.innerHTML = '<ion-icon name="sunny"></ion-icon>';
    } else {
        html.removeAttribute("data-theme");
        toggle.innerHTML = '<ion-icon name="moon"></ion-icon>';
    }

    toggle.addEventListener("click", () => {
        const isDark = html.getAttribute("data-theme") === "dark";

        if (isDark) {
            html.removeAttribute("data-theme");
            localStorage.setItem("theme", "light");
            toggle.innerHTML = '<ion-icon name="moon"></ion-icon>';
        } else {
            html.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            toggle.innerHTML = '<ion-icon name="sunny"></ion-icon>';
        }
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

    // Coloca o ano no copyright
    document.querySelector("#copyr").innerHTML = `<p>&copy; ${new Date().getFullYear()} Igreja Internacional da Graça de Deus. Todos os direitos reservados.</p>`;

    // Chama o dark-light theme toggle
    initThemeToggle();
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
