'use strict';

// Select Elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceImg = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnInfo = document.querySelector('.btn--info');
const btnClsModal = document.querySelector('.close-modal');
const btnRules = document.querySelector('.btnRules');

const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.overlay');

let scores = [0, 0];
let currentScore = 0;
let activeUser = 0;
let playing = true;

// Initiate values
const resetValues = function () {
  playing = true;
  scores = [0, 0];
  activeUser = 0;
  currentScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceImg.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

const toggleModal = function () {
  modalOverlay.classList.toggle('hidden');
  modal.classList.toggle('hidden');
};

btnRules.addEventListener('click', toggleModal);
btnClsModal.addEventListener('click', toggleModal);
modalOverlay.addEventListener('click', toggleModal);

resetValues();

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    if (!modalOverlay.classList.contains('hidden')) {
      modal.classList.add('hidden');
      modalOverlay.classList.add('hidden');
    }
  }
});

const switchPlayer = function () {
  document.getElementById(`current--${activeUser}`).textContent = 0;
  activeUser = activeUser ? 0 : 1;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    const diceVal = Math.trunc(Math.random() * 6 + 1);
    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${diceVal}.png`;

    if (diceVal === 1) {
      switchPlayer();
    } else {
      currentScore += diceVal;
      document.getElementById(`current--${activeUser}`).textContent =
        currentScore;
    }
  }
});

// Add current to active player and switch player after 100 score check
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activeUser] += currentScore;
    currentScore = 0;
    document.getElementById(`score--${activeUser}`).textContent =
      scores[activeUser];

    if (scores[activeUser] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activeUser}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeUser}`)
        .classList.toggle('player--active');
    } else {
      switchPlayer();
    }
  }
});

// Reset Game
btnNewGame.addEventListener('click', resetValues);

// Game info
btnInfo.addEventListener('click', toggleModal);
