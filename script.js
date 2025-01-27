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
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');

    // Add animation class
    dice1.classList.add('throwing');
    dice2.classList.add('throwing');

    // After animation ends, update dice faces and remove animation class
    setTimeout(() => {
        const dice1Value = Math.floor(Math.random() * 6) + 1;
        const dice2Value = Math.floor(Math.random() * 6) + 1;

        createDiceFace(dice1Value, dice1);
        createDiceFace(dice2Value, dice2);

        dice1.classList.remove('throwing');
        dice2.classList.remove('throwing');
    }, 1000); // Matches animation duration (1s)
}

document.getElementById('rollButton').addEventListener('click', rollDice);
