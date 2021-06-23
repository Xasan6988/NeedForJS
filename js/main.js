'use strict';
const MAX_ENEMY = 8;

const score = document.querySelector('.score'),
  start = document.querySelector('.start'),
  gameArea = document.querySelector('.gameArea'),
  car = document.createElement('div');

// const music = document.createElement('embed');
// music.src = 'audio.mp3';
// music.classList.add('visually-hidden')

const music = new Audio('audio.mp3');



car.classList.add('car');

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};

const setting = {
  start: false,
  score: 0,
  speed: 3,
  traffic: 2,
};

const playGame = () => {
  if (setting.start) {
    moveRoad();
    moveEnemy();

    if (keys.ArrowLeft && setting.x > 0) {
      setting.x -= setting.speed;
    }
    if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
      setting.x += setting.speed;
    }
    if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
      setting.y += setting.speed;
    }
    if (keys.ArrowUp && setting.y > 0) {
      setting.y -= setting.speed;
    }
    car.style.top = setting.y + 'px';
    car.style.left = setting.x + 'px';
    requestAnimationFrame(playGame);
  }
};

const getQuantityELements = (heightElement) => {
  return document.documentElement.clientHeight / heightElement;
};

const getRandomEnemy = max => Math.floor(Math.random() * max) + 1;

const startGame = () => {
  start.classList.add('hide');
  music.play();
  // document.body.append(music);
  gameArea.style.minHeight = 100 + 'vh';

  for (let i = 0; i < getQuantityELements(100); i++) {
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.top = (i*100) + 'px';
    line.y = i * 100;
    gameArea.append(line);
  }

  for (let i = 0; i < getQuantityELements(100 * setting.traffic); i++) {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.y = -100 * setting.traffic * (i + 1);
    enemy.style.left = Math.round((Math.random() * (gameArea.offsetWidth - 50))) + 'px';
    enemy.style.top = enemy.y + 'px';
    enemy.style.background = `transparent
    url(./img/enemy${getRandomEnemy(MAX_ENEMY)}.png)
    center / cover
    no-repeat`;
    gameArea.appendChild(enemy);
  }

  setting.start = true;
  gameArea.appendChild(car);
  setting.x = car.offsetLeft;
  setting.y = car.offsetTop;
  requestAnimationFrame(playGame);
};

function moveRoad() {
  let lines = document.querySelectorAll('.line');

  lines.forEach(line => {
    line.y += setting.speed;
    line.style.top = line.y + 'px';

    if (line.y >= document.documentElement.clientHeight) {
      line.y = -50;
    }

  });
}

function moveEnemy() {
  let enemy = document.querySelectorAll('.enemy');

  enemy.forEach(item => {
    item.y += setting.speed / 2;
    item.style.top = item.y + 'px';

    if (item.y >= document.documentElement.clientHeight) {
      item.y = -100 * setting.traffic;
      item.style.left = Math.round((Math.random() * (gameArea.offsetWidth - 50))) + 'px';
      item.style.background = `transparent
      url(./img/enemy${getRandomEnemy(MAX_ENEMY)}.png)
      center / cover
      no-repeat`;
    }
  });
}

const startRun = (e) => {
  if (keys.hasOwnProperty(e.key)) {
  e.preventDefault();
  keys[e.key] = true;
  }
};

const stopRun = (e) => {
  if (keys.hasOwnProperty(e.key)) {
  e.preventDefault();
  keys[e.key] = false;
  }
};

start.addEventListener('click', startGame);

document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
