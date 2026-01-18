/**
 * Copia o e-mail para a área de transferência e exibe alerta de sucesso ou erro.
 * @param {Event} event - Evento do clique para prevenir comportamento padrão.
 */
function copyEmail(event) {
    // Previne o comportamento padrão e a propagação do evento
    event.preventDefault();
    event.stopPropagation();

    const email = 'comunicacao@iigdimbarie.com.br';

    // Tenta copiar o texto para a área de transferência
    navigator.clipboard.writeText(email)
        .then(() => {
            document.querySelector("#emailionicon").setAttribute("name", "checkmark-outline");
            setInterval(async () => {
                document.querySelector("#emailionicon").setAttribute("name", "copy-outline");
            }, 2 * 1000)
        })
        .catch(err => {
            document.querySelector("#emailionicon").setAttribute("name", "close-outline");
            console.log("Erro no copiar email na página 404: ", err)
            setInterval(async () => {
                document.querySelector("#emailionicon").setAttribute("name", "copy-outline");
            }, 2 * 1000);
        });
}
