const container = document.getElementById("gameContainer");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const cursorBar = document.getElementById("cursorBar");
const player = {
    x: container.offsetWidth / 2 - 25,
    y: canvas.height - 50,
    width: 90,
    height: 90,
    color: "#f8de9b"
};
const axe = new Image(); 
axe.src = "C:/Users/Sanjay S G/OneDrive/Security/OneDrive/Pictures/hack4soc/treenobg.png";  
const trees = [];  
let treeSpeed = 2;  
let spawnedTrees = 0;
let gameRunning = false;

function resetGame() {
    gameRunning = true;
    trees.length = 0;  
    treeSpeed = 2;  
    spawnedTrees = 0; 
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.drawImage(axe,player.x, player.y, player.width, player.height);
}

function drawTrees() {  
    for (const tree of trees) { 
        const img = new Image();
        img.src = "axemannobg.png";  
        ctx.drawImage(img, tree.x, tree.y, 60, 60);  
    }
}

function drawCursorBar() {
    cursorBar.style.left = player.x + "px";
}

function checkCollisions() {
    for (const tree of trees) {  
        if (
            player.x < tree.x + 40 &&  
            player.x + player.width > tree.x && 
            player.y < tree.y + 40 &&  
            player.y + player.height > tree.y  
        ) {
            gameRunning = false;
            alert("Game Over");
            startButton.style.display = "block";
            break;
        }
    }
}
function drawaxe() {
    ctx.drawImage(img, player.x, player.y, player.width, player.height);
}

function moveTrees() {  
    for (let i = trees.length - 1; i >= 0; i--) {  
        const tree = trees[i];  
        tree.y += treeSpeed; 
        if (tree.y > canvas.height || tree.x < 0 || tree.x > canvas.width) {  
            trees.splice(i, 1); 
        }
    }
    spawnedTrees++;  
    if (spawnedTrees % 50 === 0) {  
        treeSpeed += 0.01;  
    }
}

function spawnTree() {  
    const tree = { 
        x: Math.random() * canvas.width,
        y: 0,
        color: getRandomColor()  // Assuming you want to assign a random color to trees
    };
    trees.push(tree); 
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function update() {
    if (gameRunning) {
        drawPlayer();
        drawTrees();
        drawCursorBar();
        checkCollisions();
    }
}

function gameLoop() {
    ctx.clearRect(0,0, canvas.width, canvas.height);

    update();

    requestAnimationFrame(gameLoop);
}

startButton.addEventListener("click", function () {
    if (!gameRunning) {
        gameRunning = true;
        startButton.style.display = "none";
        resetGame();
        gameLoop();
    }
});
document.addEventListener("keydown", function (event) {
    if (gameRunning) {
        if (event.key === "ArrowLeft" && player.x > 0) {
            player.x -= 10;
        } else if (event.key === "ArrowRight" && player.x < canvas.width - player.width) {
            player.x += 10;
        }
    }
});


canvas.width = container.offsetWidth - 10;
canvas.height = container.offsetHeight - 10;

setInterval(spawnTree, 1000);
setInterval(moveTrees, 16);
