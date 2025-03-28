"use strict";

const MIN_LIMIT = 1,
  MAX_LIMIT = 20;
const INIT_MESSAGE = "Start guessing...";
const NO_INPUT_WARNING = "🚫 No Input Provided";
const INVALID_INPUT_WARNING = "🚫 Invalid Input";
const INPUT_OUT_OF_RANGE_WARNING = "🚫 Number Out of Range";
const CORRECT_GUESS_MESSAGE = "🎉 Correct Guess!";
const LOW_GUESS_MESSAGE = "🔻 Too Low!";
const HIGH_GUESS_MESSAGE = "🔺 Too High!";
const LOST_MESSAGE = "☹️ You Lost!";
const RANDOM_NUMBER_PLACEHOLDER = "?";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setRandomNumber(randomNumber) {
  document.querySelector('[data-testid="random-number"]').textContent =
    randomNumber;
}

function setMessage(message) {
  document.querySelector('[data-testid="message"]').textContent = message;
}

function setScore(score) {
  document.querySelector('[data-testid="score-value"]').textContent = score;
}

function removeGameWonStyles() {
  setRandomNumber(RANDOM_NUMBER_PLACEHOLDER);
  document.querySelector("body").classList.remove("game-won");
  document
    .querySelector('[data-testid="random-number"]')
    .classList.remove("random-number-win");
  document
    .querySelector('[data-testid="check-btn"]')
    .removeAttribute("disabled");
}

function setGameWonStyles() {
  setRandomNumber(randomInt);
  document.querySelector("body").classList.add("game-won");
  document
    .querySelector('[data-testid="random-number"]')
    .classList.add("random-number-win");
  document
    .querySelector('[data-testid="check-btn"]')
    .setAttribute("disabled", true);
}

function updateHighScore() {
  if (score > highScore) {
    highScore = score;
    document.querySelector('[data-testid="highscore-value"]').textContent =
      highScore;
  }
}

function gameLogic(inputInt) {
  if (inputInt > randomInt) {
    setMessage(HIGH_GUESS_MESSAGE);
    score--;
    setScore(score);
  } else if (inputInt < randomInt) {
    setMessage(LOW_GUESS_MESSAGE);
    score--;
    setScore(score);
  } else {
    setMessage(CORRECT_GUESS_MESSAGE);
    setGameWonStyles();
    updateHighScore();
  }

  if (score === 0) {
    setMessage(LOST_MESSAGE);
    document
      .querySelector('[data-testid="check-btn"]')
      .setAttribute("disabled", true);
  }
}

function onCheckBtnClick() {
  const inputStr = document.querySelector('[data-testid="number-input"]').value;
  const inputInt = parseInt(inputStr);

  if (inputStr === "") {
    setMessage(NO_INPUT_WARNING);
  } else if (inputInt === NaN) {
    setMessage(INVALID_INPUT_WARNING);
  } else if (inputInt < MIN_LIMIT || inputInt > MAX_LIMIT) {
    setMessage(INPUT_OUT_OF_RANGE_WARNING);
  } else {
    gameLogic(inputInt);
  }
}

function startGame() {
  randomInt = getRandomInt(MIN_LIMIT, MAX_LIMIT);
  score = 20;

  setScore(score);
  setMessage(INIT_MESSAGE);
  document.querySelector('[data-testid="number-input"]').value = "";
  removeGameWonStyles();
}

function onResetBtnClick() {
  startGame();
}

let randomInt = 0;
let score = 20;
let highScore = 0;

document
  .querySelector('[data-testid="check-btn"]')
  .addEventListener("click", onCheckBtnClick);

document
  .querySelector('[data-testid="reset-game-btn"]')
  .addEventListener("click", onResetBtnClick);

startGame();
