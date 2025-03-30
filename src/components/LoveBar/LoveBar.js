export class LoveBar {
    constructor() {
      this.maxLoveScore = 50;
      this.fillElement = document.getElementById('loveBarFill');
      this.isFull = false;
    }
  
    update(currentScore) {
      const fillPercentage = (currentScore / this.maxLoveScore) * 100;
      this.fillElement.style.height = `${fillPercentage}%`;
      
      // Track full state
      this.isFull = currentScore === this.maxLoveScore;
      return this.isFull;
    }
  
    // Add this new method
    checkFullState() {
      return this.isFull;
    }
    reset() {
        this.fillElement.style.height = "0%";
        this.isFull = false;
      }
  }