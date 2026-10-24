import "./style.css";
document.querySelector("#app").innerHTML = `<h1>Minha Lista de Tarefas</h1>

<input id="nova-tarefa" type="text" placeholder="Digite uma Tarefa"/>

<button id="adicionar" type="button">
  Adiconar
</button>

<ul id="lista"></ul>`;

const campo = document.querySelector("#nova-tarefa")
const botao = document.querySelector("#adicionar")
const lista = document.querySelector("#lista")

botao.addEventListener("click", () => {
  const texto = campo.value;

  if (texto.trim() === "") {
    return
  }

  const item = document.createElement("li")
  item.textContent = texto

  item.addEventListener("click", () => {
    item.classList.toggle("feita")
  })

  
  lista.appendChild(item)

  campo.value = ""
})
