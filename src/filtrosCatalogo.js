const catalogoProdutos = document.getElementById("conteiner-produto");

function exibirTodos() {
    const produtosEscondidos = Array.from(catalogoProdutos.getElementsByClassName("hidden"));

    for(const produto of produtosEscondidos){
        produto.classList.remove("hidden")
    }
}

function esconderConsole() {
    exibirTodos();
    const produtosConsoles = Array.from(
        catalogoProdutos.getElementsByClassName("console")
     );
    
    for(const produto of produtosConsoles) {
        produto.classList.add("hidden");
    }
}

function esconderJogo() {
    exibirTodos();
    const produtosJogos = Array.from(
        catalogoProdutos.getElementsByClassName("game")
     );
    
    for(const produto of produtosJogos) {
        produto.classList.add("hidden");
    }
}

export function inicializarFiltros() {
    const exibirTodosProdutos = document.getElementById('exibir-todos');
    const exibirApenasJogos = document.getElementById('exibir-jogos');
    const exibirApenasConsoles = document.getElementById('exibir-consoles');
    
    exibirTodosProdutos.addEventListener("click", exibirTodos);
    exibirApenasJogos.addEventListener("click", esconderConsole);
    exibirApenasConsoles.addEventListener("click", esconderJogo);
}