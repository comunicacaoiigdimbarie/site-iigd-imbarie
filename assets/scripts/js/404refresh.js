fetch('/404.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('conteudo').innerHTML = html;
    })
    .catch(() => {
        document.getElementById('conteudo').innerHTML = '<h1>Erro ao carregar a página</h1>';
    });