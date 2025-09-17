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
            alert('E-mail copiado para a área de transferência!');
        })
        .catch(err => {
            alert('Erro ao copiar o e-mail: ' + err);
        });
}
