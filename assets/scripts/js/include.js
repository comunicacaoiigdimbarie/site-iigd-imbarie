/**
 * Carrega conteúdo HTML externo dentro de uma tag específica e executa um callback após carregar.
 * @param {string} tagName - Seletor da tag onde o conteúdo será inserido (ex: "header", "footer").
 * @param {string} file - Caminho do arquivo HTML a ser carregado.
 * @param {function} [callback] - Função opcional a ser executada após o conteúdo ser inserido.
 */
function includeLayout(tagName, file, callback) {
    const element = document.querySelector(tagName);

    if (!element) return;

    fetch(file)
        .then(response => {
            if (!response.ok) throw new Error(`Erro ao carregar ${file}`);
            return response.text();
        })
        .then(data => {
            element.innerHTML = data;

            // Executa callback se for uma função válida
            if (typeof callback === 'function') {
                callback();
            }
        })
        .catch(error => {
            console.error(error);
        });
}
