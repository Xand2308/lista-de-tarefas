import "./style.css";
document.querySelector("#app").innerHTML = `<h1>Minha Lista de Tarefas</h1>

<input id="nova-tarefa" type="text" placeholder="Digite uma Tarefa"/>

<button id="adicionar" type="button">
  Adicionar
</button>

<ul id="lista"></ul>`;

const campo = document.querySelector("#nova-tarefa");
const botao = document.querySelector("#adicionar");
const lista = document.querySelector("#lista");

let tarefas = [];

function salvar() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

const guardadas = localStorage.getItem("tarefas");
if (guardadas) {
  tarefas = JSON.parse(guardadas);
}

console.log(tarefas);

function mostrarTarefas() {
  lista.innerHTML = "";

  tarefas.forEach((tarefa, posicao) => {
    const item = document.createElement("li");
    item.textContent = tarefa.texto;

    if (tarefa.feita) {
      item.classList.add("feita");
    }

    item.addEventListener("click", () => {
      tarefa.feita = !tarefa.feita;
      salvar();
      mostrarTarefas();
    });

    const remover = document.createElement("button");
    remover.textContent = "X";
    remover.addEventListener("click", (evento) => {
      evento.stopPropagation();
      tarefas.splice(posicao, 1);
      salvar();
      mostrarTarefas();
    });

    item.appendChild(remover);

    lista.appendChild(item);
  });
}

mostrarTarefas();

botao.addEventListener("click", () => {
  const texto = campo.value;

  if (texto.trim() === "") {
    return;
  }

  tarefas.push({ texto: texto, feita: false });
  salvar();

  const item = document.createElement("li");
  mostrarTarefas();

  campo.value = "";
});
