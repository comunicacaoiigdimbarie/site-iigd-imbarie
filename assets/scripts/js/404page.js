function copyEmail(event) {
    event.stopPropagation();
    event.preventDefault();

    const email = 'comunicacao@iigdimbarie.com.br';
    navigator.clipboard.writeText(email).then(() => {
        alert('E-mail copiado para a área de transferência!');
    }).catch(err => {
        alert('Erro ao copiar: ' + err);
    });
}
