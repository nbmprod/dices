const animations = ['spin-and-fall', 'zoom-spin', 'wobble']; // Variety of animations

let playerScore = 0;
let cpuScore = 0;

// Helper function to create dice face
function createDiceFace(value, diceElement) {
    diceElement.innerHTML = '';
    const dotPositions = {
        1: [4],
        2: [0, 8],
        3: [0, 4, 8],
        4: [0, 2, 6, 8],
        5: [0, 2, 4, 6, 8],
        6: [0, 2, 3, 5, 6, 8],
    };
    const positions = dotPositions[value];
    for (let i = 0; i < 9; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (positions.includes(i)) {
            diceElement.appendChild(dot);
        } else {
            diceElement.appendChild(document.createElement('div'));
        }
    }
}

// Helper function to animate dice
function animateDice(diceElement) {
    const animation = animations[Math.floor(Math.random() * animations.length)]; // Random animation
    diceElement.style.animation = 'none';
    diceElement.offsetWidth; // Trigger reflow to restart animation
    diceElement.style.animation = `${animation} 1s ease-in-out`;
}

// Roll dice for Player or CPU
function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

// CPU Turn
function cpuTurn() {
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');
    const status = document.getElementById('status');
    const playerRollButton = document.getElementById('playerRollButton');
    const freeRollButton = document.getElementById('freeRollButton');

    animateDice(dice1);
    animateDice(dice2);

    setTimeout(() => {
        const cpuRoll1 = rollDice();
        const cpuRoll2 = rollDice();
        cpuScore = cpuRoll1 + cpuRoll2;

        createDiceFace(cpuRoll1, dice1);
        createDiceFace(cpuRoll2, dice2);

        setTimeout(() => {
            // Determine and display winner
            if (playerScore > cpuScore) {
                status.textContent = `Player Wins! Player: ${playerScore}, CPU: ${cpuScore}`;
            } else if (playerScore < cpuScore) {
                status.textContent = `CPU Wins! Player: ${playerScore}, CPU: ${cpuScore}`;
            } else {
                status.textContent = `It's a Tie! Player: ${playerScore}, CPU: ${cpuScore}`;
            }

            // Reactivate buttons after the game finishes
            playerRollButton.disabled = false;
            freeRollButton.disabled = false;
            playerRollButton.textContent = "Play Again!";
        }, 500);
    }, 1000);
}

// Player Turn
function playerTurn() {
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');
    const status = document.getElementById('status');
    const playerRollButton = document.getElementById('playerRollButton');
    const freeRollButton = document.getElementById('freeRollButton');

    // Disable buttons during the game
    playerRollButton.disabled = true;
    freeRollButton.disabled = true;

    status.textContent = "Player's turn...";
    animateDice(dice1);
    animateDice(dice2);

    setTimeout(() => {
        const playerRoll1 = rollDice();
        const playerRoll2 = rollDice();
        playerScore = playerRoll1 + playerRoll2;

        createDiceFace(playerRoll1, dice1);
        createDiceFace(playerRoll2, dice2);

        status.textContent = "CPU's turn...";
        setTimeout(cpuTurn, 1500); // Delay before CPU's turn
    }, 1000);
}

// Free Rolling Mode
function freeRolling() {
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');
    const status = document.getElementById('status');
    const playerRollButton = document.getElementById('playerRollButton');

    // Disable the "Player vs. CPU" button during free rolling
    playerRollButton.disabled = true;

    status.textContent = "Free Rolling Mode! Roll as much as you like.";
    animateDice(dice1);
    animateDice(dice2);

    setTimeout(() => {
        const roll1 = rollDice();
        const roll2 = rollDice();

        createDiceFace(roll1, dice1);
        createDiceFace(roll2, dice2);

        // Re-enable "Player vs. CPU" button after the roll
        playerRollButton.disabled = false;
    }, 1000);
}

// Event Listeners
document.getElementById('playerRollButton').addEventListener('click', playerTurn);
document.getElementById('freeRollButton').addEventListener('click', freeRolling);
