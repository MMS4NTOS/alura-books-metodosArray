let livros = []
const endpointApi =
  "https://guilhermeonrails.github.io/casadocodigo/livros.json";
getLivrosApi();
const divLivros = document.querySelector("#livros")
const valorTotalLivros = document.querySelector(
  "#valor_total_livros_disponiveis"
);

async function getLivrosApi() {
    let res = await fetch(endpointApi)
    livros = await res.json();
    let livrosDesconto = aplicarDesconto(livros, .3);
    exibeLivros(livrosDesconto)

}

function aplicarDesconto(livros, desconto) {
    livrosDesconto = livros.map( livro => {
     return {...livro, preco: livro.preco - (livro.preco * desconto)}
  })
  return livrosDesconto

}

function exibeLivros(listaDeLivros) {
  divLivros.innerHTML = ""
  listaDeLivros.forEach(
    (livro) => {
      let disponibilidade = livro.quantidade > 0 ? 'livro_imagens' : 'livro_imagens indisponivel'
      divLivros.innerHTML += `
      <div class="livro">
        <img  class="${disponibilidade}" src="${livro.imagem}" alt="${livro.alt}"/>
      <h2 class="livro__titulo">
        ${livro.titulo}
      </h2>
      <p class="livro__descricao">${livro.autor}</p>
      <p class="livro__preco" id="preco">${livro.preco.toFixed(2)}</p>
      <div class="tags">
        <span class="tag">${livro.categoria}</span>
      </div>
    </div>
        `
    });
}

const botaoFiltrar = document.querySelectorAll(".btn")
botaoFiltrar.forEach((e) =>
  e.addEventListener("click", (e) => filtrarLivros(e.target.value))
);

function filtrarLivros(valueCategoria) {
    if (valueCategoria === 'ordenar'){
      exibeLivros(livros.sort((a, b) => a.preco - b.preco))
    }
    else if (valueCategoria === "disponiveis") {
       const filtroDisponíveis = livros.filter((livro) => livro.quantidade > 0 )
       exibeLivros(filtroDisponíveis)
       valorTotalLivros.innerHTML = `
       <div class="livros__disponiveis">
        <p>Todos os livros disponíveis por R$ <span id="valor">${(filtroDisponíveis.reduce((acc, livro) => (acc + livro.preco), 0 ) *  0.9 ).toFixed(2)}</span></p>
       </div> 
       `;

    }
    else {
       exibeLivros(livros.filter(livro => livro.categoria == valueCategoria))
    }
   }