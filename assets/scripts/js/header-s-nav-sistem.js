/**
 * Inicializa a lógica de toggle para o ícone "chevron" que controla
 * a abertura e fechamento do menu principal (#main-menu).
 */
function initChevronToggle() {
    const trigger = document.querySelector(".s-nav-chevron");
    const menu = document.querySelector("#main-menu");

    if (!trigger || !menu) return;

    /**
     * Alterna o estado do menu: abre se estiver fechado e fecha se aberto.
     * Também alterna a classe visual do trigger para animação do ícone.
     */
    function menuStatus() {
        trigger.classList.toggle("on");

        if (!menu.classList.contains("on")) {
            openMenu();
        } else {
            closeMenu();
        }
    }

    /**
     * Abre o menu com animação suave de transição lateral.
     */
    function openMenu() {
        // Inicializa o menu fora da tela à direita e exibe-o
        menu.style.transform = 'translateX(100%)';
        menu.style.display = 'flex';

        // Após renderização, desliza o menu para dentro da tela
        requestAnimationFrame(() => {
            menu.style.transform = 'translateX(0%)';
            menu.classList.add("on");
        });
    }

    /**
     * Fecha o menu com animação e o oculta após a transição.
     */
    function closeMenu() {
        // Desliza o menu para fora da tela à direita
        menu.style.transform = 'translateX(100%)';

        // Após 300ms (duração da transição), esconde o menu e remove classe
        setTimeout(() => {
            menu.style.display = 'none';
            menu.classList.remove("on");
        }, 300);
    }

    // Associa o clique no trigger à função de alternância do menu
    trigger.addEventListener('click', menuStatus);
}
