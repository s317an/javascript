const $canvas = document.getElementById('myCanvas');
const ctx = $canvas.getContext('2d');
//------------------------------------------------
let x = $canvas.width / 2;
let y = $canvas.height - 30;
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------
//------------------------------------------------
//----------ボール定義----------------------------------------------
//----------ボールサイズ---------------------------
const ballRadius = 10;
//-------------------------------------------------
function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2);
    ctx.fillStyle = 'rgb(30, 144, 255)';
    ctx.fill();
    ctx.closePath();
}
//--------------------------パドル定義------------------------------
//------------パドル-------------------------------------------------
const paddleWidth = 80;
const paddleHeight = 10;
let paddleX = ($canvas.width - paddleWidth)/2;
let paddleY = ($canvas.height - paddleHeight)-12;
let rightPressed = false;
let leftPressed = false;
document.addEventListener('keydown',keyDownHandler,false);
document.addEventListener('keyup',keyUPHandler,false);
document.addEventListener('mousemove',mouseMoveHandler,false);
//----------------------------------------------------------------------
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,paddleY,paddleWidth,paddleHeight);
    ctx.fillStyle='rgb(255, 105, 180)';
    ctx.fill();
    ctx.closePath();
}
//-------------------キーボード操作---------------------------------------
function keyDownHandler(e){
    if(e.key === 'Right' || e.key === 'ArrowRight'){
        rightPressed = true;
    } else 
    if(e.key === 'Left' || e.key === 'ArrowLeft'){
        leftPressed = true;
    }
}

function keyUPHandler(e){
    if(e.key === 'Left' || e.key === 'ArrowLeft'){
        leftPressed = false;
    } else 
    if (e.key === 'Right' || e.key === 'ArrowRight'){
        rightPressed = false;
    }
}
//----------------------マウス操作------------------------------------------------

function mouseMoveHandler(e){
    const relativeX = e.clientX -$canvas.offsetLeft;
    if(relativeX>0 && relativeX<$canvas.width){
        paddleX = relativeX-paddleWidth/2;
    }
}
//-----------------ブロック定義-----------------------------------------
//---------------ブロック------------------------------
const brickRowCount = 6; //列
const brickColumnCount = 8; //桁
const brickWidth = 70; //ブロック幅
const brickHeight = 20; //ブロック高
const brickPadding = 10; //ブロック同士余白
const brickOffsetTop = 30; //上端
const brickOffsetLeft = 30; //左端
//-----------------------------------------------------
const bricks = [];
for (let c = 0; c < brickColumnCount; c++){
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++){
        bricks[c][r] = {x:0, y:0, status:1};
    }
}
//-------------------------------------------------------
function drawBricks (){
    for(let c= 0; c<brickColumnCount; c++){
        for(let r=0; r<brickRowCount; r++){
            if(bricks[c][r].status===1){
                const brickX = c * (brickWidth + brickPadding) +
                brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) +
                brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX,brickY,brickWidth,brickHeight);
                ctx.fillStyle = 'rgb(0, 0, 0)';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
//-------------------衝突検出定義-----------------------------------
function collisionDetection(){
    for(let c=0; c<brickColumnCount; c++){
        for(let r=0; r<brickRowCount; r++){
            const b = bricks[c][r];
            if(b.status === 1){
                if(x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight){
                dy = -dy;
                b.status = 0;
                score++;
                if(score === brickColumnCount*brickRowCount){
                    alert("YOU WIN !!!  Complete GAME !!!");
                    document.location.reload();
                }
                }
            }
        }
    }
}
//-------------------スコア記録--------------------------------------
let score = 0;
function drawScore(){
    ctx.font = '16px Arial';
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Score: ${score}`, 8, 20);
}
//-------------------ライフ値--------------------------------------
let lives = 3;
function drawLives(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText(`Lives: ${lives}`, $canvas.width - 65, 20);
}


//--------------------------描く------------------------------------
//------------------------------------------------------------------
let dx = 2;
let dy = -2;
//------------------------------------------------------------------
function draw(){
    ctx.clearRect(0,0,$canvas.width,$canvas.height);//動いた跡消す
    x += dx;
    y += dy;
//---------------ボール跳ね返る-----------------------------------------
    if(x+dx > $canvas.width-ballRadius || x+dx < ballRadius){
        dx = -dx;
    }
    if(y+dy < ballRadius){
        dy = -dy;
    }else if(y+dy > ($canvas.height-ballRadius)-20){
        if(x>paddleX && x< paddleX+paddleWidth){
            dy = -dy;
        }else{
            lives--;
            if(!lives){
            alert('GAME OVER');
            document.location.reload();
            clearInterval(interval);
            }else{
                x = $canvas.width/2;
                y = $canvas.height-30;
                dx = 2;
                dy =-2;
                paddleX = ($canvas.width-paddleWidth)/2;
            }
        }
    }    
//----------------パドル移動ロジック------------------------------------
    if(rightPressed){
        paddleX = Math.min(paddleX + 5,$canvas.width-paddleWidth);
    } else
    if(leftPressed){
        paddleX = Math.max(paddleX-5,0);
    }
//---------------------------------------------------------------------
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    drawScore();
    drawLives();
    requestAnimationFrame(draw);
}

draw();

