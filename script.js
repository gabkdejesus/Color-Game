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

initGame(numSquares, squares);

// Generates array of random RGB values, and picks one
function initGame(numSquares, squares) {
    // Setup array of colors and which to use for the round
    initColors(numSquares);
    
    // Setup squares and event listeners
    initSquares(squares);

    // Setup buttons
    initOptions();
    initReset();
}

function initColors(numSquares) {
    colors = generateRandomColors(numSquares);
    pickedColor = pickRandomColor();
    colorDisplay.textContent = pickedColor;
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

// On click to reset colors
function initReset() {
    let resetBtn = document.getElementById('reset');
    resetBtn.addEventListener('click', function() {
        initColors(numSquares);
        h1.style.background = "steelblue";
        messageDisplay.textContent = " ";
        this.textContent = "reset colors";
    });
}

function initOptions() {
    let buttons = document.getElementsByClassName('option');
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            if(this.getAttribute('id') === "hardBtn") {
                hardBtn.classList.add('selected');
                easyBtn.classList.remove('selected');
                numSquares = 6;
                initColors(numSquares);
            } 
            else if(this.getAttribute('id') === "easyBtn") {
                hardBtn.classList.remove('selected');
                easyBtn.classList.add('selected');
                numSquares = 3;
                initColors(numSquares);
            }
        });
    }
}

// Setup squares colors
function initSquares(squares) {
    for(let i = 0; i < squares.length; i++) {
        squares[i].style.background = colors[i];

        // Listener for correct guess
        squares[i].addEventListener("click", function(){
            let clickedColor = this.style.backgroundColor;
            if(clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                changeColors(pickedColor);
                h1.style.background = clickedColor;
            }
            else {
                this.style.background = "#232323";
                messageDisplay.textContent = "Try Again";
            }     
        });
    }
}

function changeColors(color) {
    for(let i = 0; i < squares.length; i++) {
        squares[i].style.background = color;
    }
}

function pickRandomColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    let colors = [];
    for(let i = 0; i < num; i++) {
        colors.push(randomizeNewRGB([0, 0, 0]));
    }
    return colors;
}

// Accepts an array of old RGB values, and returns an RGB value
function randomizeNewRGB(oldVals) { 
    let [r, g, b] = oldVals.map(oldColorVal => (Math.floor(Math.random() * (256 - oldColorVal)) + oldColorVal) % 256);
    return `rgb(${r}, ${g}, ${b})`;
}
})();