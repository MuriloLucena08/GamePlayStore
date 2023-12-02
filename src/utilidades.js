export const catalogo = [
    {
        id: "1",
        nome: "Homem-Aranha" ,
        categoria: "Jogo de ps4",
        preco: 120,
        imagem: "product-1.jpg",
        jogo: true
    },
    {
        id: "2",
        nome: "Super-Nintendo Retro" ,
        categoria: "Console",
        preco: 299,
        imagem: "product-2.jpg",
        jogo: false
    },
    {
        id: "3",
        nome: "Red Dead Redemption II" ,
        categoria: "Jogo de ps4",
        preco: 100,
        imagem: "product-3.jpg",
        jogo: true
    },
    {
        id: "4",
        nome: "God of War 4" ,
        categoria: "Jogo de ps4",
        preco: 150,
        imagem: "product-4.jpg",
        jogo: true
    },
    {
        id: "5",
        nome: "FC24" ,
        categoria: "Jogo de ps4",
        preco: 180,
        imagem: "product-5.jpg",
        jogo: true
    },
    {
        id: "6",
        nome: "Video Game Retro 90 Mil Jogos 2 Controles 64GB Sem fio" ,
        categoria: "Console",
        preco: 330.90,
        imagem: "product-6.jpg",
        jogo: false
    },
    {
        id: "7",
        nome: "Console Xbox One S Branco 1TB" ,
        categoria: "Console",
        preco: 2500,
        imagem: "product-7.jpg",
        jogo: false
    },
    {
        id: "8",
        nome: "PlayStation 5" ,
        categoria: "Console",
        preco: 4000,
        imagem: "product-8.jpg",
        jogo: false
    },
];

export function salvarLocalStorage(chave, informacao) {
    localStorage.setItem(chave, JSON.stringify(informacao));
}

export function lerLocalStorage(chave) {
    return JSON.parse(localStorage.getItem(chave));
}

export function apagarDoLocalStorage(chave) {
  localStorage.removeItem(chave);
}

export function desenharProdutoCarrinhoSimples(idProduto, idContainerHtml, quantidadeProduto) {
    const produto = catalogo.find(p => p.id === idProduto);
    const containerProdutoCarrinho = 
      document.getElementById(idContainerHtml);
  
    const elementoArticle = document.createElement("article");
    const articleClasses = [
      'flex', 
      'bg-stone-200', 
      'rounded-lg', 
      'p-1', 
      'mb-2',
      'w-96',
      'relative',
    ];
    for(const articleClass of articleClasses) {
      elementoArticle.classList.add(articleClass);
    }
      
    const cartaoProdutoCarrinho = `
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
        <p id="quantidade-${produto.id}" class="ml-2">
          ${quantidadeProduto}
        </p>
      </div>`;
  
    elementoArticle.innerHTML = cartaoProdutoCarrinho
    containerProdutoCarrinho.appendChild(elementoArticle);
}