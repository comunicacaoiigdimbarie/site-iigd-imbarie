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
