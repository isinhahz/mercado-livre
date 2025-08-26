'use strict'

// A função para criar o card agora recebe o objeto 'produto' individual
function criarCardProduto(produto) {
    const produtosContainer = document.getElementById('produtos');

    // Cria o container do card
    const card = document.createElement('div');
    card.classList.add('card-produto');

    // Cria e configura a imagem
    const img = document.createElement('img');
    img.src = `./img/${produto.imagem}`;
    img.alt = produto.nome;
    img.classList.add('imagem-produto');

    // Cria o título com o nome do produto
    const nome = document.createElement('h3');
    nome.textContent = produto.nome;

    // Cria o parágrafo para o preço
    const preco = document.createElement('p');
    // Formata o preço para o padrão de moeda brasileira (opcional, mas recomendado)
    preco.textContent = `R$ ${produto.preco.toFixed(2).replace('.', ',')}`;
    preco.classList.add('preco-produto');

    // Adiciona todos os elementos ao card
    card.appendChild(img);
    card.appendChild(nome);
    card.appendChild(preco); 

    // Adiciona o card completo ao container principal
    produtosContainer.appendChild(card);
}

// A função assíncrona para buscar e exibir os produtos
async function exibirProdutos() {
    try {
        const response = await fetch('./produtos.json');

        // Verifica se a requisição foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao carregar dados dos produtos.');
        }

        const produtos = await response.json();

        // Itera sobre cada produto e cria o card correspondente
        produtos.forEach(criarCardProduto);

    } catch (error) {
        console.error('Erro:', error);
    }
}

// Garante que o código seja executado após o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', exibirProdutos);