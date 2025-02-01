const animations = ['spin-and-fall', 'zoom-spin', 'wobble']; // Variety of animations
const faceImg = document.querySelector('.char_img'); // Character image element

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

// Generate motivational text based on roll result
function getMotivationalText(total) {
    if (total >= 6) {
        return "Amazing! You're brilliant!";
    } else {
        return "Don't worry, try again!";
    }
}

// Free Rolling Mode
function freeRolling() {
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');
    const status = document.getElementById('status');
    const totalText = document.getElementById('total');

    // Set "waiting" face when rolling
    faceImg.src = "./face_right.PNG";

    // Fade out the status text
    status.classList.remove('visible');
    status.classList.add('hidden');

    animateDice(dice1);
    animateDice(dice2);

    setTimeout(() => {
        const roll1 = rollDice();
        const roll2 = rollDice();
        const total = roll1 + roll2;

        createDiceFace(roll1, dice1);
        createDiceFace(roll2, dice2);

        // Update status with motivational text
        status.textContent = getMotivationalText(total);
        totalText.textContent = total;

        // Change face based on the score
        if (total >= 6) {
            faceImg.src = "./face_happy.PNG";
        } else {
            faceImg.src = "./face_upset.PNG";
        }

        // Fade in the status text
        setTimeout(() => {
            status.classList.remove('hidden');
            status.classList.add('visible');
        }, 300); // Wait for fade-out to complete before showing the new text
    }, 1000);
}

// Event Listeners
document.getElementById('freeRollButton').addEventListener('click', freeRolling);
