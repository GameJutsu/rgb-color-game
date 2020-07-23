NodeList.prototype.indexOf = Array.prototype.indexOf;
var colors;
var pickedColor;
var difficulty = 6;
var bgcolor = document.body.style.backgroundColor;
var root = document.documentElement;
var defColor = getComputedStyle(root).getPropertyValue("--defColor");
var squares = document.querySelectorAll(".square");
var message = document.querySelector("#message");
var playAgainButton = document.querySelector("#playAgainButton");
var modeButtons = document.querySelectorAll(".mode");
var colorCodeHead = [];
import { CountUp } from "/assets/js/lib/countup.js";
const currScoreText = document.getElementById("currentScore");
const highScoreText = document.getElementById("highscore");
var currScore = 0;
var won = false;
var loss = false;

let red = new CountUp("red", 0, {
  duration: 2,
});
let green = new CountUp("green", 0, {
  duration: 2,
});
let blue = new CountUp("blue", 0, {
  duration: 2,
});

init();

function init() {
  modeButtons[1].classList.add("selected");
  playAgainButton.addEventListener("click", playAgain);
  setupModeButtons();
  playAgain();
}

function setupModeButtons() {
  for (var i = 0; i < 2; i++) {
    modeButtons[i].addEventListener("click", function () {
      currScore = 0;
      this.classList.add("selected");
      //Using indexOf because i changes to 2 after loading
      modeButtons[1 - modeButtons.indexOf(this)].classList.remove("selected");
      difficulty = 3 + 3 * modeButtons.indexOf(this);
      playAgain();
      if (modeButtons.indexOf(this) == 0) {
        for (var j = 3; j < squares.length; j++) {
          squares[j].style.backgroundColor = bgcolor;
        }
      }
    });
  }
}

function pickRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1));
}

function generateRandomColors(difficulty) {
  var colors = [];
  var pickedNumber = pickRandom(0, difficulty - 1);
  for (var i = 0; i < difficulty; i++) {
    var colorCode = [];
    for (var j = 0; j < 3; j++) {
      colorCode.push(pickRandom(0, 255));
      if (i == pickedNumber) {
        colorCodeHead = colorCode;
      }
    }
    colors.push(
      "rgb(" + colorCode[0] + ", " + colorCode[1] + ", " + colorCode[2] + ")"
    );
  }
  colors[difficulty] = pickedNumber;
  return colors;
}

function setupSquares() {
  for (var i = 0; i < difficulty; i++) {
    squares[i].style.backgroundColor = colors[i];
    squares[i].addEventListener("click", function () {
      if (difficulty != 3 || squares.indexOf(this) <= 2) {
        if (this.style.backgroundColor == pickedColor) {
          for (var i = 0; i < difficulty; i++) {
            squares[i].style.backgroundColor = pickedColor;
          }
          message.textContent = "Correct!";
          message.style.color = "green";
          document.querySelector("h1").style.backgroundColor = pickedColor;
          // playAgainButton.style.color = pickedColor;
          // modeButtons[(difficulty - 3) / 3].style.backgroundColor = pickedColor;
          // modeButtons[1 - (difficulty - 3) / 3].style.color = pickedColor;
          playAgainButton.textContent = "Play Again";
          document.querySelectorAll(".hover").forEach(function (el) {
            el.style.setProperty("--hoverColor", pickedColor);
          });
          document.querySelectorAll("button").forEach(function (el, i) {
            el.style.setProperty("--buttonColor", pickedColor);
            if (i == (difficulty - 3) / 3 + 1) {
              el.style.backgroundColor = pickedColor;
            }
          });
          if (!won) {
            won = true;
            setupScores();
          }
        } else {
          this.style.backgroundColor = bgcolor;
          message.textContent = "Try Again";
          message.style.color = "red";
          playAgainButton.textContent = "New Colors";
          loss = true;
          setupScores();
        }
      }
    });
  }
}

function playAgain() {
  // playAgainButton.style.color = "";
  // modeButtons[(difficulty - 3) / 3].style.backgroundColor = "";
  // modeButtons[1 - (difficulty - 3) / 3].style.color = "";
  won = false;
  loss = false;
  document.querySelectorAll(".hover").forEach(function (el) {
    el.style.setProperty("--hoverColor", defColor);
  });
  document.querySelectorAll("button").forEach(function (el, i) {
    el.style.setProperty("--buttonColor", defColor);
    if (i == (difficulty - 3) / 3 + 1) {
      el.style.backgroundColor = defColor;
    } else {
      el.style.backgroundColor = "";
    }
  });
  playAgainButton.textContent = "New Colors";
  document.querySelector("h1").style.backgroundColor = "";
  message.textContent = "";
  var prevColor = colorCodeHead;
  colors = generateRandomColors(difficulty);
  pickedColor = colors[colors[difficulty]];
  setupSquares();
  // document.querySelector("#colorDisplay").textContent = pickedColor.toUpperCase();
  // document.getElementById("red").textContent = colorCodeHead[0];
  // document.getElementById("green").textContent = colorCodeHead[1];
  // document.getElementById("blue").textContent = colorCodeHead[2];
  red.update(colorCodeHead[0]);
  green.update(colorCodeHead[1]);
  blue.update(colorCodeHead[2]);
  setupScores();
}

function setupScores() {
  if (won) {
    currScore++;
  } else if (loss) {
    currScore = 0;
  }
  currScoreText.textContent = `Score: ${currScore}`;
  if (difficulty == 3) {
    currScore >= localStorage.getItem("easyHighscore")
      ? localStorage.setItem("easyHighscore", currScore)
      : null;
    highScoreText.textContent = `Highscore (Easy): ${localStorage.getItem(
      "easyHighscore"
    )}`;
  } else {
    currScore >= localStorage.getItem("hardHighscore")
      ? localStorage.setItem("hardHighscore", currScore)
      : null;
    highScoreText.textContent = `Highscore (Hard): ${localStorage.getItem(
      "hardHighscore"
    )}`;
  }
}
