const gamerArea = document.getElementById('game-area');
const player = document.querySelector('#player');
const beyonce = document.querySelector('#beyonce');
const backgroundMusic = document.getElementById('background-music');
const difficulty = document.getElementById('difficulty');
const background = document.getElementById('background');
const darkMode = document.getElementById('dark-mode');
const musicSelector = document.getElementById('music');
const applySettings = document.getElementById('apply-settings');
const startGameButton = document.getElementById('start-game');

let playerSpeed = 15;
let beyonceSpeed = 1;
let isGameActive = false;

let playerPosition = { x: 0, y: 0 };
let beyoncePosition = { x: 700, y: 500 };

function updatePosition() {
  player.style.transform = `translate(${playerPosition.x}px, ${playerPosition.y}px)`;
  beyonce.style.transform = `translate(${beyoncePosition.x}px, ${beyoncePosition.y}px)`;
  checkCollision();
}

function movePlayer(event) {
  if (!isGameActive) return;
  
  switch (event.key) {
    case 'ArrowUp':
      playerPosition.y = Math.max(playerPosition.y - playerSpeed, 0);
      break;
    case 'ArrowDown':
      playerPosition.y = Math.min(playerPosition.y + playerSpeed, gamerArea.offsetHeight - player.offsetHeight);
      break;
    case 'ArrowLeft':
      playerPosition.x = Math.max(playerPosition.x - playerSpeed, 0);
      break;
    case 'ArrowRight':
      playerPosition.x = Math.min(playerPosition.x + playerSpeed, gamerArea.offsetWidth - player.offsetWidth);
      break;
  }
  updatePosition();
}

function moveBeyonce() {
  if (!isGameActive) return;

  const deltaX = playerPosition.x - beyoncePosition.x;
  const deltaY = playerPosition.y - beyoncePosition.y;
  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

  if (distance > 1) {
    const moveX = (deltaX / distance) * beyonceSpeed;
    const moveY = (deltaY / distance) * beyonceSpeed;

    beyoncePosition.x = Math.min(Math.max(beyoncePosition.x + moveX, 0), gamerArea.offsetWidth - player.offsetWidth);
    beyoncePosition.y = Math.min(Math.max(beyoncePosition.y + moveY, 0), gamerArea.offsetHeight - player.offsetHeight);

    updatePosition();
  }

  requestAnimationFrame(moveBeyonce);
}

function checkCollision() {
  if (
    playerPosition.x < beyoncePosition.x + player.offsetWidth &&
    playerPosition.x + player.offsetWidth > beyoncePosition.x &&
    playerPosition.y < beyoncePosition.y + player.offsetHeight &&
    playerPosition.y + player.offsetHeight > beyoncePosition.y
  ) {
    alert('¡Beyoncé te atrapó!');
    isGameActive = false;
    backgroundMusic.pause();
  }
}

applySettings.addEventListener('click', () => {
  gamerArea.style.backgroundColor = background.value;
  if (darkMode.checked) {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
  } else {
    document.body.style.backgroundColor = '';
    document.body.style.color = '';
  }

  if (musicSelector.value === 'Megalovania') {
    backgroundMusic.src = 'Undertale - Megalovania.mp3';
  } else {
    backgroundMusic.src = 'Tema1.mp3'; // Cambiar según la música disponible
  }

  if (darkMode.checked) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
});

startGameButton.addEventListener('click', () => {
  isGameActive = true;
  playerPosition = { x: 0, y: 0 };
  beyoncePosition = { x: 700, y: 500 };
  updatePosition();
  backgroundMusic.play();
  moveBeyonce();
});

window.addEventListener('keydown', movePlayer);
