const colors = ['green', 'red', 'yellow', 'blue'];
let gamePattern = [];
let userPattern = [];
let gameStarted = false;
let level = 0;

const startButton = document.getElementById('start-btn');
const btns = document.querySelectorAll('.btn');

startButton.addEventListener('click', startGame);
btns.forEach(btn => btn.addEventListener('click', handleBtnClick));

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        startButton.textContent = 'Reset Game';
        nextSequence();
    } else {
        resetGame();
    }
}

function nextSequence() {
    userPattern = [];
    level++;
    updateLevelDisplay();

    const randomColor = colors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor);

    animateColorSequence(gamePattern);
}

function animateColorSequence(sequence) {
    let i = 0;
    const intervalId = setInterval(() => {
        playSound(sequence[i]);
        highlightColor(sequence[i], true);
        setTimeout(() => {
            highlightColor(sequence[i], false);
            i++;
            if (i === sequence.length) {
                clearInterval(intervalId);
                enableUserInput();
            }
        }, 500);
    }, 1000);
}

function playSound(color) {
    const audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

function highlightColor(color, white) {
    const coloredBtn = document.getElementById(color);
    coloredBtn.style.backgroundColor = white ? 'white' : color;
}

function enableUserInput() {
    btns.forEach(btn => btn.addEventListener('click', handleBtnClick));
}

function handleBtnClick(event) {
    const clickedColor = event.target.id;
    userPattern.push(clickedColor);
    playSound(clickedColor);
    highlightColor(clickedColor, true); 
    setTimeout(() => {
        highlightColor(clickedColor, false);
        checkUserInput();
    }, 500);
}

function checkUserInput() {
    const lastIndex = userPattern.length - 1;

    if (userPattern[lastIndex] === gamePattern[lastIndex]) {
        if (userPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    playSound('wrong');
    document.body.classList.add('game-over');
    startButton.textContent = 'Try Again';
    setTimeout(() => {
        document.body.classList.remove('game-over');
    }, 200);
    resetGame();
}

function resetGame() {
    gamePattern = [];
    userPattern = [];
    gameStarted = false;
    level = 0;
    startButton.textContent = 'Start Game';
    updateLevelDisplay();
}

function updateLevelDisplay() {
    const levelDisplay = document.querySelector('h1');
    levelDisplay.textContent = `Level ${level}`;
}
