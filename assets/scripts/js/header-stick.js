/**
 * Seleciona o elemento <header> para adicionar/remover a classe 'sticky'
 * que fixa o header no topo ao rolar a página para baixo.
 */
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    // Se a página estiver com scroll vertical maior que 0, ativa sticky
    if (window.scrollY > 0) {
        header.classList.add('sticky');
    } else {
        // Remove sticky quando voltar ao topo
        header.classList.remove('sticky');
    }
});
