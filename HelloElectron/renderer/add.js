'use strict'

const { ipcRenderer } = require('electron')

// listen for me the form to be submitted
document.querySelector('#todoForm').addEventListener('submit', (evt) => {
    // prevent default fefresh functionality of forms
    evt.preventDefault()

    // input on the form
    const input = evt.target[0]

    // send todo to main process
    ipcRenderer.send('add-todo', input.value)

    // reset input
    input.value = ''
})