function initChevronToggle() {
    const trigger = document.querySelector(".s-nav-chevron");
    const menu = document.querySelector("#main-menu")

    if (trigger) {
        async function menuStatus() {
            trigger.classList.toggle("on");

            if (!menu.classList.contains("on")){
                openMenu();
            } else {
                closeMenu();
            }
        }

        async function openMenu() {
            menu.classList.toggle("on");
            menu.style.transform = 'translateX(100%)';
            setTimeout(() => {
                menu.style.transform = 'translateX(0%)';
            }, 100);
        }

        async function closeMenu() {
            menu.style.transform = 'translateX(100%)';
            setTimeout(() => {
                menu.classList.toggle("on");
            }, 300);
        }

        trigger.addEventListener('click', menuStatus);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    includeLayout("header", "/assets/base/header.html", () => {
        initChevronToggle();
    });

    includeLayout("footer", "/assets/base/footer.html");
});

