//Define variables
const form = document.querySelector('#task-form');
const ul = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load all event listeners
loadEventListeners();

function loadEventListeners() {
    //Add task event
    form.addEventListener('submit', addTask);
}

//Add task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Добавьте задачу!');
    }

    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    ul.appendChild(li);
    e.preventDefault()
}