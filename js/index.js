import { changeBg }from './changeBackgroundSection.js';
import { changeWord } from "./rotateText.js";
// import { init, animate } from './planeta.js';


// Add eventlistener for background
changeBg();

// Start animation change word
changeWord();
setInterval(changeWord, 4000);

// Start animation earth
// init();
// animate();