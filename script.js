const allScrews = document.querySelectorAll(".screw-assembly");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

let isAnimating = false;
const totalTurns = 8;
const turnAngle = 90;

function turnOneScrew(screwElement) {
  const screwContainer = screwElement.querySelector(".screw-container");
  const screwHead = screwElement.querySelector(".screw-head");

  let rotation = parseFloat(screwElement.dataset.rotation) || 0;
  let turns = parseInt(screwElement.dataset.turns) || 0;

  if (turns >= totalTurns) return;

  screwContainer.classList.add("wiggling");

  setTimeout(() => {
    screwContainer.classList.remove("wiggling");

    turns++;
    rotation += turnAngle;
    screwHead.style.transform = `rotate(${rotation}deg)`;

    screwElement.dataset.rotation = rotation;
    screwElement.dataset.turns = turns;

    if (turns < totalTurns) {
      const randomDelay = 400 + Math.random() * 400;
      setTimeout(() => turnOneScrew(screwElement), randomDelay);
    }
  }, 250);
}

function startAll() {
  if (isAnimating) return;
  isAnimating = true;

  startBtn.style.display = "none";
  resetBtn.style.display = "inline-block";

  allScrews.forEach((screw, index) => {
    const wrapper = screw.querySelector(".shrinking-wrapper");
    wrapper.classList.add("is-shrinking");

    setTimeout(() => {
      turnOneScrew(screw);
    }, index * 150);
  });
}

function resetAll() {
  isAnimating = false;
  startBtn.style.display = "inline-block";
  resetBtn.style.display = "none";

  allScrews.forEach((screw) => {
    const wrapper = screw.querySelector(".shrinking-wrapper");
    const screwHead = screw.querySelector(".screw-head");

    screw.dataset.rotation = 0;
    screw.dataset.turns = 0;

    wrapper.classList.remove("is-shrinking");

    screwHead.style.transition = "none";
    screwHead.style.transform = "rotate(0deg)";

    setTimeout(() => {
      screwHead.style.transition = `transform var(--turn-duration) cubic-bezier(0.68, -0.55, 0.27, 1.55)`;
    }, 50);
  });
}

startAll();
startBtn.addEventListener("click", startAll);
resetBtn.addEventListener("click", resetAll);
