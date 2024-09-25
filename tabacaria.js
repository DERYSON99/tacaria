// script.js

// Simulação de uma base de dados com produtos da tacacaria
const produtos = {
    "01": { nome: "Seda", preco: 2.00 },
    "02": { nome: "Carvão", preco: 5.00 },
    "03": { nome: "Papel Alumínio", preco: 3.50 },
    "04": { nome: "Essência", preco: 7.00 },
    "05": { nome: "Bebida", preco: 6.00 },
    "06": { nome: "Copão", preco: 1.50 }
};

let carrinho = [];
let total = 0;

// Função para exibir detalhes do produto ao digitar o código
function showProductDetails() {
    const code = document.getElementById('product-code').value;

    if (produtos[code]) {
        const produto = produtos[code];
        document.getElementById('product-name').textContent = `Nome do Produto: ${produto.nome}`;
        document.getElementById('product-price').textContent = `Preço: R$ ${produto.preco.toFixed(2)}`;
    } else {
        document.getElementById('product-name').textContent = 'Nome do Produto: -';
        document.getElementById('product-price').textContent = 'Preço: R$ 0.00';
    }
}

// Função para adicionar produto ao carrinho
function addProduct() {
    const code = document.getElementById('product-code').value;
    const quantity = parseInt(document.getElementById('quantity').value);

    if (produtos[code]) {
        const produto = produtos[code];
        const precoTotal = produto.preco * quantity;

        carrinho.push({ nome: produto.nome, quantidade: quantity, preco: precoTotal });

        total += precoTotal;
        updateCart();
    } else {
        alert('Código de produto inválido!');
    }

    document.getElementById('product-code').value = '';
    document.getElementById('quantity').value = 1;
}

// Função para atualizar a tabela do carrinho e o valor total
function updateCart() {
    const cartTableBody = document.querySelector('#cart-table tbody');
    cartTableBody.innerHTML = '';

    carrinho.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${item.preco.toFixed(2)}</td>
        `;
        cartTableBody.appendChild(row);
    });

    document.getElementById('total-value').textContent = total.toFixed(2);
}

// Função para calcular o troco com base no valor pago
function calculateChange() {
    const payment = parseFloat(document.getElementById('payment').value);

    if (payment >= total) {
        const troco = payment - total;
        document.getElementById('change-value').textContent = troco.toFixed(2);
    } else {
        alert('Valor pago insuficiente!');
    }
}

// Função para finalizar a compra
function finalizePurchase() {
    if (carrinho.length === 0) {
        alert('O carrinho está vazio!');
        return;
    }

    // Limpa o carrinho e reseta o total
    carrinho = [];
    total = 0;
    updateCart();

    // Limpa o valor do pagamento e do troco
    document.getElementById('payment').value = '';
    document.getElementById('change-value').textContent = '0.00';

    // Exibe a mensagem de sucesso
    document.getElementById('success-message').style.display = 'block';

    // Esconde a mensagem de sucesso após alguns segundos
    setTimeout(() => {
        document.getElementById('success-message').style.display = 'none';
    }, 3000);
}
