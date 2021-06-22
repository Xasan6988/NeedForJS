'use strict';
const score = document.querySelector('.score'),
  start = document.querySelector('.start'),
  gameArea = document.querySelector('.gameArea'),
  car = document.createElement('div');

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
}

const startGame = () => {
  start.classList.add('hide');
  setting.start = true;
  gameArea.appendChild(car);
  requestAnimationFrame(playGame);
  };

const playGame = () => {
  console.log('play game!');
  if (setting.start) {
    requestAnimationFrame(playGame);
  }
};

const startRun = (e) => {
  e.preventDefault();
  keys[e.key] = true;
};

const stopRun = (e) => {
  e.preventDefault();
  keys[e.key] = false;
};

start.addEventListener('click', startGame);

document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);
