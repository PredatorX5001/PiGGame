'use strict';
// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0'); //  && Działa tak samo
const score1El = document.getElementById('score--1'); //  && Działa tak samo
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Zmiana gracza
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
// Początkowe ustawienie
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

/**
 * MAIN PROGRAM###############################
 */
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Żur kostką
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generation random roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //.If roll 1 dice switch player
    if (dice !== 1) {
      // Dodanie punktów do puli
      currentScore += dice; // currentScore = currentScore + dice
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Zmiana gracza
      switchPlayer();
    }
  }
});
// Zapis punktów
btnHold.addEventListener('click', function () {
  if (playing) {
    //Dodać currentScore do active player score
    scores[activePlayer] += currentScore; // scores[1] = scores[1]+currentscore[1]
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // Jeśli gracz ma >=100 wygrywa grę
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', function () {
  // console.log('pressed');
  activePlayer = 0;
  document.querySelector(`.player--0`).classList.remove('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');

  scores[0] = 0;
  scores[1] = 0;
  document.getElementById('score--0').textContent = scores[0];
  document.getElementById('score--1').textContent = scores[1];

  currentScore = 0;
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;

  diceEl.classList.add('hidden');

  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--${0}`).classList.add('player--active');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  playing = true;
});
