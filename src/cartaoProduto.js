import { catalogo } from "./utilidades";
import { adicionarAoCarrinho } from "./menuCarrinho";

export function renderizarCatalogo() {
    const containerProduto = document.getElementById("conteiner-produto");

    for(const produtoCatalogo of catalogo) {
        const cartaoProduto = `
        <div class="border-solid w-48 m-2 flex flex-col p-2 justify-between shadow-xl shadow-slate-400 rounded-lg group ${produtoCatalogo.jogo ? 'game': 'console'}" id="card-produto-${produtoCatalogo.id}">
        <img 
            class="h-60 group-hover:scale-110 duration-300 my-3 rounded-lg"
            src="./assets/img/${produtoCatalogo.imagem}"
            alt="Produto ${produtoCatalogo.nome} da Game Play Store"
        >
        <p class="text-sm">${produtoCatalogo.nome}</p>
        <p class="text-sm">${produtoCatalogo.categoria}</p>
        <p class="text-sm">R$${produtoCatalogo.preco}</p>
        <button id="adicionar-${produtoCatalogo.id}" class="bg-slate-950 hover:bg-slate-700 text-slate-200">
            <i class="fa-solid fa-cart-plus"></i>
        </button>
        </div>`;

        containerProduto.innerHTML += cartaoProduto;
    }

    for(const produtoCatalogo of catalogo) {
        const botaoAdicionar = document.getElementById(`adicionar-${produtoCatalogo.id}`);
        botaoAdicionar.addEventListener("click", () => adicionarAoCarrinho(produtoCatalogo.id));
    }
}