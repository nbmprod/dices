export class Hearts {
    constructor() {
      this.element = document.getElementById('hearts');
      this.imgElement = document.querySelector('.hearts_img');
      this.count = 0;
    }
  
    update(count) {
      this.count = count;
      this.render();
      this.animate();
    }
  
    increment() {
      this.count++;
      this.update(this.count);
    }
  
    reset() {
      this.count = 0;
      this.update(this.count);
    }
  
    render() {
      this.element.textContent = this.count;
    }
  
    animate() {
      // Add pulse animation
      this.imgElement.classList.add('pulse');
      
      // Remove after animation completes
      setTimeout(() => {
        this.imgElement.classList.remove('pulse');
      }, 1000);
    }
  
    saveToStorage() {
      localStorage.setItem('hearts', this.count);
    }
  
    loadFromStorage() {
      const saved = parseInt(localStorage.getItem('hearts')) || 0;
      this.update(saved);
      return saved;
    }
  }