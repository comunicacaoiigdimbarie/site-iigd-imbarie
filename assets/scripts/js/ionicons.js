/**
 * Adiciona dinamicamente os scripts do Ionicons na página,
 * garantindo suporte a navegadores que suportam módulos ES e os que não suportam.
 */

// Script para navegadores que suportam módulos ES
const scriptModule = document.createElement('script');
scriptModule.type = 'module';
scriptModule.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js';
document.head.appendChild(scriptModule);

// Script para navegadores que NÃO suportam módulos ES
const scriptNoModule = document.createElement('script');
scriptNoModule.setAttribute('nomodule', '');
scriptNoModule.src = 'https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js';
document.head.appendChild(scriptNoModule);
