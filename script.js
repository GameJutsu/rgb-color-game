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

init();

function init()
{
	modeButtons[1].classList.add("selected");
	playAgainButton.addEventListener("click", playAgain);
	setupModeButtons();
	playAgain();
}

function setupModeButtons()
{
	for(var i = 0; i < 2; i++)
	{
		modeButtons[i].addEventListener("click", function()
		{
			this.classList.add("selected");
	 	//Using indexOf because i changes to 2 after loading
	 	modeButtons[1 - (modeButtons.indexOf(this))].classList.remove("selected");
	 	difficulty = 3 + (3 * modeButtons.indexOf(this));
	 	playAgain();
	 	if(modeButtons.indexOf(this) == 0)
	 	{
	 		for(var j = 3; j < squares.length; j++)
	 		{
	 			squares[j].style.backgroundColor = bgcolor;
	 		}
	 	}
	 });
	}
}

function pickRandom(min, max)
{
	return Math.floor(Math.random() * (max - min + 1));
}

function generateRandomColors(difficulty)
{
	var colors = [];
	for(var i=0; i < difficulty; i++)
	{
		colors.push("rgb(" + pickRandom(0, 255) + ", " + pickRandom(0, 255) + ", " + pickRandom(0, 255) + ")");
	}
	return colors;
}

function setupSquares()
{
	for(var i=0; i < difficulty; i++)
	{
		squares[i].style.backgroundColor = colors[i];
		squares[i].addEventListener("click", function()
		{
			if(difficulty != 3 || squares.indexOf(this) <= 2)
			{
				if(this.style.backgroundColor == pickedColor)
				{
					for(var i=0; i < difficulty; i++)
					{
						squares[i].style.backgroundColor = pickedColor;
					}
					message.textContent = "Correct!";
					message.style.color = "green";
					document.querySelector("h1").style.backgroundColor = pickedColor;
					// playAgainButton.style.color = pickedColor;
					// modeButtons[(difficulty - 3) / 3].style.backgroundColor = pickedColor;
					// modeButtons[1 - (difficulty - 3) / 3].style.color = pickedColor;
					playAgainButton.textContent = "Play Again";
					document.querySelectorAll(".hover").forEach(function(el)
					{
						el.style.setProperty("--hoverColor", pickedColor);
					});
					document.querySelectorAll("button").forEach(function(el, i)
					{
						el.style.setProperty("--buttonColor", pickedColor);
						if(i == ((difficulty - 3) / 3) + 1)
						{
							el.style.backgroundColor = pickedColor;
						}
					});
				}
				else
				{
					this.style.backgroundColor = bgcolor;
					message.textContent = "Try Again";
					message.style.color = "red";
					playAgainButton.textContent = "New Colors";	
				}
			}
		});
	}
}

function playAgain()
{
	// playAgainButton.style.color = "";
	// modeButtons[(difficulty - 3) / 3].style.backgroundColor = "";
	// modeButtons[1 - (difficulty - 3) / 3].style.color = "";
	document.querySelectorAll(".hover").forEach(function(el)
	{
		el.style.setProperty("--hoverColor", defColor);
	});
	document.querySelectorAll("button").forEach(function(el, i)
	{
		el.style.setProperty("--buttonColor", defColor);
		if(i == ((difficulty - 3) / 3) + 1)
		{
			el.style.backgroundColor = defColor;
		}
		else
		{
			el.style.backgroundColor = "";
		}
	});
	playAgainButton.textContent = "New Colors";
	document.querySelector("h1").style.backgroundColor = "";
	message.textContent = "";
	colors = generateRandomColors(difficulty);
	pickedColor = colors[pickRandom(0, difficulty - 1)];
	setupSquares();
	document.querySelector("#colorDisplay").textContent = pickedColor.toUpperCase();
}