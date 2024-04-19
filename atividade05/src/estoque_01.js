let estoque = [];

function criarProduto(id, nome, qtd) {
    return { id, nome, quantidade: parseInt(qtd) };
}

function adicionarProduto(produto) {
    estoque.push(produto);
}

function listarProduto() {
    return estoque;
}

function removerProduto(id) {
    estoque = estoque.filter(produto => produto.id !== id);
}

function editarQuantidade(id, novaQuantidade) {
    estoque.forEach(produto => {
        if (produto.id === id) {
            produto.quantidade = novaQuantidade;
        }
    });
}

module.exports = { criarProduto, adicionarProduto, listarProduto, removerProduto, editarQuantidade };
