const allScrews = document.querySelectorAll(".screw-assembly");
const allSvgObjects = document.querySelectorAll("object");
const loaderContainer = document.getElementById("loader-container");
const masterContainer = document.querySelector(".master-container");

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
  allScrews.forEach((screw, index) => {
    const wrapper = screw.querySelector(".shrinking-wrapper");
    wrapper.classList.add("is-shrinking");

    setTimeout(() => {
      turnOneScrew(screw);
    }, index * 150);
  });
}

let assetsLoaded = 0;
const totalAssets = allSvgObjects.length;

function onAssetLoad() {
  assetsLoaded++;

  if (assetsLoaded === totalAssets) {
    loaderContainer.classList.add("hidden");

    masterContainer.classList.remove("hidden");

    startAll();
  }
}

if (totalAssets === 0) {
  onAssetLoad();
} else {
  allSvgObjects.forEach((obj) => {
    obj.addEventListener("load", onAssetLoad);
    obj.addEventListener("error", onAssetLoad);
  });
}
