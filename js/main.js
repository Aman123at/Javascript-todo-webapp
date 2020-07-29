document.getElementById('InputForm').addEventListener('submit', (e) => {
    var todo_title = document.getElementById('title').value;
    console.log(todo_title)
    var todo_desc = document.getElementById('descrpt').value;
    console.log(todo_desc)
    e.preventDefault();
    sendStorage();
    fetchStorage();
});

// Send Data to Local Storage

function sendStorage() {
    var todo_title = document.getElementById('title').value;
    var todo_desc = document.getElementById('descrpt').value;
    var todo_date = new Date();
    var todo = {
        title: todo_title,
        description: todo_desc,
        date: todo_date
    }
    if (localStorage.getItem('todos') == null) {
        var todos = [];
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    } else {
        var todos = JSON.parse(localStorage.getItem('todos'));
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

// Fetch data from localstorage and show on display using DOM 

function fetchStorage() {
    var todos = JSON.parse(localStorage.getItem('todos'));
    var todo_list = document.getElementById('todoList');
    todo_list.innerHTML = '';
    for (var i = 0; i < todos.length; i++) {
        var title = todos[i].title;
        var description = todos[i].description;
        var date = todos[i].date;
        todo_list.innerHTML += `<div class="container mt-2">
                                <div class="jumbotron">
                                    <h1>${title}</h1>
                                <p class="lead">${description} </p>
                                <h6><b>Todo Posted On : ${date}</b></h6>
                                <a class="btn btn-success" id="${i}" onclick="deleteTodo(this.id)" role="button">Done</a>
                                </div>
                                </div>`


    }
}

// Delete TODO (invidual)

function deleteTodo(i) {
    console.log("delete", i)
    let todo = localStorage.getItem('todos')
    if (todo == null) {
        todo_list = [];
    } else {
        todo_list = JSON.parse(todo)
    }
    todo_list.splice(i, 1)
    localStorage.setItem('todos', JSON.stringify(todo_list))
    fetchStorage();
}