const fs = require('fs');
const path = require('path');

// Consumindo o Submodulo 1
const regrasPath = path.join(__dirname, '../../contracts/regras_produtos.json');
const regras = JSON.parse(fs.readFileSync(regrasPath, 'utf8'));

let inventario = [
    { sku: "PROD-1", qtd: 15 }
];

module.exports = {
    obterEstoque: () => inventario,
    verificarAlerta: (qtdAtual) => qtdAtual <= regras.alerta_estoque_baixo
};