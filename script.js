function createDiceFace(value, diceElement) {
    // Clear previous dots
    diceElement.innerHTML = '';

    // Dot positions for each dice face
    const dotPositions = {
        1: [4],
        2: [0, 8],
        3: [0, 4, 8],
        4: [0, 2, 6, 8],
        5: [0, 2, 4, 6, 8],
        6: [0, 2, 3, 5, 6, 8],
    };

    // Add dots for the given value
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

function rollDice() {
    const dice1Value = Math.floor(Math.random() * 6) + 1;
    const dice2Value = Math.floor(Math.random() * 6) + 1;

    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');

    createDiceFace(dice1Value, dice1);
    createDiceFace(dice2Value, dice2);
}

document.getElementById('rollButton').addEventListener('click', rollDice);
