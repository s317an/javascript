const $form = document.getElementById('form');
const $input = document.getElementById('input');
const $ul = document.getElementById('ul');

const todoGet = JSON.parse(localStorage.getItem('todoSet'));

if(todoGet){
    todoGet.forEach(todos =>{
        add(todos);
    });
}



$form.addEventListener('submit',function(e){
    e.preventDefault();
    add();
});

function add(todos){
    let todo_Text = $input.value;

    if(todos){
        todo_Text = todos.todoText;
    }

    if(todo_Text){
    const li = document.createElement('li');
    li.innerText = todo_Text;
    li.classList.add('list-group-item');

    if(todos && todos.textDecoration){
        li.classList.add('text-decoration-line-through');
    }
    li.addEventListener('contextmenu',function(e){
        e.preventDefault();
        this.remove();
        saveDeta();
    });

    li.addEventListener('click',function(){
        li.classList.toggle('text-decoration-line-through');
        saveDeta();
    });

    $ul.appendChild(li);
    $input.value = '';
    }
    saveDeta();
}

function saveDeta(){
    let lists = document.querySelectorAll('li');
    let todoDeta = [];
    lists.forEach(list =>{
        let todos = {
            todoText:list.innerText,
            textDecoration:list.classList.contains('text-decoration-line-through')
        }
        todoDeta.push(todos);
    });
    localStorage.setItem('todoSet',JSON.stringify(todoDeta));
}



//console.log(document.querySelectorAll('li'));