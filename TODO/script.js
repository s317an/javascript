const $form = document.getElementById('form');
const $input = document.getElementById('input');
const $ul = document.getElementById('ul');

//--------セーブデータ取出し---------------
const todoKeys = JSON.parse(localStorage.getItem('todoKeys'));
//-----------------------------------------------

if(todoKeys){
    todoKeys.forEach(todoDetas =>{
        add(todoDetas);
    });
}


//--------入力フォーム定義----------------

$form.addEventListener('submit',function(e){
    e.preventDefault();
    add();
});

//--------入力フォーム定義-------------

function add(todoDetas){
    let todoText = $input.value;
//--------"セーブデータあるとセットする"----------
    if(todoDetas){
        todoText = todoDetas.Text;
    }

    if(todoText){
        const li = document.createElement('li');
        li.innerText = todoText; 
        li.classList.add('list-group-item');
        if(todoDetas && todoDetas.completion){
            li.classList.add('text-decoration-line-through');
    }
//----------"右クリックでli削除"------------------
    li.addEventListener('contextmenu',function(e){
        e.preventDefault();
        li.remove();
        saveDeta();
    });
//----------"左クリックで取消線"------------------
　　li.addEventListener('click',function(){
        li.classList.toggle('text-decoration-line-through');
        saveDeta();
    })

        $ul.appendChild(li);
        $input.value = '';
        saveDeta();
    }
}


//----------セーブデータ定義--------------

function saveDeta(){
    const lists = document.querySelectorAll('li');
    let todoSaveDeta = [];
    lists.forEach(list =>{
        let todoDetas = {
            Text: list.innerText,
            completion: list.classList.contains('text-decoration-line-through')
        }
        todoSaveDeta.push(todoDetas);
    });

    localStorage.setItem('todoKeys',JSON.stringify(todoSaveDeta));
}
