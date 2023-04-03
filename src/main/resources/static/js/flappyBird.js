const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let bird;
let pipes = [];
const gravity = 0.3;
const pipeGap = 100;
const pipeWidth = 110;
let pipeCreationInterval = 1500; // 파이프 생성 시간 간격을 밀리초(ms) 단위로 설정합니다. (예: 1500ms = 1.5초)
let gameInterval;
const frameRate = 1000 / 60; // 60 FPS
let gameSpeed = 5;
let gameStarted = false;
let gameSpeedInterval;


class Bird {
  constructor() {
    this.x = canvas.width / 3;
    this.y = canvas.height / 2;
    this.radius = 20;
    this.velocity = 0;
    this.imgWidth = 60; // 원하는 이미지 너비 값으로 설정
    this.imgHeight = 60; // 원하는 이미지 높이 값으로 설정
    this.img = new Image();
    this.img.src = '/img/bird.png'; // 실제 이미지 URL로 변경하세요
  }

  draw() {
    ctx.drawImage(this.img, this.x - this.imgWidth / 2, this.y - this.imgHeight / 2, this.imgWidth, this.imgHeight);
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    // ctx.fillStyle = 'yellow';
    // ctx.fill();
  }

  update() {
    this.velocity += gravity;
    this.y += this.velocity;
    if (this.y + this.radius > canvas.height) {
      this.y = canvas.height - this.radius;
    }
    this.draw();
  }

  jump() {
    this.velocity = -5;
  }
}

class Pipe {
  constructor(x, y, height, type) {
    this.x = x;
    this.y = y;
    this.width = pipeWidth;
    this.height = height;
    this.type = type;
  }

  draw() {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.x -= gameSpeed;
    this.draw();
  }
}

//파이프 생성
function createPipes() {
  const pipeHeight = Math.random() * (canvas.height - pipeGap - 100) + 100;
  pipes.push(new Pipe(canvas.width, 0, pipeHeight, 'top'));
  pipes.push(
    new Pipe(canvas.width, pipeHeight + pipeGap, canvas.height - pipeHeight - pipeGap, 'bottom')
  );
}

//파이프충돌
function detectCollision(pipe) {
  if (
    bird.y - bird.radius <= pipe.y + pipe.height &&
    bird.y + bird.radius >= pipe.y &&
    bird.x + bird.radius >= pipe.x &&
    bird.x - bird.radius <= pipe.x + pipe.width
  ) {
    return true;
  }
  return false;
}

function detectOutOfFrame() {
    if(bird.y - bird.radius <= 0 || bird.y + bird.radius >= canvas.height) {
        return true;
    }
    return false;
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bird.update();

  if (gameStarted) {
    // if (pipes.length === 0 || pipes[pipes.length - 1].x < canvas.width / 2) {
    //   createPipes();
    // }
    const currentTime = new Date().getTime(); // 현재 시간을 가져옵니다.

    // 마지막으로 파이프가 생성된 시간으로부터 pipeCreationInterval 이상 시간이 지났으면 새로운 파이프를 생성합니다.
    if (pipes.length === 0 || currentTime - lastPipeCreationTime >= pipeCreationInterval) {
      createPipes();
      lastPipeCreationTime = currentTime; // 파이프가 생성된 시간을 업데이트합니다.
    }

    for (let i = 0; i < pipes.length; i++) {
      if (pipes[i].x + pipes[i].width < 0) {
        pipes.splice(i, 1);
        i--;
        continue;
      }
      pipes[i].update();

      if (detectCollision(pipes[i])) {
        gameOver();
      }
      if (detectOutOfFrame()) {
        gameOver();
      }
    }
  }
}

function increaseGameSpeed() {
  gameSpeed += 0.5;
  console.log(gameSpeed);
  pipeCreationInterval -= 50;
}

function startGame() {
  if (!gameStarted) {
    bird = new Bird();
    pipes = [];
    gameSpeed = 5;
    gameStarted = true;
    pipeCreationInterval = 1500;
    document.getElementById('start').disabled = true;
    gameInterval = setInterval(update, frameRate);
    gameSpeedInterval =setInterval(increaseGameSpeed, 5000); // 5초 간격으로 gameSpeed를 증가시킵니다.
  }
}

function gameOver() {
  gameStarted = false;
  clearInterval(gameInterval);
  clearInterval(gameSpeedInterval); // gameSpeed 증가를 중지합니다.
  document.getElementById('start').disabled = false;
}

document.getElementById('start').addEventListener('click', startGame);

canvas.addEventListener('click', () => {
  if (gameStarted) {
    bird.jump();
  }
});

document.addEventListener('keydown', (event) => {
  if (!gameStarted && event.code === 'Space') {
    event.preventDefault(); // 스페이스바의 기본 동작을 막습니다.
    startGame();
  }
  if (gameStarted && event.code === 'Space') {
    event.preventDefault(); // 스페이스바의 기본 동작을 막습니다.
    bird.jump();
  }
});