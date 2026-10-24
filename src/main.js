import "./style.css";
document.querySelector("#app").innerHTML = `<h1>Minha Lista de Tarefas</h1>

<input id="nova-tarefa" type="text" placeholder="Digite uma Tarefa"/>

<button id="adicionar" type="button">
  Adicionar
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

  const item = document.createElement('li')

  const span = document.createElement('span')
  span.textContent = texto
  span.addEventListener('click', () => {
    item.classList.toggle('feita')
  })

  const remover = document.createElement('button')
  remover.textContent = 'X'
  remover.addEventListener('click', () => {
    item.remove()
  })

  item.appendChild(span)
  item.appendChild(remover)

  lista.appendChild(item)

  campo.value = ''
})