import { skin } from './snake.js';

export let isLoading = true;

export function checkLoading() {
  let spinner = document.getElementsByClassName('ytp-spinner')[0];
  spinner.addEventListener('animationstart', addSnakeSpinner);
  spinner.addEventListener('animationcancel', removeSnakeSpinner);
}

export function circleSpin() {
  let div = document.createElement('div');
  document.getElementById('gameBoard').appendChild(div);
  div.id = 'snakeSpinner';
  for (let i = 0; i < 8; i++) {
    let div = document.createElement('div');
    let spinnerSegment = document
      .getElementById('snakeSpinner')
      .appendChild(div);
    spinnerSegment.style.setProperty('--spinnerColor', skin);
  }
}

function removeSnakeSpinner() {
  let snakeSpinner = document.getElementById('snakeSpinner');
  if (snakeSpinner) snakeSpinner.remove();
  isLoading = false;
}

function addSnakeSpinner() {
  circleSpin();
  isLoading = true;
}

export function foodPulse(cycleCount) {
  if (cycleCount % 8 === cycleCount % 16) {
    document.getElementById('foodElement').style.opacity =
      (70 - (cycleCount % 8) * 8) / 100;
  }
}

export function deathAnimation(n = 0) {
  let food = document.getElementById('foodElement');
  let snake = document.getElementsByClassName('snake');
  if (n === 7) return;
  if (n % 2 === 0) {
    for (let i = 0; i < snake.length; i++) {
      snake[i].style.opacity = 0;
    }
    food.style.opacity = 0;
  } else {
    for (let i = 0; i < snake.length; i++) {
      if (i < 12) {
        snake[i].style.opacity = (100 - i * 7) / 100;
      } else {
        snake[i].style.opacity = 0.2;
      }
    }
    food.style.opacity = 0.7;
  }
  n++;
  setTimeout(() => deathAnimation(n), 70);
}
