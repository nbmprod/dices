export class Dice {
    constructor() {
        this.dice1 = document.getElementById('dice1');
        this.dice2 = document.getElementById('dice2');
        this.scoreElement = document.getElementById('total');
        this.animations = ['spin-and-fall', 'zoom-spin', 'wobble'];
      }
    
      roll() {
        const roll1 = Math.floor(Math.random() * 6) + 1;
        const roll2 = Math.floor(Math.random() * 6) + 1;
        
        this.animateDice(this.dice1);
        this.animateDice(this.dice2);
        
        setTimeout(() => {
          this.dice1.src = `./assets/images/dice${roll1}.png`;
          this.dice2.src = `./assets/images/dice${roll2}.png`;
          this.updateScoreDisplay(roll1, roll2);
        }, 1000);
        
        return {
          total: roll1 + roll2,
          isDouble: roll1 === roll2
        };
      }
    
      updateScoreDisplay(roll1, roll2) {
        if (roll1 === roll2) {
          this.scoreElement.textContent = `2x ${roll1 + roll2}`;
        } else {
          this.scoreElement.textContent = roll1 + roll2;
        }
      }
  
    animateDice(diceElement) {
      const animation = this.animations[Math.floor(Math.random() * this.animations.length)];
      diceElement.style.animation = 'none';
      void diceElement.offsetWidth; // Trigger reflow
      diceElement.style.animation = `${animation} 1s ease-in-out`;
    }
  }