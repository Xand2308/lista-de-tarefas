import "./style.css";
document.querySelector("#app").innerHTML = `<h1>Minha Lista de Tarefas</h1>

<input id="nova-tarefa" type="text" placeholder="Digite uma Tarefa"/>

<button id="adicionar" type="button">
  Adicionar
</button>

<div id="filtros">
<button data-filtro="todas">Todas</button>
<button data-filtro="pendentes">Pendentes</button>
<button data-filtro="feitas">Feitas</button>
</div>

<p id="contador"></p>

<ul id="lista"></ul>`;

const campo = document.querySelector("#nova-tarefa");
const botao = document.querySelector("#adicionar");
const lista = document.querySelector("#lista");
const contador = document.querySelector("#contador");

let tarefas = [];
let filtroAtual = "todas";

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

  const totalFeitas = tarefas.filter((tarefa) => tarefa.feita).length;
  contador.textContent = `${totalFeitas} de ${tarefas.length} feitas`;

  const visiveis = tarefas.filter((tarefa) => {
    if (filtroAtual === "pendentes") {
      return !tarefa.feita;
    }

    if (filtroAtual === "feitas") {
      return tarefa.feita;
    }
    return true;
  });

  visiveis.forEach((tarefa) => {
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

    item.addEventListener("dblclick", () => {
      const novoTexto = prompt("Editar tarefa:", tarefa.texto);
      if (novoTexto === null || novoTexto.trim() === "") {
        return;
      }

      tarefa.texto = novoTexto;
      salvar();
      mostrarTarefas();
    });

    const editar = document.createElement("button");
    editar.textContent = "✏️";
    editar.addEventListener("click", (evento) => {
      evento.stopPropagation();
      const novoTexto = prompt("Editar tarefa:", tarefa.texto);

      if (novoTexto === null || novoTexto.trim() === "") {
        return;
      }

      tarefa.texto = novoTexto;
      salvar();
      mostrarTarefas();
    });
    item.appendChild(editar);

    const remover = document.createElement("button");
    remover.textContent = "X";
    remover.addEventListener("click", (evento) => {
      evento.stopPropagation();
      tarefas.splice(tarefas.indexOf(tarefa), 1);
      salvar();
      mostrarTarefas();
    });

    const botoes = document.createElement("div");
    botoes.appendChild(editar);
    botoes.appendChild(remover);
    item.appendChild(botoes);

    lista.appendChild(item);
  });
}

mostrarTarefas();

function adicionarTarefa() {
  const texto = campo.value;

  if (texto.trim() === "") {
    return;
  }

  tarefas.push({ texto: texto, feita: false });
  salvar();
  mostrarTarefas();

  campo.value = "";
}

botao.addEventListener("click", adicionarTarefa);

campo.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") {
    adicionarTarefa();
  }
});

const botoesFiltro = document.querySelectorAll("#filtros button");

botoesFiltro.forEach((botaoFiltro) => {
  botaoFiltro.addEventListener("click", () => {
    filtroAtual = botaoFiltro.dataset.filtro;
    mostrarTarefas();
  });
});


const botaoTema = document.querySelector("#tema");

function atualizarIcone() {
  const claro = document.body.classList.contains("claro");
  botaoTema.textContent = claro ? "🌞" : "🌛";
}


botaoTema.addEventListener("click", () => {
  document.body.classList.toggle("claro");
  const claro = document.body.classList.contains("claro");
  localStorage.setItem("tema", claro ? "claro" : "escuro");
  atualizarIcone();
});

if(localStorage.getItem("tema") === "claro") {
  document.body.classList.add("claro");
}