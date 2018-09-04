//Define variables
const form = document.querySelector('#task-form');
const ul = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
//const deleteTask = document.querySelector(''); Load all event listeners
loadEventListeners();

function loadEventListeners() {
    //Add task event
    form.addEventListener('submit', addTask);
    //remove task event
    ul.addEventListener('click', removeTask);
    // remove all tasks event
    clearBtn.addEventListener('click', removeAllTasks);
    //Filter through the tasks
    filter.addEventListener('keyup', filterTasks);
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
}

//Get tasks from local storage

function getTasks() {
    if (localStorage.getItem('tasks') !== null) {
        const tasks = JSON.parse(localStorage.getItem('tasks'));

        tasks.forEach(function (task) {
            const li = document.createElement('li');
            li.className = 'collection-item';
            li.appendChild(document.createTextNode(task));

            const link = document.createElement('a');
            link.className = 'delete-item secondary-content';
            link.innerHTML = '<i class="fa fa-remove"></i>';

            li.appendChild(link);
            ul.appendChild(li);
        })
    }

}

//Add task function
function addTask(e) {
    if (taskInput.value === '') {
        alert('Добавьте задачу!');
    } else {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));

        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';

        li.appendChild(link);
        ul.appendChild(li);

        //Add to local storage
        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = '';
    }

    e.preventDefault()
}

//LS storing function
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks))
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }
}

//Remove task function
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Вы действительно хотите удалить эту задачу?')) 
            e
                .target
                .parentElement
                .parentElement
                .remove();
        
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}

//function to remove task from local storage
function removeTaskFromLocalStorage(li) {
    if (localStorage.getItem('tasks') !== null) {
        const tasks = JSON.parse(localStorage.getItem('tasks'));

        tasks.forEach(function(task, index){
            if (li.textContent == task)
            tasks.splice(index, 1);
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

//Remove all tasks
function removeAllTasks() {
    if (confirm('Вы уверены что хотите очистить список задач?')) {
        /* const listItems = document.querySelectorAll('li');
        listItems.forEach(function(li){
            li.remove();
        }) */

        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }

        removeAllTasksFromLocalStorage();
    }
}

function removeAllTasksFromLocalStorage(){
    if (localStorage.getItem('tasks') !== null)
    {
        localStorage.clear();
    }
}

//Task filtering funtion
function filterTasks(e) {
    const text = e
        .target
        .value
        .toLowerCase();

    document
        .querySelectorAll('.collection-item')
        .forEach(function (task) {
            const item = task
                .firstChild
                .textContent
                .toLowerCase()
            if (item.indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
}
