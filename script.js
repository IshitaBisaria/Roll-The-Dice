`use strict`;


// Selecting Elements
const score0El = document.querySelector(`#score--0`);
const score1El = document.getElementById(`score--1`);
const current0El = document.getElementById(`current--0`);
const current1El = document.getElementById(`current--1`);
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

// State variables
let scores, currentScore, activePlayer, playing;

// Initial Conditions of the Game
const init = function() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add(`hidden`);
    player0El.classList.remove(`player--winner`);
    player1El.classList.remove(`player--winner`);
    player0El.classList.add(`player--active`);
    player1El.classList.remove(`player--active`);
};

init();

// Switching the Player
const swicthPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 1 ? 0 : 1;
    player0El.classList.toggle(`player--active`);
    player1El.classList.toggle(`player--active`);
}


// Rolling dice functionality
btnRoll.addEventListener(`click`, function() {
    if(playing) {
        // 1. Generating a Random dice roll
        const dice = Math.trunc(Math.random()*6)+1;

        // 2. Display dice
        diceEl.classList.remove(`hidden`);
        diceEl.src = `images/dice-${dice}.png`;

        // 3. Check for rolled 1
        if(dice !== 1) {
            // Add dice  to the current score
                currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            // Switch to next player
            swicthPlayer();
        }
    }
});




// Holding the Score functinality
btnHold.addEventListener('click', function() {
    if(playing) {
        // 1. Add Current score to the score of the active player
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // Check if player's score is already at least 100
        if(scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceEl.classList.add(`hidden`);
        } else {
            // Switch the player
            swicthPlayer();
        }
    }
});




// Reseting the game
btnNew.addEventListener(`click`, init);