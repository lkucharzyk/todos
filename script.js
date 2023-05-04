const apiUrl ='https://jsonplaceholder.typicode.com/todos';

const input = document.querySelector('input');
const form = document.querySelector('form');
const list = document.querySelector('#to-do-list');

function fetchToDos(){
    fetch(apiUrl + '?_limit=10')
    .then(res => res.json())
    .then(toDos =>{
        toDos.forEach(toDo => addToDoToDOM(toDo));

    })
} 


function addToDo(e){
    e.preventDefault();
    const newToDo ={ 
        title: input.value,
        completed: false
    }
    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(newToDo),
        headers:{
            'Content-Type' : 'application/json'
        }  
    })
    .then(res => res.json())
    .then(data => addToDoToDOM(data));
}

function addToDoToDOM(toDo){
    element = document.createElement('div');
    element.innerText = toDo.title;
    element.classList.add('to-do');
    if(toDo.completed){
     element.classList.add('done');
    }
    element.setAttribute('data-id', toDo.id); // własna antrybuty ustawiać z prefiksem data-
    list.appendChild(element);
}

function switchComplete(e){
    const element = e.target;
    element.classList.toggle('done');
}

const init = ()=>{
    fetchToDos();
    form.addEventListener('submit', addToDo)
    list.addEventListener('click', switchComplete);
}
document.onload = init();