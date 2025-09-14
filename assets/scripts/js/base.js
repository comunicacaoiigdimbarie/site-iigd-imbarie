function includeLayout(tagName, file, callback) {
    const element = document.querySelector(tagName);
    if (element) {
        fetch(file)
            .then(response => {
                if (!response.ok) throw new Error(`Erro ao carregar ${file}`);
                return response.text();
            })
            .then(data => {
                element.innerHTML = data;

                if (typeof callback === 'function') {
                    callback();
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    includeLayout("header", "/assets/base/header.html", initDropdowns);

    includeLayout("footer", "/assets/base/footer.html");
});

function initDropdowns() {
    const setupDropdown = (triggerId, dropdownId) => {
        const trigger = document.getElementById(triggerId);
        const dropdown = document.getElementById(dropdownId);

        if (!trigger || !dropdown) return;

        const header = document.querySelector('header');

        const positionDropdown = () => {
            if (!header) return;

            const headerRect = header.getBoundingClientRect();
            const triggerRect = trigger.getBoundingClientRect();

            const topPosition = headerRect.bottom;

            const leftPosition = triggerRect.left;

            dropdown.style.position = 'absolute';
            dropdown.style.top = `${topPosition}px`;
            dropdown.style.left = `${leftPosition}px`;
        };

        const showDropdown = () => {
            positionDropdown();
            dropdown.style.display = 'block';

            requestAnimationFrame(() => {
                dropdown.style.opacity = '1';
                dropdown.style.transform = 'translateY(0)';
                dropdown.style.pointerEvents = 'auto';
            });
        };

        const hideDropdown = () => {
            dropdown.style.opacity = '0';
            dropdown.style.transform = 'translateY(-20px)';
            dropdown.style.pointerEvents = 'none';

            setTimeout(() => {
                if (dropdown.style.opacity === '0') {
                    dropdown.style.display = 'none';
                }
            }, 300);
        };

        trigger.addEventListener('mouseenter', showDropdown);
        trigger.addEventListener('mouseleave', () => {
            setTimeout(() => {
                if (!dropdown.matches(':hover')) hideDropdown();
            }, 100);
        });

        dropdown.addEventListener('mouseenter', showDropdown);
        dropdown.addEventListener('mouseleave', hideDropdown);

        window.addEventListener('resize', () => {
            if (dropdown.style.display === 'block') {
                positionDropdown();
            }
        });
    };

    setupDropdown('dropdown-ministerios-trigger', 'dropdown-ministerios-menu');
    setupDropdown('dropdown-redes-trigger', 'dropdown-redes-menu');
}
