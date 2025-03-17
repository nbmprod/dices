const animations = ['spin-and-fall', 'zoom-spin', 'wobble']; // Variety of animations
const faceImg = document.querySelector('.char_img'); // Character image element
const loveBarFill = document.getElementById('loveBarFill'); // Love bar fill element

// Game state variables
let totalLoveScore = 0;
const maxLoveScore = 50;

// Helper function to create dice face
function createDiceFace(value, diceElement) {
    // Update the src attribute of the dice image
    diceElement.src = `./dice${value}.png`;
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
    if (total >= 10) {
        return "Incredible roll!";
    } else if (total >= 6) {
        return "Amazing! You're brilliant!";
    } else if (total >= 4) {
        return "Nice roll!";
    } else {
        return "Don't worry, try again!";
    }
}

// Update the love bar based on current total score
function updateLoveBar(rollScore) {
    // Add the current roll to the total score
    totalLoveScore += rollScore;
    
    // Cap the maximum score at maxLoveScore
    if (totalLoveScore > maxLoveScore) {
        totalLoveScore = maxLoveScore;
    }
    
    // Calculate the percentage filled
    const fillPercentage = (totalLoveScore / maxLoveScore) * 100;
    
    // Update the love bar height
    loveBarFill.style.height = `${fillPercentage}%`;
    
    // If the bar is full, add a special class (for potential effects)
    if (fillPercentage >= 100) {
        loveBarFill.classList.add('full');
    } else {
        loveBarFill.classList.remove('full');
    }
}

// Free Rolling Mode
function freeRolling() {
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');
    const status = document.getElementById('status');
    const totalText = document.getElementById('total');

    // Set "waiting" face when rolling
    faceImg.src = "./k_pic1.jpg";

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

        // Update love bar with the roll score
        updateLoveBar(total);

        // Change face based on the score
        if (total >= 6) {
            faceImg.src = "./k_pic2.jpg";
        } else {
            faceImg.src = "./k_pic1.jpg";
        }

        // Fade in the status text
        setTimeout(() => {
            status.classList.remove('hidden');
            status.classList.add('visible');
        }, 300); // Wait for fade-out to complete before showing the new text
    }, 1000);
}

// Initialize love bar to empty
function initGame() {
    // Set initial love bar height to 0%
    loveBarFill.style.height = '0%';
    
    // Initialize the dice faces
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');
    createDiceFace(1, dice1);
    createDiceFace(1, dice2);
}

// Event Listeners
document.getElementById('freeRollButton').addEventListener('click', freeRolling);

// Initialize the game when the page loads
window.addEventListener('load', initGame);
