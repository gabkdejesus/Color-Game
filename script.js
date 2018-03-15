let playCount = 1; //this is for checking how many times a player has played; playing at the start sets it to 1
let numSquares = 6;
let colors = generateRandomColors(numSquares);
let pickedColor = pickRandomColor();

// Get dom elements
let h1 = document.querySelector("h1");
let squares = document.getElementsByClassName('square');
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.getElementById("message");
let resetButton = document.getElementById("reset");
let easyBtn = document.getElementById("easyBtn");
let hardBtn = document.getElementById("hardBtn");

// Set header to display RGB value of picked color
colorDisplay.textContent = pickedColor;

easyBtn.addEventListener("click", function(){
    ++playCount; //increment every time player plays again
    hardBtn.classList.remove("selected");
    easyBtn.classList.add("selected");
    numSquares = 3;
    colors = generateRandomColors(numSquares);
    pickedColor = pickRandomColor();
    colorDisplay.textContent = pickedColor;
    for(let i = 0; i < squares.length; i++ ) {
        if(colors[i]) {
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
});

hardBtn.addEventListener("click", function(){
    ++playCount;  
    easyBtn.classList.remove("selected");
    hardBtn.classList.add("selected");
    numSquares = 6;
    colors = generateRandomColors(numSquares);
    pickedColor = pickRandomColor();
    colorDisplay.textContent = pickedColor;
    for(let i = 0; i < squares.length; i++ ) {  
            squares[i].style.background = colors[i];
            squares[i].style.display = "block";      
    }
});

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

for(let i = 0; i < squares.length; i++) {
    //add initial colors to squares
    squares[i].style.background = colors[i];
    //add click listeners to squares
    squares[i].addEventListener("click", function(){
    //check color of clicked square
    //compare to picked color
    let clickedColor = this.style.background;
        if(clickedColor === pickedColor) {
            messageDisplay.textContent = "Correct!";
            resetButton.textContent = "Play Again";
            changeColors(pickedColor);
            h1.style.background = clickedColor;
        } else {
            this.style.background = "#232323";
            messageDisplay.textContent = "Try Again";
        }
            
    });
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

// Accepts an array of old RGB values, and returns an array of new ones
function randomizeNewRGB(oldVals) { 
    let [r, g, b] = oldVals.map(oldColorVal => (Math.floor(Math.random() * (256 - oldColorVal)) + oldColorVal) % 256);
    return [`rgb(${r}, ${g}, ${b})`];
}
