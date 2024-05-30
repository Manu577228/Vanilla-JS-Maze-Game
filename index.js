const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

const maze = [
  "111111111111111111111111111",
  "100000000000000000000000001",
  "101111111111111111111110101",
  "101000000000000000000010101",
  "101011111111111111110010101",
  "101000000000000000010010101",
  "101111111111111111010010101",
  "100000000000000000010000001",
  "111111111111111111111111111",
];

const player = {
  x: 1,
  y: 1,
  color: "#ff0000",
};

const endPoint = {
  x: 23,
  y: 7,
  color: "#00ff00",
};

const cellSize = 20;

canvas.width = maze[0].length * cellSize;
canvas.height = maze.length * cellSize;

function drawMaze() {
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      context.fillStyle = maze[y][x] === "1" ? "#000000" : "#ffffff";
      context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function drawPlayer() {
  context.fillStyle = player.color;
  context.fillRect(
    player.x * cellSize,
    player.y * cellSize,
    cellSize,
    cellSize
  );
}

function drawEndPoint() {
  context.fillStyle = endPoint.color;
  context.fillRect(
    endPoint.x * cellSize,
    endPoint.y * cellSize,
    cellSize,
    cellSize
  );
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  clearCanvas();
  drawMaze();
  drawPlayer();
  drawEndPoint();
}

function movePlayer(dx, dy) {
  const newX = player.x + dx;
  const newY = player.y + dy;
  if (maze[newY][newX] === "0") {
    player.x = newX;
    player.y = newY;
  }
  if (player.x === endPoint.x && player.y === endPoint.y) {
    alert("Congratulations! You have completed the maze!");
    player.x = 1;
    player.y = 1;
    draw();
  }
  draw();
}

document.addEventListener("keydown", (event) => {
  console.log(`Key pressed: ${event.key}`); // Debugging line to check key presses
  switch (event.key) {
    case "ArrowUp":
      movePlayer(0, -1);
      break;
    case "ArrowDown":
      movePlayer(0, 1);
      break;
    case "ArrowLeft":
      movePlayer(-1, 0);
      break;
    case "ArrowRight":
      movePlayer(1, 0);
      break;
  }
});

draw();
