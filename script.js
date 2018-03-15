let playCount = 1; //this is for checking how many times a player has played; playing at the start sets it to 1
let numSquares = 6;
let colors = [];
// Get dom elements
let h1 = document.querySelector("h1");
let squares = document.getElementsByClassName('square');
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.getElementById("message");
let resetButton = document.getElementById("reset");
let easyBtn = document.getElementById("easyBtn");
let hardBtn = document.getElementById("hardBtn");

initGame(numSquares, squares);

// Generates array of random RGB values, and picks one
function initGame(numSquares, squares) {
    // Setup array of colors and which to use for the round
    initColors(numSquares);
    
    // Setup squares and event listeners
    initSquares(squares);

    // Setup option buttons
    initOptions();
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
    else {
        for(let i = 0; i < squares.length; i++ ) {
            if(colors[i]) {
                squares[i].style.background = colors[i];
            } else {
                squares[i].style.display = "none";
            }
        }
    }
}

function initOptions() {
    let buttons = document.getElementsByClassName('option');
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            ++playCount;
            let newsquares;
            if(this.getAttribute('id') === "hardBtn") {
                hardBtn.classList.add('selected');
                easyBtn.classList.remove('selected');
                newSquares = 6;
                
            } 
            else if(this.getAttribute('id') === "easyBtn") {
                hardBtn.classList.remove('selected');
                easyBtn.classList.add('selected');
                newSquares = 3;
            }
            initColors(newSquares);
        });
    }
}


// easyBtn.addEventListener("click", function(){
//     ++playCount; //increment every time player plays again
//     hardBtn.classList.remove("selected");
//     easyBtn.classList.add("selected");
//     numSquares = 3;
//     colors = generateRandomColors(numSquares);
//     pickedColor = pickRandomColor();
//     colorDisplay.textContent = pickedColor;
//     for(let i = 0; i < squares.length; i++ ) {
//         if(colors[i]) {
//             squares[i].style.background = colors[i];
//         } else {
//             squares[i].style.display = "none";
//         }
//     }
// });

// hardBtn.addEventListener("click", function(){
//     ++playCount;  
//     easyBtn.classList.remove("selected");
//     hardBtn.classList.add("selected");
//     numSquares = 6;
//     colors = generateRandomColors(numSquares);
//     pickedColor = pickRandomColor();
//     colorDisplay.textContent = pickedColor;
//     for(let i = 0; i < squares.length; i++ ) {  
//             squares[i].style.background = colors[i];
//             squares[i].style.display = "block";      
//     }
// });

resetButton.addEventListener("click",function(){
    ++playCount; //increment every time player plays again
    //generate new colors
    colors = generateRandomColors(numSquares);
    //pick a new random color
    pickedColor = pickRandomColor();
    //change color display to match picked color
    colorDisplay.textContent = pickedColor;
    //change colors of the squares
    for(let i = 0; i < squares.length; i++ ) {
        squares[i].style.background = colors[i];
    }
    h1.style.background = "steelblue";
    messageDisplay.textContent = " ";
    this.textContent = "New Colors";
});

// Setup squares colors
function initSquares(squares) {
    for(let i = 0; i < squares.length; i++) {
        squares[i].style.background = colors[i];

        // Listener for correct guess
        squares[i].addEventListener("click", function(){
            let clickedColor = this.style.backgroundColor;
            if(clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again";
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
    if(playCount === 1) {
        for(let i = 0; i < num; i++) {
            colors.push(randomizeNewRGB([0, 0, 0]));
        }
    }
    else {
        let getCurrentColorDisplay = document.getElementById("colorDisplay");
        let oldRGBValues = getCurrentColorDisplay.textContent.match(/[+-]?\d+(?:\.\d+)?/g);
        for(let i = 0; i < num; i++) {
            colors.push(randomizeNewRGB(oldRGBValues));
        }
    }
    return colors;
}

// Accepts an array of old RGB values, and returns an RGB value
function randomizeNewRGB(oldVals) { 
    let [r, g, b] = oldVals.map(oldColorVal => (Math.floor(Math.random() * (256 - oldColorVal)) + oldColorVal) % 256);
    return `rgb(${r}, ${g}, ${b})`;
}
