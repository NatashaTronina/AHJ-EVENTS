import createGame from "./js/game.js";
import "./css/style.css";

const game = createGame();

const startButton = document.getElementById("start-button");
if (startButton) {
  startButton.addEventListener("click", () => {
    game.start();
  });
} else {
  console.warn("index.js - Кнопка Start не найдена!");
}

const stopButton = document.getElementById("stop-button");
if (stopButton) {
  stopButton.addEventListener("click", () => {
    game.stop();
  });
} else {
  console.warn("index.js - Кнопка Stop не найдена!");
}
