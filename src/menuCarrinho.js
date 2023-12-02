import { catalogo, lerLocalStorage, salvarLocalStorage } from "./utilidades";

const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ??{};

const carrinho = document.getElementById("carrinho")

function abrirCarrinho() {
    carrinho.classList.add("right-[0px]");
    carrinho.classList.remove("rigth-[-360px]");
}

function fecharCarrinho() {
    carrinho.classList.remove("right-[0px]");
    carrinho.classList.add("right-[-360px]");
}

function enviarProdutosCheckout(idProduto) {
  if(Object.keys(idsProdutoCarrinhoComQuantidade).length === 0) {
    return;
  } 
  window.location.href = "./checkout.html";
}

export function inicializarCarrinho() {
    const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
    const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
    const botaoEnviarCheckout = document.getElementById("finalizar-compra");

    
    botaoFecharCarrinho.addEventListener('click', fecharCarrinho);
    botaoAbrirCarrinho.addEventListener('click', abrirCarrinho);
    botaoEnviarCheckout.addEventListener('click', enviarProdutosCheckout);
}

function removerDoCarrinho(idProduto) {
  delete idsProdutoCarrinhoComQuantidade[idProduto];
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  renderizarProdutosCarrinho();
}

function incrementarQuantidadeProduto(idProduto) {
  idsProdutoCarrinhoComQuantidade[idProduto] ++;
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  atualizarInformacaoQuantidade(idProduto);
}

function decrementarQuantidadeProduto(idProduto) {
  if(idsProdutoCarrinhoComQuantidade[idProduto] === 1) {
    removerDoCarrinho(idProduto);
    return;
  }
  idsProdutoCarrinhoComQuantidade[idProduto] --;
  salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
  atualizarPrecoCarrinho();
  atualizarInformacaoQuantidade(idProduto);
}

function atualizarInformacaoQuantidade(idProduto) {
  const quantidadeProduto = document.getElementById(`quantidade-${idProduto}`);
  quantidadeProduto.innerText = idsProdutoCarrinhoComQuantidade[idProduto]; 
}

function desenharProdutoNoCarrinho(idProduto) {
  const produto = catalogo.find(p => p.id === idProduto);
  const containerProdutoCarrinho = 
    document.getElementById("produtos-carrinho");

  const elementoArticle = document.createElement("article");
  const articleClasses = [
    'flex', 
    'bg-slate-100', 
    'rounded-lg', 
    'p-1', 
    'relative',
  ];
  for(const articleClass of articleClasses) {
    elementoArticle.classList.add(articleClass);
  }
    
  const cartaoProdutoCarrinho = `
    <button id="fechar-card-${produto.id}" class="absolute top-0 right-2">
      <i class="fa-solid fa-circle-xmark text-slate-500 hover:text-slate-800"></i>
    </button>
    <img 
      src="./assets/img/${produto.imagem}" 
      alt="Carrinho: Produto ${produto.nome} da Game Play Store foi adicionado"
      class="h-24 rounded-lg"
    >
    <div class="p-2 flex flex-col justify-between">
      <p class="text-slate-900 text-sm">${produto.nome}</p>
      <p class="text-green-500 text-lg">R$${produto.preco}</p>
    </div>
    <div class="flex text-slate-950 items-end absolute bottom-0 right-2 text-lg">
      <button id="decrementar-carrinho-${produto.id}">-</button>
      <p id="quantidade-${produto.id}" class="ml-2">
        ${idsProdutoCarrinhoComQuantidade[produto.id]}
      </p>
      <button id="incrementar-carrinho-${produto.id}" class="ml-2">+</button>
    </div>`;

  elementoArticle.innerHTML = cartaoProdutoCarrinho
  containerProdutoCarrinho.appendChild(elementoArticle);

  const botaoIncrementar = document.getElementById(`incrementar-carrinho-${produto.id}`);
  const botaoDecrementar = document.getElementById(`decrementar-carrinho-${produto.id}`);
  const botaoFecharCard = document.getElementById(`fechar-card-${produto.id}`);

  botaoIncrementar.addEventListener("click", () => incrementarQuantidadeProduto(produto.id));
  botaoDecrementar.addEventListener("click", () => decrementarQuantidadeProduto(produto.id));
  botaoFecharCard.addEventListener("click", () => removerDoCarrinho(produto.id));
}

export function renderizarProdutosCarrinho(){
  const containerProdutoCarrinho = 
    document.getElementById("produtos-carrinho");
    containerProdutoCarrinho.innerHTML = '';
  
  for(const idProduto in idsProdutoCarrinhoComQuantidade) {
    desenharProdutoNoCarrinho(idProduto);
  }
}

export function adicionarAoCarrinho(idProduto) {
    if(idProduto in idsProdutoCarrinhoComQuantidade) {
      incrementarQuantidadeProduto(idProduto);
      return;
    }
    idsProdutoCarrinhoComQuantidade[idProduto] = 1;
    salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
    desenharProdutoNoCarrinho(idProduto);
    atualizarPrecoCarrinho();
}

export function atualizarPrecoCarrinho() {
  const precoCarrinho = document.getElementById('preco-total');
  let precoTotalCarrinho = 0;
  for(const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade ) {
    precoTotalCarrinho += 
      catalogo.find( p => p.id === idProdutoNoCarrinho).preco * idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];
  }
  precoCarrinho.innerText = `Total: $${precoTotalCarrinho}`;
}