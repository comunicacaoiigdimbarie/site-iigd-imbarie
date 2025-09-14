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

document.addEventListener("DOMContentLoaded", async () => {
    await includeLayout("header", "/assets/base/header.html");

    requestAnimationFrame(() => {
        initDropdowns();
    });

    await includeLayout("footer", "/assets/base/footer.html");
});

function initDropdowns() {
    const setupDropdown = (triggerId, dropdownId) => {
        const trigger = document.querySelector(`#${triggerId}`);
        const dropdown = document.querySelector(`#${dropdownId}`);
        const header = document.querySelector('header');

        if (!trigger || !dropdown || !header) return;

        function positionDropdown() {
            const headerRect = header.getBoundingClientRect();
            const triggerRect = trigger.getBoundingClientRect();

            const topPosition = headerRect.bottom;
            const leftPosition = triggerRect.left;

            dropdown.style.position = 'absolute';
            dropdown.style.top = `${topPosition}px`;
            dropdown.style.left = `${leftPosition}px`;
        }

        function showDropdown() {
            positionDropdown();

            dropdown.style.opacity = '0';
            dropdown.style.transform = 'translateY(-20px)';
            dropdown.style.pointerEvents = 'none';

            dropdown.style.display = 'flex';

            requestAnimationFrame(() => {
                dropdown.style.opacity = '1';
                dropdown.style.transform = 'translateY(0)';
                dropdown.style.pointerEvents = 'auto';
            });
        }


        function hideDropdown() {
            dropdown.style.opacity = '0';
            dropdown.style.transform = 'translateY(-20px)';
            dropdown.style.pointerEvents = 'none';

            setTimeout(() => {
                if (dropdown.style.opacity === '0') {
                    dropdown.style.display = 'none';
                }
            }, 300);
        }

        document.addEventListener('mouseenter', (e) => {
            if (e.target === trigger) {
                showDropdown();
            }
            if (e.target === dropdown) {
                showDropdown();
            }
        }, true);

        document.addEventListener('mouseleave', (e) => {
            if (e.target === trigger) {
                setTimeout(() => {
                    if (!dropdown.matches(':hover')) hideDropdown();
                }, 100);
            }
            if (e.target === dropdown) {
                hideDropdown();
            }
        }, true);

        window.addEventListener('resize', () => {
            if (dropdown.style.display === 'flex') {
                positionDropdown();
            }
        });
    };

    setupDropdown('dropdown-ministerios-trigger', 'dropdown-ministerios-menu');
    setupDropdown('dropdown-redes-trigger', 'dropdown-redes-menu');
}
