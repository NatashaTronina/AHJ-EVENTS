import { initializeGame, stopGame } from "./game.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeGame();

  const stopButton = document.getElementById("stop-button");
  if (!stopButton) {
    console.error("Error: Stop button not found in DOM. Check HTML ID.");
    return;
  }

  stopButton.disabled = false;

  stopButton.addEventListener("click", () => {
    stopGame();
    stopButton.disabled = true;
    stopButton.textContent = "Game Stopped";
  });
});
