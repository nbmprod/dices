export class StateManager {
    constructor() {
      this.STORAGE_KEYS = {
        LOVE_SCORE: 'loveScore',
        HEARTS: 'hearts',
        FULL_TIME: 'loveBarFullTime'
      };
    }
  
    loadState() {
      const loveScore = parseInt(localStorage.getItem(this.STORAGE_KEYS.LOVE_SCORE)) || 0;
      const hearts = parseInt(localStorage.getItem(this.STORAGE_KEYS.HEARTS)) || 0;
      
      // Check for decay if full
      const fullTime = localStorage.getItem(this.STORAGE_KEYS.FULL_TIME);
      if (fullTime && loveScore === 50) {
        if ((Date.now() - parseInt(fullTime)) > 3600000) { // 1 hour
          this.clearState();
          return { loveScore: 0, hearts };
        }
      }
      
      return { loveScore, hearts };
    }
  
    saveState({ loveScore, hearts }) {
      localStorage.setItem(this.STORAGE_KEYS.LOVE_SCORE, loveScore);
      localStorage.setItem(this.STORAGE_KEYS.HEARTS, hearts);
      
      if (loveScore === 50) {
        localStorage.setItem(this.STORAGE_KEYS.FULL_TIME, Date.now());
      }
    }
  
    clearState() {
        localStorage.removeItem(this.STORAGE_KEYS.LOVE_SCORE);
        localStorage.removeItem(this.STORAGE_KEYS.HEARTS);
        localStorage.removeItem(this.STORAGE_KEYS.FULL_TIME);
      }
  }