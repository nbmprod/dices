// Asset preloading utility
export async function preloadAssets() {
    const images = [
      '../assets/images/default1.png',
      '../assets/images/default2.png',
      '../assets/images/default3.png',
      '../assets/images/default4.png',
      '../assets/images/dice1.png',
      '../assets/images/dice2.png',
      '../assets/images/dice3.png',
      '../assets/images/dice4.png',
      '../assets/images/bad1.png',
      '../assets/images/bad2.png',
      '../assets/images/bad3.png',
      '../assets/images/good1.png',
      '../assets/images/good2.png',
      '../assets/images/good3.png',
      '../assets/images/heart.png',
      '../assets/imageslove_bg.png',
     
    ];
  
    await Promise.all(
      images.map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
        });
      })
    );
  }