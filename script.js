const animations = ['spin-and-fall', 'zoom-spin', 'wobble']; // Variety of animations
const faceImg = document.querySelector('.char_img'); // Character image element
const loveBarFill = document.getElementById('loveBarFill'); // Love bar fill element
const status = document.getElementById('status');

const char = document.getElementById("char");
// Game state variables
let totalLoveScore = 0;
const maxLoveScore = 50;
loadLoveBar();



let heartCount = 0;

let roll1 = 0;
let roll2 = 0;

// Show heart
function addHeart(){
    let heartText = document.getElementById('hearts');

    if (heartCount >= 1) {
        heartText.textContent = `${heartCount}`;
    }

}

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

// Roll dice
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

// Load stored love bar progress on page load
function loadLoveBar() {
    let savedLoveScore = localStorage.getItem("loveScore");
    let fullTimestamp = localStorage.getItem("loveBarFullTime");

    // Initialize score
    let loadedScore = savedLoveScore !== null ? parseInt(savedLoveScore) : 0;
    totalLoveScore = loadedScore;

    // Only check decay if the bar was full and we have a timestamp
    if (fullTimestamp !== null && loadedScore === maxLoveScore) {
        const elapsedSeconds = (Date.now() - parseInt(fullTimestamp)) / 1000;
        
        if (elapsedSeconds >= 3600) { // After 60 seconds (1 minute)
            totalLoveScore = 0;
            localStorage.removeItem("loveBarFullTime");
            localStorage.setItem("loveScore", 0);
            console.log("❤️ Love bar reset to 0 after 60 seconds");
        } 
        // If less than 30 seconds, keep it full
        console.log(`Decay check - Current score: ${totalLoveScore}, Elapsed: ${elapsedSeconds}s`);
    }

    updateLoveBarVisuals();
   

    // Special case handling when full
    if (totalLoveScore === maxLoveScore) {
        char.classList.add('bg__full');
        status.textContent = "I am fulfilled! Come back in some time <3";
        status.classList.add('text__pink');
    } else if (totalLoveScore == 0) {
        char.classList.remove('bg__full');
        status.textContent = "Hello :3";

        status.classList.remove('text__pink');
        // Clear the timestamp if the bar isn't full anymore
        if (fullTimestamp !== null) {
            localStorage.removeItem("loveBarFullTime");
        }
    }
}

// Update the reset click handler to also clear the timestamp
char.addEventListener("click", function() {
    totalLoveScore = 0;
    loveBarFill.style.height = "0%";
    char.classList.remove('bg__full');
    localStorage.removeItem("loveScore");
    localStorage.removeItem("loveBarFullTime"); // Add this line
    updateLoveBarVisuals(); // Add this to ensure visuals update
});

function updateLoveBarVisuals() {
    const fillPercentage = (totalLoveScore / maxLoveScore) * 100;
    loveBarFill.style.height = `${fillPercentage}%`;

    if (totalLoveScore === maxLoveScore) {
        loveBarFill.classList.add('full');
    } else {
        loveBarFill.classList.remove('full');
    }

    // Save the current state

    // Load hearts
    const hearts = parseInt(localStorage.getItem("hearts")) || 0;
    updateHeartDisplay(hearts);
}


function saveLoveBar() {
    console.log("Saving loveScore:", totalLoveScore); // Debugging
    localStorage.setItem("loveScore", totalLoveScore);
}

// Update the love bar and store progress
function updateLoveBar(rollScore) {
    const wasFull = (totalLoveScore === maxLoveScore);
    
    // Update the total score
    totalLoveScore += rollScore;
    
    // Cap the score to the max limit
    if (totalLoveScore >= maxLoveScore) {
        totalLoveScore = maxLoveScore;
        
        // Only award heart if we just reached full (not if already full)
        if (!wasFull) {
            awardHeart();
            localStorage.setItem("loveBarFullTime", Date.now());
        }
    }

    // Calculate the percentage filled
    const fillPercentage = (totalLoveScore / maxLoveScore) * 100;
    
    // Update visual elements
    loveBarFill.style.height = `${fillPercentage}%`;
    
    if (totalLoveScore === maxLoveScore) {
        loveBarFill.classList.add('full');
        char.classList.add('bg__full');
        status.textContent = "I am fulfilled! Come back in some time <3";
        status.classList.add('text__pink');
    } else {
        loveBarFill.classList.remove('full');
        char.classList.remove('bg__full');
        status.classList.remove('text__pink');
    }

    localStorage.setItem("loveScore", totalLoveScore);
}

function awardHeart() {
    // Load current hearts
    let hearts = parseInt(localStorage.getItem("hearts")) || 0;
    
    // Add one heart
    hearts += 1;
    
    // Save and update display
    localStorage.setItem("hearts", hearts);
    updateHeartDisplay(hearts);
    
    // Optional: Add visual/audio feedback
    console.log("Awarded 1 heart! Total:", hearts);
}

function updateHeartDisplay(count) {
    const heartText = document.getElementById('hearts');
    heartText.textContent = count;
    
    // Optional: Add animation
    const heartImg = document.querySelector('.hearts_img');
    heartImg.classList.add('pulse');
    setTimeout(() => heartImg.classList.remove('pulse'), 500);
}

// Reset love bar on character click
char.addEventListener("click", function () {
    totalLoveScore = 0;
    loveBarFill.style.height = "0%";
    char.classList.remove('bg__full');
    localStorage.removeItem("loveScore"); // Remove saved progress
});

// Initialize game with stored progress
window.addEventListener("load", loadLoveBar);

// Preload all character images
const charImages = {
    default: ['./default1.png', './default2.png', './default3.png', './default4.png'],
    good: ['./good1.png', './good2.png', './good3.png'],
    bad: ['./bad1.png', './bad2.png', './bad3.png'],
    double: ['./good1.png', './good2.png', './good3.png']
};

// Function to preload images
function preloadImages(images) {
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Preload all images
Object.values(charImages).forEach(preloadImages);

// Function to play an animation sequence
function playAnimation(images, duration) {
    const charImg = document.getElementById('char');
    let index = 0;

    const interval = setInterval(() => {
        if (index >= images.length) {
            clearInterval(interval);
            return;
        }
        charImg.src = images[index];
        index++;
    }, duration / images.length);
}

// Free Rolling Mode
function freeRolling() {
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');
    const totalText = document.getElementById('total');
    const charImg = document.getElementById('char');

    // Set "waiting" face when rolling
    charImg.src = charImages.default[0]; // Reset to default image

    // Fade out the status text
    status.classList.remove('visible');
    status.classList.add('hidden');

    animateDice(dice1);
    animateDice(dice2);

    setTimeout(() => {
        roll1 = rollDice();
        roll2 = rollDice();
        const total = roll1 + roll2;

        createDiceFace(roll1, dice1);
        createDiceFace(roll2, dice2);

        // Update status with motivational text
        status.textContent = getMotivationalText(total);
        totalText.textContent = total;

        // Update love bar with the roll score
        updateLoveBar(total);

        // Change face based on the score
        if (total >= 6 && roll1 != roll2) {
            playAnimation(charImages.good, 100, () => {
                charImg.src = charImages.good[charImages.good.length - 1]; // Set last frame after animation
            });
        } else if (total < 6 && roll1 != roll2) {
            playAnimation(charImages.bad, 100, () => {
                charImg.src = charImages.bad[charImages.bad.length - 1]; // Set last frame after animation
            });        
        } else if (roll1 == roll2) {
            playAnimation(charImages.double, 100, () => {
                charImg.src = charImages.double[charImages.double.length - 1]; // Set last frame after animation
            });            
            status.textContent = "DOUBLE!!!";
            totalText.textContent = `2x ${total}`;
            updateLoveBar(total);
        } else {
            charImg.src = charImages.default[0]; // Default image
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
    loadLoveBar(); // Load saved love bar state

    // Initialize dice faces
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');
    createDiceFace(1, dice1);
    createDiceFace(1, dice2);
}


// Event Listeners
document.getElementById('freeRollButton').addEventListener('click', freeRolling);

// Initialize the game when the page loads
window.addEventListener('load', initGame);

// Auto-check every minute to update the love bar decay
// Change your interval to this (at the bottom of the file):
setInterval(() => {
    loadLoveBar(); // This handles the decay logic
}, 1000); // Check every second instead of every 100ms

