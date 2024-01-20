class TodoList {
  constructor() {
    this._tasks = [] // where we will store our tasks
  }

  addTask() {
    // CREATE
    const taskInput = document.querySelector('#task-input')
    if (taskInput.value) {
      this._tasks.push(taskInput.value)
      taskInput.value = ''
      this.displayTasks()
    }
  }

  editTask(index) {
    // const taskItem = document.querySelector(`#task-${index}`)
    const overlay = document.querySelector('.overlay')
    const modal = document.querySelector('.modal')
    modal.innerHTML = `
      <h3>Edit Task<h3>
      <input type="text" id="input-${index}" value="${this._tasks[index]}" required>
      <button onclick="todoList.saveTask(${index})">Save</button>
    `

    // SHOW MODAL
    overlay.style.display = 'block'
    setTimeout(() => {
      overlay.classList.add('isVisible')
    }, 100)
  }

  saveTask(index) {
    // UPDATE
    const updatedTask = document.querySelector(`#input-${index}`).value
    this._tasks[index] = updatedTask
    this.displayTasks()

    // HIDE MODAL
    document.querySelector('.overlay').classList.remove('isVisible')
    setTimeout(() => {
      document.querySelector('.overlay').style.display = 'none'
    }, 300)
  }

  deleteTask(index) {
    // DELETE
    this._tasks.splice(index, 1)
    this.displayTasks()
  }

  displayTasks() {
    // READ
    const todoListOutput = document.querySelector('#todo-list') // <ul>
    todoListOutput.innerHTML = ''

    this._tasks.forEach((task, index) => {
      const taskItem = document.createElement('li')
      taskItem.id = `task-${index}`
      taskItem.innerHTML = `${task}`

      const deleteButton = document.createElement('button')
      deleteButton.innerText = 'Delete'
      deleteButton.onclick = () => {
        console.log(`DELETED ${task} with Index ${index}!`)
        this.deleteTask(index)
      }

      const editButton = document.createElement('button')
      editButton.innerText = 'Edit'
      editButton.onclick = () => {
        console.log(`Editing task ${task} with Index ${index}!`)
        this.editTask(index)
      }

      taskItem.appendChild(editButton)
      taskItem.appendChild(deleteButton)
      todoListOutput.appendChild(taskItem)
    })
  }
}

const todoList = new TodoList()

document.querySelector('#task-form').addEventListener('submit', (e) => {
  e.preventDefault()
  todoList.addTask()
})

// CLOSE ON OVERLAY CLICK
document.querySelector('.overlay').addEventListener('click', (e) => {
  document.querySelector('.overlay').classList.remove('isVisible')
  setTimeout(() => {
    document.querySelector('.overlay').style.display = 'none'
  }, 300)
})

document.querySelector('.modal').addEventListener('click', (e) => {
  e.stopPropagation()
})