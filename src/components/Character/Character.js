export class Character {
    constructor(onClickCallback) {
      this.element = document.getElementById('char');
      this.statusElement = document.getElementById('status');
      this.images = {
        default: [
          '../../../assets/images/default1.png',
          '../../../assets/images/default2.png',
          '../../../assets/images/default3.png',
          '../../../assets/images/default4.png',
          '../../../assets/images/default3.png',
          '../../../assets/images/default2.png',
          '../../../assets/images/default1.png',
        ],
        good: [
          '../../../assets/images/good1.png',
          '../../../assets/images/good2.png',
          '../../../assets/images/good3.png',
          '../../../assets/images/good3.png',
          '../../../assets/images/good3.png',
          '../../../assets/images/good2.png',
          '../../../assets/images/good1.png'
        ],
        bad: [
          '../../../assets/images/bad1.png',
          '../../../assets/images/bad2.png',
          '../../../assets/images/bad3.png',
          '../../../assets/images/bad3.png',
          '../../../assets/images/bad3.png',
          '../../../assets/images/bad3.png',
          '../../../assets/images/bad3.png',
          '../../../assets/images/bad3.png',
          '../../../assets/images/bad3.png',
          '../../../assets/images/bad2.png',
          '../../../assets/images/bad2.png',
          '../../../assets/images/bad1.png'
        ],
        special: [
            '../../../assets/images/good1.png',
            '../../../assets/images/good2.png',
            '../../../assets/images/good3.png',
            '../../../assets/images/good3.png',
            '../../../assets/images/good3.png',
            '../../../assets/images/good2.png',
            '../../../assets/images/good1.png'
        ]
      };
      this.preloadImages();
      this.element.addEventListener('click', () => {
        this.reset();
        if (onClickCallback) onClickCallback();
      });
    }
  
    preloadImages() {
      Object.values(this.images).flat().forEach(src => {
        new Image().src = src;
      });
      
      
    }
  
    reactToRoll(total, isDouble) {
        // Reset any ongoing animation
        void this.element.offsetWidth; // Trigger reflow
        
        if (isDouble) {
          this.showReaction('special', 'Wow, double!');
          return;
        }
    
        if (total >= 10) {
          this.showReaction('good', 'Incredible roll!');
        } else if (total >= 7) {
          this.showReaction('good', 'Great roll!');
        } else if (total >= 5) {
          this.showReaction('default', 'Nice!');
        } else {
          this.showReaction('bad', `Don't worry!`);
        }
      }  

    showReaction(type, message) {
      this.playAnimation(type);
      this.setStatus(message);

      if (type === 'special') { // For double rolls
        this.createRainbowText(message);
      }
    }
  
    playAnimation(type) {
      const images = this.images[type];
      let frame = 0;
      const animationInterval = setInterval(() => {
        if (frame >= images.length) {
          clearInterval(animationInterval);
          return;
        }
        this.element.src = images[frame];
        frame++;
      }, 100);
    }
  
    setStatus(text) {
      this.statusElement.textContent = text;
      
      // Add temporary class for emphasis
      if (text === 'DOUBLE!!!' || text === 'Incredible roll!') {
        this.statusElement.classList.add('highlight');
        setTimeout(() => {
          this.statusElement.classList.remove('highlight');
        }, 2000);
      }
    }
  
    setFullState(isFull) {
      if (isFull) {
        this.element.classList.add('bg__full');
        this.setStatus("I am fulfilled! Come back later <3");
      } else {
        this.element.classList.remove('bg__full');
      }
    }

    createRainbowText(text) {
        // Clear previous status
        this.statusElement.innerHTML = '';
        
        // Create individual letter spans
        text.split('').forEach((letter, i) => {
          const span = document.createElement('span');
          span.textContent = letter;
          span.className = 'rainbow-letter';
          span.style.animationDelay = `${i * 0.1}s`;
          this.statusElement.appendChild(span);
        });
      }
  
    reset() {
        this.element.src = this.images.default[0];
        this.setStatus("Hello :3");
        this.element.classList.remove('bg__full');
      }
  }