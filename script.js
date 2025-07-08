const lista = document.getElementById("lista");
const itemInput = document.getElementById("itemInput");

//transforma a string (vetor) em objetos de lista
let itens = JSON.parse(localStorage.getItem("itens")) || [];

//pega os itens da lista e transforma em vetor para salvar
function salvarNoLocalStorage() {
  localStorage.setItem("itens", JSON.stringify(itens));
}
//função para salvar a lista
function renderizarLista() {
  //limpa a lista antes de adicionar todos os itens de novo
  lista.innerHTML = "";

  itens.forEach((item, index) => {
    const li = document.createElement("li");
    if (item.comprado) li.classList.add("comprado");

    const span = document.createElement("span");
    span.textContent = item.nome;

    const botoes = document.createElement("div");
    botoes.className = "botoes";

    const btnComprar = document.createElement("button");
    btnComprar.textContent = item.comprado ? "Desmarcar" : "Comprado";
    //detecta o click no botão de comprado e executa a função que atualiza o local storage e a lista
    btnComprar.addEventListener("click", () => {
      itens[index].comprado = !itens[index].comprado;
      salvarNoLocalStorage();
      renderizarLista();
    })

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    //detecta o click no botão de remover e executa a função que atualiza o local storage e a lista
    btnRemover.addEventListener("click", () => {
      itens.splice(index, 1);
      salvarNoLocalStorage();
      renderizarLista();
    });

    botoes.appendChild(btnComprar);
    botoes.appendChild(btnRemover);

    li.appendChild(span);
    li.appendChild(botoes);

    lista.appendChild(li);
  });
}


function adicionarItem() {
  const nome = itemInput.value.trim();
  if (nome === "") return;

  itens.push({ nome, comprado: false });
  salvarNoLocalStorage();
  renderizarLista();

  itemInput.value = "";
  itemInput.focus();
}

function contarClick() {
  //checha se tem algo no local storage
  if (localStorage.contadorclick) {
    //se tiver ele transforma em numero e adiciona 1
    localStorage.contadorclick = Number(localStorage.contadorclick)+1;
  }
  else{
    //se nao tiver ele cria e define como 1
    localStorage.contadorclick = 1
  }
  //atualiza o contador com o numero no local storage
  document.getElementById("contador").innerHTML = localStorage.contadorclick
}

//cria o botão de adicionar um item na lista
const btnAdicionar = document.getElementById("btnAdicionar");
//detecta o click no botão adicionar e adiciona o item na lista
btnAdicionar.addEventListener("click", adicionarItem);

//detecta caso enter tenha sido clicado e adiciona um item na lista
itemInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") adicionarItem();
});

renderizarLista();
