/*!
 * Maze Generator - maze.js
 * MIT License (c) 2014
 * codenameyau.github.io
 */
'use strict';


/*************************
 * Maze Cell Constructor *
 *************************/
function MazeCell() {
  this.border = [0, 0, 0, 0];
  this.wall   = [0, 0, 0, 0];
}


/******************************
 * Maze Generator Constructor *
 ******************************/
function MazeGenerator(canvasID, settings) {
  this.canvasID = canvasID;
  this.settings = settings;
  this.setupCanvas();
  this.setupMaze();
}

/*************************
 * Maze Generator Canvas *
 *************************/
MazeGenerator.prototype.setupCanvas = function() {
  this.canvas = document.getElementById(this.canvasID);
  this.ctx = this.canvas.getContext('2d');
  this.ctx.imageSmoothingEnabled = false;
};

MazeGenerator.prototype.clearCanvas = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

MazeGenerator.prototype.getCanvasWidth = function() {
  return this.canvas.width;
};

MazeGenerator.prototype.getCanvasHeight = function() {
  return this.canvas.height;
};

MazeGenerator.prototype.drawMaze = function() {
  var height = this.settings.height;
  var width = this.settings.width;
  var rH = this.getCanvasWidth() / height;
  var rW = this.getCanvasHeight() / width;
  this.clearCanvas();

  // [TODO] move out
  this.ctx.strokeStyle = 'rgb(50, 50, 50)';
  this.ctx.lineWidth = 4;

  // Draw in maze walls
  for (var i=0; i<height; i++) {
    for (var j=0; j<width; j++) {
      this.ctx.beginPath();
      this.ctx.moveTo(j*rW, i*rH);

      // Wall: north
      if (this.maze[i][j][4]) {
        this.ctx.moveTo((j+1)*rW, i*rH);
      } else {
        this.ctx.lineTo((j+1)*rW, i*rH);
      }

      // Wall: east
      if (this.maze[i][j][5]) {
        this.ctx.moveTo((j+1)*rW, (i+1)*rH);
      } else {
        this.ctx.lineTo((j+1)*rW, (i+1)*rH);
      }

      // Wall: south
      if (this.maze[i][j][6]) {
        this.ctx.moveTo(j*rW, (i+1)*rH);
      } else {
        this.ctx.lineTo(j*rW, (i+1)*rH);
      }

      // Wall: west
      if (this.maze[i][j][7]) {
        this.ctx.moveTo(j*rW, i*rH);
      } else {
        this.ctx.lineTo(j*rW, i*rH);
      }

      this.ctx.stroke();
    }
  }
};

/****************************
 * Maze Generator Algorithm *
 ****************************/
MazeGenerator.prototype.setupMaze = function() {
  var height = this.settings.height;
  var width = this.settings.width;

  // Create maze data structure
  this.maze = [];
  for (var i=0; i<height; i++) {
    this.maze.push([]);
    for (var j=0; j<width; j++) {
      // Values - Clockwise NESW borders, walls
      var cell = [0, 0, 0, 0, 0, 0, 0, 0];

      // Border: north
      if (i === 0) {
        cell[0] = 1;
      }

      // Border: south
      else if (i === height-1) {
        cell[2] = 1;
      }

      // Boder: west
      if (j === 0) {
        cell[3] = 1;
      }

      // Border: east
      else if (j === width-1) {
        cell[1] = 1;
      }

      this.maze[i].push(cell);
    }
  }
};

MazeGenerator.prototype.visitedCell = function(row, col) {
  var cell = this.maze[row][col];
  return (cell[4] || cell[5] || cell[6] || cell[7]);
};

MazeGenerator.prototype.getUnvisitedNeighbors = function(row, col) {
  // Elements: [row, col, curCell, oppCell]
  var neighbors = [];

  // Neighbor: north
  if (!this.maze[row][col][0] && !this.visitedCell(row-1, col)) {
    neighbors.push([row-1, col, 4, 6]);
  }

  // Neighbor: east
  if (!this.maze[row][col][1] && !this.visitedCell(row, col+1)) {
    neighbors.push([row, col+1, 5, 7]);
  }

  // Neighbor: south
  if (!this.maze[row][col][2] && !this.visitedCell(row+1, col)) {
    neighbors.push([row+1, col, 6, 4]);
  }

  // Neighbor: west
  if (!this.maze[row][col][3] && !this.visitedCell(row, col-1)) {
    neighbors.push([row, col-1, 7, 5]);
  }

  return neighbors;
};

MazeGenerator.prototype.generateMaze = function() {
  var height = this.settings.height;
  var width = this.settings.width;
  var cellStack = [];
  var total = height * width;
  var visited = 1;

  // Step 1: chose a random cell
  var cellRow = this.randRange(0, height);
  var cellCol = this.randRange(0, width);

  // Step 2: repeat until visited all cells
  while (visited < 2) { // [TODO] replace with total
    // Step 3: find neighbors of cell with all walls intact
    var neighbors = this.getUnvisitedNeighbors(cellRow, cellCol);
    if (neighbors.length) {
      // Step 4: knock down wall between neighbor
      var nCell = neighbors[this.randRange(0, neighbors.length)];
      this.maze[cellRow][cellCol][nCell[3]] = 1;
      this.maze[nCell[0]][nCell[1]][nCell[4]] = 1;

      // Step 5: push current cell to stack
      cellStack.push([cellRow, cellCol]);
    }
    visited++;
  }
};

/****************************
 * Maze Generator Utilities *
 ****************************/
MazeGenerator.prototype.randRange = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

