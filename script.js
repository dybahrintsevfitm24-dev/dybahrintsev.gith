const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

// Масив справ із початковими даними
let todos = [
  { id: 1, text: 'Вивчити HTML', checked: true },
  { id: 2, text: 'Вивчити CSS', checked: true },
  { id: 3, text: 'Вивчити JavaScript', checked: false }
]

// Генерація HTML для однієї справи
function renderTodo(todo) {
  const isChecked = todo.checked ? 'checked' : ''
  const textClass = todo.checked ? 'text-success text-decoration-line-through' : ''

  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${isChecked} onchange="toggleTodo(${todo.id})" />
      <label for="${todo.id}"><span class="${textClass}">${todo.text}</span></label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${todo.id})">delete</button>
    </li>
  `
}

//  Підрахунок та оновлення лічильників
function updateCounter() {
  const totalCount = todos.length
  const uncheckedCount = todos.filter(todo => !todo.checked).length

  itemCountSpan.textContent = totalCount
  uncheckedCountSpan.textContent = uncheckedCount
}

//  Відображення всього списку
function render() {
  const html = todos.map(todo => renderTodo(todo)).join('')
  list.innerHTML = html
  updateCounter()
}

function checkTodo(id) {
  // Знаходимо справу за id та змінюємо її стан на протилежний
  const todo = todos.find(todo => todo.id === id)
  if (todo) {
    todo.checked = !todo.checked
  }

  // Викликаємо функції оновлення відображення та лічильників
  render()
  updateCounter()
}

// Видалення справи зі списку
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id)
  render()
}

// Зміна стану справи (виконана / не виконана)
function toggleTodo(id) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, checked: !todo.checked }
    }
    return todo
  })
  render()
}

// Додавання нової справи
function newTodo() {
  const text = prompt('Введіть назву нової справи:')

  if (text && text.trim() !== '') {
    const todo = {
      id: Date.now(),
      text: text.trim(),
      checked: false
    }

    todos.push(todo)
    render()
  }
}

// Первинне відображення списку при завантаженні
render()