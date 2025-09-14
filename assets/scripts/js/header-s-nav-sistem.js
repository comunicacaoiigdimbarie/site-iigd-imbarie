function initChevronToggle() {
    const trigger = document.querySelector(".s-nav-chevron");
    const menu = document.querySelector("#main-menu");

    if (trigger && menu) {
        function menuStatus() {
            trigger.classList.toggle("on");

            if (!menu.classList.contains("on")) {
                openMenu();
            } else {
                closeMenu();
            }
        }

        function openMenu() {
            menu.style.transform = 'translateX(100%)';
            menu.style.display = 'flex';

            requestAnimationFrame(() => {
                menu.style.transform = 'translateX(0%)';
                menu.classList.add("on");
            });
        }

        function closeMenu() {
            menu.style.transform = 'translateX(100%)';

            setTimeout(() => {
                menu.style.display = 'none';
                menu.classList.remove("on");
            }, 300);
        }

        trigger.addEventListener('click', menuStatus);
    }
}
