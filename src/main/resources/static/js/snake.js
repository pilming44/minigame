var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');

// 캔버스 크기
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

// 스네이크 초기 위치
var snake = [
  { x: 10, y: 10 }
];

// 스네이크 이전 이동방향 초기엔 right
var prevDirection = 'right';
// 스네이크 이동 방향
var direction = 'right';

var score = 0;
// 먹이 위치
let foodXPos = Math.floor(Math.random() * (canvasWidth / 10)) * 10;
while(foodXPos >= canvasWidth - 10 || foodXPos == 0) {
  foodXPos = Math.floor(Math.random() * (canvasWidth / 10)) * 10;
}

let foodYPos = Math.floor(Math.random() * (canvasWidth / 10)) * 10;
while(foodYPos >= canvasWidth - 10 || foodYPos == 0) {
  foodYPos = Math.floor(Math.random() * (canvasWidth / 10)) * 10;
}

var food = {
  x: foodXPos,
  y: foodYPos
};

//게임속도
var gameSpeed = 100;

//게임시작여부
var gameStarted = false;

// 게임 루프
function gameLoop() {

  document.getElementById('score').textContent = score;
  
  // 스네이크 이동
  var head = { x: snake[0].x, y: snake[0].y };
  xPos = head.x;
  yPos = head.y;
  switch (direction) {
    case 'right': 
      //빠른 입력으로 가던방향 반대로 입력할경우 무시하고 기존 방향처리
      if(prevDirection == 'left') {
        direction = 'left';
        head.x -= 10;
      } else {
        head.x += 10;
        prevDirection = 'right';
      }
      break;
      
    case 'left': 
      //빠른 입력으로 가던방향 반대로 입력할경우 무시하고 기존 방향처리
      if(prevDirection == 'right') {
        direction = 'right';
        head.x += 10;
      } else {
        head.x -= 10;
        prevDirection = 'left';
      } 
      break;
    case 'up': 
      //빠른 입력으로 가던방향 반대로 입력할경우 무시하고 기존 방향처리
      if(prevDirection == 'down') {
        direction = 'down';
        head.y += 10;
      } else {
        head.y -= 10;
        prevDirection = 'up';
      }
      break;
    case 'down': 
      //빠른 입력으로 가던방향 반대로 입력할경우 무시하고 기존 방향처리
      if(prevDirection == 'up') {
        direction = 'up';
        head.y -= 10;
      } else {
        head.y += 10;
        prevDirection = 'down';
      }
      break;
  }
  //몸통에 부딪히면 게임오버
  for (var body of snake) {
    if(body.x == head.x && body.y == head.y) {
      ctx.fillStyle = 'red';
      ctx.font = 'bold 35px sans-serif';
      ctx.fillText('GAME OVER', canvasWidth/2-100, canvasHeight/2-100);
      gameStarted = false;
      return;
    }
  }

  // 게임오버 확인
  if (head.x < 0 || head.x >= canvasWidth || head.y < 0 || head.y >= canvasHeight) {
    ctx.fillStyle = 'red';
    ctx.font = 'bold 35px sans-serif';
    ctx.fillText('GAME OVER', canvasWidth/2-100, canvasHeight/2-100);
    gameStarted = false;
    return;
  }

  snake.unshift(head);

  // 스네이크가 먹이를 먹은 경우
  if (head.x === food.x && head.y === food.y) {
    let foodXPos = Math.floor(Math.random() * (canvasWidth / 10)) * 10;
    while(foodXPos >= canvasWidth - 10 || foodXPos == 0) {
      foodXPos = Math.floor(Math.random() * (canvasWidth / 10)) * 10;
    }

    let foodYPos = Math.floor(Math.random() * (canvasWidth / 10)) * 10;
    while(foodYPos >= canvasWidth - 10 || foodYPos == 0) {
      foodYPos = Math.floor(Math.random() * (canvasWidth / 10)) * 10;
    }
    food.x = foodXPos;
    food.y = foodYPos;

    //점수 증가
    score += 1;

    //게임속도 증가
    gameSpeed -= 1;
  } else {
    snake.pop();
  }

  // 게임 화면 업데이트
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, 10, 10);
  ctx.fillStyle = 'green';
  snake.forEach(function (segment) {
    ctx.fillRect(segment.x, segment.y, 10, 10);
  });

  // 게임 루프 반복
  setTimeout(gameLoop, gameSpeed);
}

// 이벤트 처리
document.addEventListener('keydown', function (event) {
  //새로고침키는 예외
  if (event.keyCode !== 116) {
    event.preventDefault(); // 스크롤 이동 방지
  }
  switch (event.keyCode) {
    case 37: if(direction != 'right') direction = 'left'; break;
    case 38: if(direction != 'down') direction = 'up'; break;
    case 39: if(direction != 'left') direction = 'right'; break;
    case 40: if(direction != 'up') direction = 'down'; break;
    case 32: if(!gameStarted){
      gameStarted= true;
      startGame();
    } break;
  }
});

//왼쪽방향키 클릭 이벤트
document.getElementById('leftArrow').addEventListener('click', function() {
  // 버튼을 클릭하면 위쪽 방향으로 이동하는 코드 작성
  let event = new Event('keydown');
  event.keyCode = 37;
  document.dispatchEvent(event);
});

//위방향키 클릭 이벤트
document.getElementById('upArrow').addEventListener('click', function() {
  // 버튼을 클릭하면 위쪽 방향으로 이동하는 코드 작성
  let event = new Event('keydown');
  event.keyCode = 38;
  document.dispatchEvent(event);
});

//오른쪽방향키 클릭 이벤트
document.getElementById('rightArrow').addEventListener('click', function() {
  // 버튼을 클릭하면 위쪽 방향으로 이동하는 코드 작성
  let event = new Event('keydown');
  event.keyCode = 39;
  document.dispatchEvent(event);
});

//아래방향키 클릭 이벤트
document.getElementById('downArrow').addEventListener('click', function() {
  // 버튼을 클릭하면 위쪽 방향으로 이동하는 코드 작성
  let event = new Event('keydown');
  event.keyCode = 40;
  document.dispatchEvent(event);
});

//start 클릭 이벤트
document.getElementById('start').addEventListener('click', function() {
  // 버튼을 클릭하면 위쪽 방향으로 이동하는 코드 작성
  let event = new Event('keydown');
  event.keyCode = 32;
  document.dispatchEvent(event);
});

function startGame() {
  //점수 초기화
  score = 0;

  //속도 초기화
  gameSpeed = 100;

  // 스네이크 배열 초기화
  snake = [{ x: 10, y: 10 }];

  // 스네이크 이동 방향 초기화
  prevDirection = 'right';
  direction = 'right';

  // 먹이 위치 초기화
  let foodXPos = Math.floor(Math.random() * (canvasWidth / 10)) * 10;
  while(foodXPos >= canvasWidth - 10 || foodXPos == 0) {
    foodXPos = Math.floor(Math.random() * (canvasWidth / 10)) * 10;
  }

  let foodYPos = Math.floor(Math.random() * (canvasWidth / 10)) * 10;
  while(foodYPos >= canvasWidth - 10 || foodYPos == 0) {
    foodYPos = Math.floor(Math.random() * (canvasWidth / 10)) * 10;
  }

  food = {
    x: foodXPos,
    y: foodYPos,
  };

  // 게임 루프 시작
  gameLoop();
}