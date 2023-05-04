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
    if(element.classList.contains('to-do')){
        element.classList.toggle('done');

        updateToDo(element.getAttribute('data-id'), element.classList.contains('done'));
    }
}

function updateToDo(id, completed){
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({completed}),
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => console.log(data));
}

function deleteToDo(e){
    const element = e.target;
    if(element.classList.contains('to-do')){
       const id = element.getAttribute('data-id');
       fetch(`${apiUrl}/${id}`,{
        method: "DELETE"
       })
       .then(res => res.json())
       .then(()=>element.remove());
    }
}

const init = ()=>{
    fetchToDos();
    form.addEventListener('submit', addToDo)
    list.addEventListener('click', switchComplete);
    list.addEventListener('dblclick', deleteToDo);
}
document.onload = init();