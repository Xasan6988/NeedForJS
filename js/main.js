'use strict';
const MAX_ENEMY = 8;
const HEIGHT_ELEM = 100;

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
    setting.score += setting.speed;
    score.innerHTML = 'SCORE:<br>' + setting.score;
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
  return (gameArea.offsetHeight / heightElement);
};

const getRandomEnemy = max => Math.floor(Math.random() * max) + 1;

const startGame = () => {
  start.classList.add('hide');
  // music.play();
  // document.body.append(music);
  gameArea.innerHTML = '';

  for (let i = 0; i < getQuantityELements(100); i++) {
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.top = (i * HEIGHT_ELEM) + 'px';
    line.style.height = (HEIGHT_ELEM / 2) + 'px';
    line.y = i * 100;
    gameArea.append(line);
  }

  for (let i = 0; i < getQuantityELements(HEIGHT_ELEM * setting.traffic); i++) {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.y = -HEIGHT_ELEM * setting.traffic * (i + 1);
    enemy.style.left = Math.round((Math.random() * (gameArea.offsetWidth - 50))) + 'px';
    enemy.style.top = enemy.y + 'px';
    enemy.style.background = `transparent
    url(./img/enemy${getRandomEnemy(MAX_ENEMY)}.png)
    center / contain
    no-repeat`;
    gameArea.append(enemy);
  }

  setting.score = 0;
  setting.start = true;
  gameArea.appendChild(car);
  car.style.left = gameArea.offsetWidth / 2 - car.offsetWidth / 2;
  car.style.top = 'auto';
  car.style.bottom = '0px';
  setting.x = car.offsetLeft;
  setting.y = car.offsetTop;
  requestAnimationFrame(playGame);
};

function moveRoad() {
  let lines = document.querySelectorAll('.line');

  lines.forEach(line => {
    line.y += setting.speed;
    line.style.top = line.y + 'px';

    if (line.y >= gameArea.offsetHeight) {
      line.y = -50;
    }

  });
}

function moveEnemy() {
  let enemy = document.querySelectorAll('.enemy');

  enemy.forEach(item => {
    let carRect = car.getBoundingClientRect();
    let enemyRect = item.getBoundingClientRect();
    if (carRect.top <= enemyRect.bottom &&
        carRect.right >= enemyRect.left &&
        carRect.left <= enemyRect.right &&
        carRect.bottom >= enemyRect.top) {
      setting.start = false;
      music.pause();
      let localScore = localStorage.getItem('score');
      if (!localScore) {
        localStorage.setItem('score', setting.score);
      } else if (localScore < setting.score) {
        score.textContent = `Вы установили новый рекорд!\n
        Ваш счёт: ${setting.score}`;
        localStorage.setItem('score', setting.score);
      }

      start.classList.remove('hide');
      start.style.top = score.offsetHeight;
    }
    item.y += setting.speed / 2;
    item.style.top = item.y + 'px';

    if (item.y >= gameArea.offsetHeight) {
      item.y = -HEIGHT_ELEM * setting.traffic;
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

start.addEventListener('click', e => {
  if (e.target.matches('.difficul-btn')) {
    setting.speed = +e.target.dataset.speed;
    setting.traffic = +e.target.dataset.traffic;
    startGame();
  }
});

document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
