const quiz = [{
    question:'15+20+74=?',
    answers:['14','98','109','124'],
    correct:'109'
    },{
    question:'5+37+14=?',
    answers:['44','56','69','66'],
    correct:'56'
    },{
    question:'15+20+10=?',
    answers:['17','38','45','69'],
    correct:'45'
    }/* ,{
    question:'5+20+54=?',
    answers:['29','58','69','79'],
    correct:'79'
    },{
    question:'9+10+4=?',
    answers:['23','25','26','28'],
    correct:'23'
    },{
    question:'100-20-30=?',
    answers:['40','50','60','70'],
    correct:'50'
    },{
    question:'120-25-12=?',
    answers:['78','83','91','94'],
    correct:'83'
    },{
    question:'2×3×4=?',
    answers:['24','32','34','36'],
    correct:'109'
    },{
    question:'100÷20+74=?',
    answers:['64','72','75','79'],
    correct:'79'
    },{
    question:'115-15÷5=?',
    answers:['15','20','25','30'],
    correct:'20'
    } */
];

const $button = document.getElementsByTagName('button');
const $jsQuestion2 = document.getElementById('js-question2');
const $jsQuestion = document.getElementById('js-question');
let quizIndex = 0;
let score = 0;

//選択セット----------------------------------------------------------------
function setquiz (){
    $jsQuestion.textContent=quiz[quizIndex].question;
    let index = 0;
    while(index < $button.length){
        $button[index].textContent = quiz[quizIndex].answers[index];
        index++;
    }
}
setquiz();

//正誤判定セット---------------------------------------------------------------

function setCorrect (){
    let index = 0
    while(index < $button.length){
        $button[index].addEventListener('click',function(e){
            clickHandler(e);
    });
    index++;
}
}

function clickHandler (e){
    if(quiz[quizIndex].correct === e.target.textContent){
        $jsQuestion2.textContent= '正解!!!';
        score++;
    } else{
        $jsQuestion2.textContent = '不正解...';
    }
    quizIndex++;
    if(quizIndex < quiz.length){
        setquiz();
    }else{
        $jsQuestion2.textContent = '終了!!あなたのスコアは' + score +'/'+ quiz.length + 'です!!!';
    }
}
setCorrect();

