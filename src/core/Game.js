import { Dice } from '../components/Dice/Dice.js';
import { LoveBar } from '../components/LoveBar/LoveBar.js';
import { Character } from '../components/Character/Character.js';
import { Hearts } from '../components/Hearts/Hearts.js';
import { StateManager } from '../utils/stateManager.js';

class DiceyDiceyGame {
  constructor() {
    this.dice = new Dice();
    this.loveBar = new LoveBar();
    this.character = new Character(() => this.handleCharacterClick());
    this.hearts = new Hearts();
    this.stateManager = new StateManager();
    
    this.state = {
      loveScore: 0,
      hearts: 0
    };
  }

  init() {
    this.loadGameState();
    this.setupEventListeners();
  }

  loadGameState() {
    this.state = this.stateManager.loadState();
    this.loveBar.update(this.state.loveScore);
    this.hearts.update(this.state.hearts);
  }

  setupEventListeners() {
    document.getElementById('freeRollButton').addEventListener('click', () => {
      const rollTotal = this.dice.roll();
      this.handleRollResult(rollTotal);
    });

    document.getElementById('char').addEventListener('click', () => {
      this.resetGame();
    });
  }

  handleRollResult({ total, isDouble }) {

    // if (isDouble) {
    //     // Enhanced double roll reaction
    //     this.character.reactToRoll(total, isDouble);
    //     // this.dice.element.style.animation = 'rainbow-border 1s infinite';
    //     setTimeout(() => {
    //       this.dice.element.style.animation = '';
    //     }, 2000);
    //   }

    // Update character reaction
    this.character.reactToRoll(total, isDouble);
    
    // Check if already full
    const wasFull = this.loveBar.checkFullState();
    
    if (!wasFull) {
      this.state.loveScore = Math.min(this.state.loveScore + total, this.loveBar.maxLoveScore);
      const isNowFull = this.loveBar.update(this.state.loveScore);
      
      // Only award heart if just became full
      if (isNowFull && !wasFull) {
        this.state.hearts++;
        this.hearts.update(this.state.hearts);
        this.character.setFullState(true);
      }
    }
    
    this.stateManager.saveState(this.state);
  }

  handleCharacterClick() {
    this.state.loveScore = 0;
    this.loveBar.reset();
    this.stateManager.clearState();
    this.character.reset();
    
    console.log("Love bar reset!"); // For debugging
  }

  resetGame() {
    this.state.loveScore = 0;
    this.loveBar.reset();
    this.stateManager.clearState();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const game = new DiceyDiceyGame();
  game.init();
});