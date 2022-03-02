//Khai bao hang so
const width = 20;
const height = 20;
const UP = -width;
const DOWN = width;
const LEFT = -1;
const RIGHT = 1;

//Giao dien
let scoreDisplay = document.getElementById("score");
let upBtn = document.getElementById("up");
let downBtn = document.getElementById("down");
let leftBtn = document.getElementById("left");
let rightBtn = document.getElementById("right");
let newGameBtn = document.getElementById("newGame");
let board = document.getElementById("board");
let button = document.getElementById("button");
let scorePanel = document.getElementById("score-panel");
let over = document.getElementById("over");
//Bien tro choi
let area = height*width;
let foodId 
let snake 
let score 
let currDirect

let internval = 500;
let runner 


//Cac ham cua game

const reset = function() {
    foodId = 0;
    snake = [0, 1, 2];
    score = 0;
    currDirect = RIGHT;
}

const createFood = function() {
    // Hien do an

    // Xoa do an cu
    document.getElementById(foodId).classList.remove("food");

    // Random vi tri do an
    foodId =  Math.floor(Math.random() * area)

    // Khong de do an trung ran
    while (snake.includes(foodId)){
        foodId =  Math.floor(Math.random() * area)
    }

    // Hien do an
    document.getElementById(foodId).classList.add("food")

    console.log("Food is created:" + foodId);
}

// Ve ran
const displaySnake = function() {
    // Tim va xoa toan bo con ran cu tren HTML
    Array.from(document.querySelectorAll('div.snake')).forEach((el) => el.classList.remove('snake'));

    snake.forEach(i => {

        document.getElementById(i).classList.add("snake");

    })


    console.log("Snake is created:" + snake);
}

const displayScore = function() {
    scoreDisplay.innerHTML = score;
}

// Ve bang
const createBoard = function() {
    // newGameBtn.style.display = "none";
    // Xoa man choi cu
    while (board.firstChild) {
        board.removeChild(board.lastChild)
    }

    // Ve bang moi
    for (let i = 0; i < width*height; i++) {
        let square = document.createElement("div");
        square.className = "square";
        square.id = i;
        //square.innerHTML = i;

        board.appendChild(square);
    }
    console.log("Start")
}

//Movement

// Cho ran di len
const up = function() {
    if (currDirect != DOWN) {
        currDirect = UP;

        
        console.log("Snake location: " + snake);
    } else {
        console.log(" Can't move");
    }
}

const down = function() {
    if (currDirect != UP) {
        currDirect = DOWN;

        
        console.log("Snake location: " + snake);
    } else {
        console.log(" Can't move");
    }
}

const left = function() {
    if (currDirect != RIGHT) {
        currDirect = LEFT;

        
        console.log("Snake location: " + snake);
    } else {
        console.log(" Can't move");
    }
}

const right = function() {
    if (currDirect != LEFT) {
        currDirect = RIGHT;

        
        console.log("Snake location: " + snake);
    } else {
        console.log(" Can't move");
    }
}
    

// Cap nhat vi tri ran
const updateSnake = function() {

    let headIndex = snake.length - 1;
    let head = snake[headIndex];

    if (head < width && currDirect == UP) {
        head = head + width*(height-1);
    } else if ((head >= width*(height-1) && currDirect == DOWN)) {
        head = head - width*(height-1);

    } else if ((head % width == 0) && (currDirect == LEFT)) {
        head = head + width - 1;

    } else if ((head % width == width - 1) && (currDirect == RIGHT)) {
        head = head - (width - 1);

    } else {
        head = head + currDirect;   
    }
 
    if (snake.includes(head)) {
        gameOver(); 
    }

    snake.push(head);
    
    if (head == foodId) {
        eat();
    
    } else {
        snake.shift();
    }


}

const eat = function() {
    score += 1;
    displayScore();
    createFood();
    console.log("Eaten");
}

const run = function() {
    updateSnake();
    displaySnake();
}

const newGame = function() {
    reset();
    newGameBtn.style.display = "none";
    button.style.display = "block";
    scorePanel.style.display = "block";
    over.style.display = "none";



    createBoard();
    createFood();
    displaySnake();
    displayScore();

    runner = setInterval(run, internval);
}

const gameOver = function() {
    clearInterval(runner);

    over.style.display = "block";
    newGameBtn.style.display = "block";


    console.log("Game over");
}

rightBtn.onclick = function() {
    right();
}

leftBtn.onclick = function() {
    left();
}

upBtn.onclick = function() {
    up();
}

downBtn.onclick = function() {
    down();
}

newGameBtn.onclick = function() {
    newGame();
}


    

