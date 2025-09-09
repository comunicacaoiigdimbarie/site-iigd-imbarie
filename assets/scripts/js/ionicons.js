const scriptModule = document.createElement('script');
scriptModule.type = 'module';
scriptModule.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
document.head.appendChild(scriptModule);

const scriptNoModule = document.createElement('script');
scriptNoModule.setAttribute('nomodule', '');
scriptNoModule.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
document.head.appendChild(scriptNoModule);
