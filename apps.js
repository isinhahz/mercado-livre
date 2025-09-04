'use strict'

//
function criarCardProduto(produto) {
    const produtosContainer = document.getElementById('produtos');
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

    //Container para classificação dos produtos
    const classificacaoContainer = document.createElement('div');
    classificacaoContainer.classList.add('classificacao-estrela');

    // Loop para criar as estrelas de classificação
    for (let i = 1; i <= 5; i++) {
        const estrela = document.createElement('span');
        estrela.classList.add('estrela');
        // Se a nota do produto for maior ou igual ao número da estrela, ela é "preenchida"
        if (i <= produto.classificacao) {
            estrela.classList.add('preenchida');
        }
        estrela.textContent = '★'; // Caractere de estrela
        classificacaoContainer.appendChild(estrela);
    }

    // Cria o parágrafo para o preço
    const preco = document.createElement('p');
    // Formata o preço para o padrão de moeda brasileira (opcional, mas recomendado)
    preco.textContent = `R$ ${produto.preco.toFixed(2).replace('.', ',')}`;
    preco.classList.add('preco-produto');

    const botaoComprar = document.createElement('button');
    botaoComprar.textContent = 'Comprar';
    botaoComprar.classList.add('botao-comprar');
    botaoComprar.addEventListener('click', () => {
        alert(`Produto "${produto.nome}" adicionado ao carrinho!`);
    });

    // Adiciona todos os elementos ao card
    card.appendChild(img);
    card.appendChild(nome);
    card.appendChild(preco);
    card.appendChild(botaoComprar);
    card.appendChild(classificacaoContainer);

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