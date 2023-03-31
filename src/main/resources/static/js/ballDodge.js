var started = false;
document.getElementById('start').addEventListener('click', function() {
// 키보드 이벤트 리스너 등록
document.addEventListener("keydown", function(event) {
  if (event.keyCode === 37) { // 왼쪽 화살표
    playerX -= 30;
    if(playerX < 0) {
      playerX = 0;
    }
  } else if (event.keyCode === 39) { // 오른쪽 화살표
    playerX += 30;
  if(playerX > (canvas.width-playerWidth)) {
     playerX = (canvas.width-playerWidth);
  }
 }
});
  //중복실행 방지
  if(started) {
    return false;
  }
  started = true;
    // 캔버스 요소 가져오기
    var canvas = document.getElementById("game-canvas");

    canvas.width = 400;
    canvas.height = 400;

    // 캔버스에 그리기 위한 2D 컨텍스트 가져오기
    var context = canvas.getContext("2d");

    context.fillRect(0, 0, canvas.width, canvas.height); // 전체 캔버스 초기화


    // 플레이어의 초기 위치
    var playerX = 200;
    var playerY = 370;

    // 플레이어의 크기
    var playerWidth = 30;
    var playerHeight = 30;

    // 공의 초기 위치와 속도
    var ballX = Math.random() * 370 + 15;
    var ballY = 0;
    var ballSpeed = 5;

    // 게임 오버 여부
    gameOver = false;

    var score = 0;

    setInterval(function() {
      score++;
      ballSpeed += 0.03
    }, 100);

    // 게임 루프
    function gameLoop() {
      // 캔버스 지우기
      context.clearRect(0, 0, canvas.width, canvas.height);

      // 공 그리기
      context.beginPath();
      context.arc(ballX, ballY, 15, 0, Math.PI * 2);
      context.fillStyle = "red";
      context.fill();

      // 플레이어 그리기
      context.fillStyle = "blue";
      context.fillRect(playerX, playerY, playerWidth, playerHeight);
      context.font = "30px Arial";
      context.fillStyle = "white";
      context.fillText("점수 : "+score, 0,35);

      // 공 이동
      ballY += ballSpeed;

      // 공이 캔버스 아래쪽 끝에 닿으면 다시 위쪽으로 보냄
      if (ballY > canvas.height) {
        ballX = Math.random() * 370 + 15;
        ballY = 0;
      }

      // 공과 플레이어 충돌 검사
      if (ballY + 15 >= playerY && ballY - 15 <= playerY + playerHeight &&
          ballX + 15 >= playerX && ballX - 15 <= playerX + playerWidth) {
        gameOver = true;
        started = false;
      }

      // 게임 오버면 메시지 출력
      if (gameOver) {
        context.fillText("Game Over", 120,120);
      } else {
    // 게임 오버가 아니면 다시 루프 시작
    requestAnimationFrame(gameLoop);
  }
}
// 게임 루프 시작
gameLoop(0);
});
//왼쪽방향키 클릭 이벤트
document.getElementById('leftArrow').addEventListener('click', function() {
  // 버튼을 클릭하면 위쪽 방향으로 이동하는 코드 작성
  let event = new Event('keydown');
  event.keyCode = 37;
  document.dispatchEvent(event);
});
//오른쪽방향키 클릭 이벤트
document.getElementById('rightArrow').addEventListener('click', function() {
  // 버튼을 클릭하면 위쪽 방향으로 이동하는 코드 작성
  let event = new Event('keydown');
  event.keyCode = 39;
  document.dispatchEvent(event);
});
