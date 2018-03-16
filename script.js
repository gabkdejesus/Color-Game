(function() {
let numSquares = 6;
let colors = [];

// Get dom elements
let h1 = document.querySelector("h1");
let squares = document.getElementsByClassName('square');
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.getElementById("message");
let easyBtn = document.getElementById("easyBtn");
let hardBtn = document.getElementById("hardBtn");

initGame();

// Generates array of random RGB values, and picks one
function initGame() {
    // Setup array of colors and which to use for the round
    initColors();
    // Setup squares and event listeners
    initSquares();
    // Setup buttons
    initOptions();
    initReset();
}

// Make an array of randomly generated colors depending on game mode
function initColors() {
    colors = generateRandomColors(numSquares);
    winningColor = pickWinningColor();
    colorDisplay.textContent = winningColor;
    if(numSquares === 6) {
        for(let i = 0; i < squares.length; i++ ) {  
            squares[i].style.background = colors[i];
            squares[i].style.display = "block";      
        }   
    } 
    else if(numSquares === 3) {
        for(let i = 0; i < squares.length; i++ ) {
            if(colors[i]) {
                squares[i].style.background = colors[i];
            } else {
                squares[i].style.display = "none";
            }
        }
    }
}

// Setup squares colors and listeners
function initSquares() {
    for(let i = 0; i < squares.length; i++) {
        squares[i].style.background = colors[i];

        squares[i].addEventListener("click", function(){
            let clickedColor = this.style.backgroundColor;
            if(clickedColor === winningColor) {
                messageDisplay.textContent = "Correct!";
                changeColors(winningColor);
                h1.style.background = clickedColor;
            }
            else {
                this.style.background = "#232323";
                messageDisplay.textContent = "Try Again";
            }     
        });
    }
}

// Setup option buttons
function initOptions() {
    let buttons = document.getElementsByClassName('option');
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            if(this.getAttribute('id') === "hardBtn") {
                hardBtn.classList.add('selected');
                easyBtn.classList.remove('selected');
                numSquares = 6;
                initColors();
            } 
            else if(this.getAttribute('id') === "easyBtn") {
                hardBtn.classList.remove('selected');
                easyBtn.classList.add('selected');
                numSquares = 3;
                initColors();
            }
        });
    }
}

// Setup reset button
function initReset() {
    let resetBtn = document.getElementById('reset');
    resetBtn.addEventListener('click', function() {
        initColors(numSquares);
        h1.style.background = "steelblue";
        messageDisplay.textContent = " ";
        this.textContent = "reset colors";
    });
}

// Change square colors
function changeColors(color) {
    for(let i = 0; i < squares.length; i++) {
        squares[i].style.background = color;
    }
}

// Pick the color player needs to guess
function pickWinningColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

// Generate random RGB values for each square
function generateRandomColors(num) {
    let colors = [];
    for(let i = 0; i < num; i++) {
        colors.push(randomizeNewRGB());
    }
    return colors;
}

// Return new RGB value tuple
function randomizeNewRGB() { 
    let [r, g, b] = [0, 0, 0].map(oldColorVal => (Math.floor(Math.random() * (256 - oldColorVal)) + oldColorVal) % 256);
    return `rgb(${r}, ${g}, ${b})`;
}
})();