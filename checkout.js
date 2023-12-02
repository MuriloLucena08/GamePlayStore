import {
    catalogo,
    desenharProdutoCarrinhoSimples,
    lerLocalStorage,
    apagarDoLocalStorage,
    salvarLocalStorage
} from "./src/utilidades";

function desenharProdutosCheckout() {
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};

    for(const idProduto in idsProdutoCarrinhoComQuantidade) {
        desenharProdutoCarrinhoSimples(
            idProduto,
            "conteiner-produtos-checkout",
            idsProdutoCarrinhoComQuantidade[idProduto]
        );
    }
}

function precoCheckout() {
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
    const precoCheckout = document.getElementById('preco-final');
    let precoFinal = 0;
    for(const idProdutoCheckout in idsProdutoCarrinhoComQuantidade ) {
        precoFinal += 
        catalogo.find( p => p.id === idProdutoCheckout).preco * idsProdutoCarrinhoComQuantidade[idProdutoCheckout];
    }
  precoCheckout.innerText = `Total: $${precoFinal}`;
}

function finalizarCompra(e) {
    e.preventDefault();
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
    if(Object.keys(idsProdutoCarrinhoComQuantidade) === 0) {
        return;
    }

    const dataAtual = new Date();
    const pedidoFeito = {
        dataPedido:dataAtual,
        pedido: idsProdutoCarrinhoComQuantidade
    };
    const historicoDePedidos = lerLocalStorage('historico') ?? [];
    const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];

    salvarLocalStorage("historico", historicoDePedidosAtualizado);
    apagarDoLocalStorage("carrinho");
    
    window.location.href = './pedidos.html';
}

desenharProdutosCheckout();
precoCheckout();

const botaoFinalizarCheckout = document.getElementById("Finalizar-compra-checkout");
botaoFinalizarCheckout = document.addEventListener("submit", (evt) => finalizarCompra(evt));