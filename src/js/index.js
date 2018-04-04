import '../css/main.css';

const todos = document.querySelector('.todos'),
    input = todos.querySelector('.todos__input'),
    filterInput = todos.querySelector('.todos__filter'),
    addBtn = todos.querySelector('.todos__btn'),
    clearAll = todos.querySelector('.todos__clear'),
    list = todos.querySelector('.todos__list');

let storageArr = [];

if (localStorage.storage) {
    storageArr = JSON.parse(localStorage.storage);
    loadTasks(storageArr);
}
addBtn.addEventListener('click', addTask);
filterInput.addEventListener('keyup', filter);
clearAll.addEventListener('click', deleteAllTasks);
list.addEventListener('click', deleteTask);
todos.addEventListener('keyup', (e) => {

    if (e.target.value != '' && e.target.getAttribute('type') === 'text') {
        e.target.parentNode.classList.add('filled');
    } else {
        e.target.parentNode.classList.remove('filled');
    }
})

function loadTasks (arr) {
    arr.forEach((task) => {
        list.appendChild(createElem(task));
    })
}

function createElem (text) {
    let item = document.createElement('li'),
        label = document.createElement('label'),
        checkbox = document.createElement('input'),
        span = document.createElement('span'),
        delBtn = document.createElement('a'),
        delBtnLine = document.createElement('span');

    item.className = 'todos__item';
    checkbox.className = 'todos__checkbox';
    checkbox.setAttribute('type', 'checkbox');
    span.className = 'todos__text';
    span.textContent = text;
    delBtn.className = 'todos__delete delete-btn btn';
    delBtnLine.className = 'delete-btn__line';

    let delBtnLine2 = delBtnLine.cloneNode(true);

    label.appendChild(checkbox);
    label.appendChild(span);
    delBtn.appendChild(delBtnLine);
    delBtn.appendChild(delBtnLine2);
    item.appendChild(label);
    item.appendChild(delBtn);

    return item;
}

function isMatching (full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
}

function filter (e) {
    let tasksList = document.querySelectorAll('.todos__item');

    for (let i = 0; i < tasksList.length; i++) {
        if (isMatching(tasksList[i].innerText, e.target.value)) {
            tasksList[i].style.display = 'flex';
        } else if (!isMatching(tasksList[i].innerText, e.target.value)) {
            tasksList[i].style.display = 'none';
        }
        if (!e.target.value) {
            tasksList[i].style.display = 'flex';
        }
    }
}

function addTask () {
    if (input.value.length > 2) {
        localStorage.storage ? storageArr = JSON.parse(localStorage.storage) : storageArr = [];
        list.appendChild(createElem(input.value));
        storageArr.push(input.value);
        localStorage.storage = JSON.stringify(storageArr);
        input.value = '';
        input.parentNode.classList.remove('filled');
    }
}
function deleteTask (e) {

    let tasksList = document.querySelectorAll('.todos__item'),
        storeArr;

    if (localStorage.storage) {
        storeArr = JSON.parse(localStorage.storage);
    }

    if (e.target.classList.contains('todos__delete')) {
        e.preventDefault();
        list.removeChild(e.target.parentNode);
        tasksList.forEach((item, ndx) => {
            if (item === e.target.parentNode) {
                storeArr.splice(ndx, 1);
                localStorage.storage = JSON.stringify(storeArr);
            }
        })
    }
}
function deleteAllTasks () {
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    localStorage.storage = '';
}