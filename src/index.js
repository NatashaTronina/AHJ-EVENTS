import createGame from "./js/Game.js";
import "./css/style.css";

const game = createGame();

game.start();

const stopButton = document.getElementById("stop-button");
if (stopButton) {
  stopButton.addEventListener("click", () => {
    game.stop();
  });
}
