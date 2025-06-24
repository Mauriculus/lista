const lista = document.getElementById("lista");
const itemInput = document.getElementById("itemInput");

let itens = JSON.parse(localStorage.getItem("itens")) || [];

function salvarNoLocalStorage() {
  localStorage.setItem("itens", JSON.stringify(itens));
}

function renderizarLista() {
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
    btnComprar.onclick = () => {
      itens[index].comprado = !itens[index].comprado;
      salvarNoLocalStorage();
      renderizarLista();
    };

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.onclick = () => {
      itens.splice(index, 1);
      salvarNoLocalStorage();
      renderizarLista();
    };

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

renderizarLista();
