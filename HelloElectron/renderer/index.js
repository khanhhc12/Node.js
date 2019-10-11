'use strict'

const { ipcRenderer } = require('electron')

// delete todo by its text value ( used below in event listener )
const deleteTodo = (e) => {
    ipcRenderer.send('delete-todo', e.target.textContent)
}

// open Add Todo Window button
document.querySelector('#createTodoBtn').addEventListener('click', () => {
    ipcRenderer.send('add-todo-window')
})

// on receive toodes
ipcRenderer.on('todos', (event, todos) => {
    // get the todoList ul
    const todoList = document.querySelector("#todoList")

    // create html string
    const todoItems = todos.reduce((html, todo) => {
        html += `<li class="todo-item">${todo}</li>`

        return html
    }, '')

    // set list html to the todo items
    todoList.innerHTML = todoItems

    // add click handlers to delete the clicked todo
    todoList.querySelectorAll('.todo-item').forEach(item => {
        item.addEventListener('click', deleteTodo)
    })
})