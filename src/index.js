import createGame from "./js/game.js";
import "./css/style.css";


const game = createGame();

const stopButtonInitial = document.getElementById("stop-button");
if (stopButtonInitial) {
    stopButtonInitial.disabled = true;1
    console.warn("index.js - Кнопка StopGame не найдена!");
}

game.start();

const stopButton = document.getElementById("stop-button");
if (stopButton) {
  stopButton.addEventListener("click", () => {
    game.stop();
  });
} else {
    console.warn("index.js - Кнопка StopGame не найдена для добавления слушателя!");
}