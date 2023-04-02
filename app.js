"use strict";

// popup

const btnRulesEl = document.getElementById("btn-rules");
const popupEl = document.getElementById("popup-rules");
const btnClosePopupEl = document.getElementById("btn-close");
const bodyEl = document.body;

btnRulesEl.addEventListener("click", function () {
  popupEl.classList.add("popup-show");
});

btnClosePopupEl.addEventListener("click", function () {
  popupEl.classList.remove("popup-show");
});

popupEl.addEventListener("click", function (e) {
  if (e.target.className === "popup-rules popup-show") {
    popupEl.classList.remove("popup-show");
  }
});

// functional game

const totalScore0 = document.querySelector("#total-score-0");
const totalScore1 = document.querySelector("#total-score-1");

const currentScore0 = document.getElementById("current-score-0");
const currentScore1 = document.getElementById("current-score-1");

const user0 = document.querySelector(".user0");
const user1 = document.querySelector(".user1");

const diceEl = document.querySelector(".dice");
diceEl.classList.add("hidden");

const btnRoll = document.getElementById("btn-roll");
const btnSave = document.getElementById("btn-save");
const btnNewGame = document.getElementById("btn-new");

let currentScore = 0;
let activePlayer = 0;
let totalScores = [0, 0];
let isPlaying = true;

const initGame = function () {
  diceEl.classList.add("hidden");

  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  totalScore0.textContent = 0;
  totalScore1.textContent = 0;
  user0.classList.remove("user-active");
  user1.classList.remove("user-active");
  user0.classList.remove("winner");
  user1.classList.remove("winner");
  user0.classList.add("user-active");

  currentScore = 0;
  activePlayer = 0;
  totalScores = [0, 0];
  isPlaying = true;
};

const switchActivePlayer = function () {
  currentScore = 0;
  document.getElementById(`current-score-${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  user0.classList.toggle("user-active");
  user1.classList.toggle("user-active");
};

// functional roll the dice
const onClickBtnRoll = function () {
  if (isPlaying) {
    // Generate a random number
    let randomNumber = Math.trunc(Math.random() * 6) + 1;

    // Show number on the dice
    diceEl.classList.remove("hidden");
    diceEl.src = `images/${randomNumber}.png`;

    // if number = 1, switch to next player
    if (randomNumber !== 1) {
      currentScore += randomNumber;
      document.getElementById(`current-score-${activePlayer}`).textContent =
        currentScore;
    } else {
      switchActivePlayer();
    }
  }
};

btnRoll.addEventListener("click", onClickBtnRoll);

const onClickBtnSave = function () {
  if (isPlaying) {
    // add current score to active player
    totalScores[activePlayer] += currentScore;
    document.getElementById(`total-score-${activePlayer}`).textContent =
      totalScores[activePlayer];
    // check total score (total score >= 100)
    if (totalScores[activePlayer] >= 100) {
      isPlaying = false;
      document.querySelector(`.user${activePlayer}`).classList.add("winner");
      document
        .querySelector(`.user${activePlayer}`)
        .classList.remove("user-active");
      diceEl.classList.add("hidden");
    } else {
      switchActivePlayer();
    }
  }
};

btnSave.addEventListener("click", onClickBtnSave);

btnNewGame.addEventListener("click", initGame);
