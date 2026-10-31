const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

// Початкові демо-дані
const defaultTodos = [
  { id: 1, text: 'Вивчити HTML', checked: true },
  { id: 2, text: 'Вивчити CSS', checked: true },
  { id: 3, text: 'Вивчити JavaScript', checked: false }
]

// 1. Завантаження справ із Local Storage (якщо їх немає, беруться початкові)
let todos = JSON.parse(localStorage.getItem('todos')) || defaultTodos

// 2. Функція збереження поточного стану масиву у Local Storage
function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos))
}

// 3. Генерація HTML для однієї справи
function renderTodo(todo) {
  const isChecked = todo.checked ? 'checked' : ''
  const textClass = todo.checked ? 'text-success text-decoration-line-through' : ''

  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${isChecked} onchange="checkTodo(${todo.id})" />
      <label for="${todo.id}"><span class="${textClass}">${todo.text}</span></label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${todo.id})">delete</button>
    </li>
  `
}

// 4. Підрахунок та оновлення лічильників
function updateCounter() {
  const totalCount = todos.length
  const uncheckedCount = todos.filter(todo => !todo.checked).length

  itemCountSpan.textContent = totalCount
  uncheckedCountSpan.textContent = uncheckedCount
}

// 5. Відображення всього списку та збереження в Local Storage
function render() {
  const html = todos.map(todo => renderTodo(todo)).join('')
  list.innerHTML = html
  updateCounter()
  saveToLocalStorage() // Зберігаємо дані після кожного оновлення
}

// 6. Перемикання стану справи (виконано / не виконано)
function checkTodo(id) {
  const todo = todos.find(todo => todo.id === id)
  if (todo) {
    todo.checked = !todo.checked
  }
  render()
}

// 7. Видалення справи зі списку
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id)
  render()
}

// 8. Додавання нової справи
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