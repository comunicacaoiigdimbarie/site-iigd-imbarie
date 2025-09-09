function includeLayout(tagName, file) {
  const element = document.querySelector(tagName);
  if (element) {
    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error(`Erro ao carregar ${file}`);
        return response.text();
      })
      .then(data => {
        element.innerHTML = data;
      })
      .catch(error => {
        console.error(error);
      });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  includeLayout("header", "/assets/base/header.html");
  includeLayout("footer", "/assets/base/footer.html");
});
