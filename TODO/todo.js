const $form = document.getElementById('form');
const $input = document.getElementById('input');
const $ul = document.getElementById('ul');

const todos = JSON.parse(localStorage.getItem('todos'));

if(todos){
    todos.forEach(todo =>{
        add(todo);
    });
}

$form.addEventListener('submit',function(e){
    e.preventDefault();
    add();
})

function add(todo){
    let todoTxst = $input.value;
    if(todo){
        todoTxst = todo.text;
    }
    if(todoTxst){
        const li = document.createElement('li');
        li.innerText = todoTxst;
        li.classList.add('list-group-item');

    if(todo && todo.completed){
        li.classList.add('text-decoration-line-through');
    }

    //右クリック'li'削除
    li.addEventListener('contextmenu', function(e){
        e.preventDefault();
        li.remove();
        saveDeta();
    });
    //左クリック取り消し線
    li.addEventListener('click',function(){
        li.classList.toggle('text-decoration-line-through');
        saveDeta();
    });
    $ul.appendChild(li);
    $input.value = '';
    }
    saveDeta();
}
//データ保存
function saveDeta(){
    const lists = document.querySelectorAll('li');
    let todos= [];
    lists.forEach(list =>{
        const todo = {
            text: list.innerText,
            completed: list.classList.contains('text-decoration-line-through')
        }
        todos.push(todo);
    });
    localStorage.setItem('todos',JSON.stringify(todos));
}
