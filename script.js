NodeList.prototype.indexOf = Array.prototype.indexOf;
var difficulty = 6;
var bgcolor = document.body.style.backgroundColor;
var pickedColor;
var squares = document.querySelectorAll(".square");
var colors;
var message = document.querySelector("#message");
var playAgainButton = document.querySelector("#playAgainButton");
var easyButton = document.querySelector("#easyButton");
var hardButton = document.querySelector("#hardButton");

hardButton.classList.add("selected");

playAgain();

playAgainButton.addEventListener("click", playAgain);

easyButton.addEventListener("click", function()
{
	this.classList.add("selected");
	hardButton.classList.remove("selected");
	difficulty = 3;
	playAgain();
	for(var i=3; i < squares.length; i++)
	{
		squares[i].style.backgroundColor = "#232323";
	}
});

hardButton.addEventListener("click", function()
{
	this.classList.add("selected");
	easyButton.classList.remove("selected");
	difficulty = 6;
	playAgain();
})

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

function playAgain()
{
	playAgainButton.style.color = "";
	easyButton.style.color = "";
	hardButton.style.color = "";
	playAgainButton.textContent = "New Colors";
	document.querySelector("h1").style.backgroundColor = "steelblue";
	message.textContent = "";
	colors = generateRandomColors(difficulty);
	pickedColor = colors[pickRandom(0, difficulty - 1)];
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
					message.textContent = "Correct";
					message.style.color = "green";
					document.querySelector("h1").style.backgroundColor = pickedColor;
					playAgainButton.style.color = pickedColor;
					easyButton.style.color = pickedColor;
					hardButton.style.color = pickedColor;
					playAgainButton.textContent = "Play Again";
				}
				else
				{
					this.style.backgroundColor = "#232323";
					message.textContent = "Try Again";
					message.style.color = "red";
					playAgainButton.textContent = "New Colors";	
				}
			}
		})
	}
	document.querySelector("#colorDisplay").textContent = pickedColor.toUpperCase();
}