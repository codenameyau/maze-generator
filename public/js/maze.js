/*!
 * Maze Generator - maze.js
 * MIT License (c) 2014
 * codenameyau.github.io
 *
 * Maze Algorithm Source:
 * http://www.mazeworks.com/mazegen/mazetut/
 */
'use strict';


/*************************
 * Maze Cell Constructor *
 *************************/
function MazeCell(row, col, border, wall) {
  this.row = row;
  this.col = col;
  this.border = border || [0, 0, 0, 0];
  this.wall = wall || [0, 0, 0, 0];
}

MazeCell.prototype.connected = function() {
  return (this.wall[0] || this.wall[1] || this.wall[2] || this.wall[3]);
};

MazeCell.prototype.setWall = function(position, value) {
  this.wall[position] = value;
};

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
  this.ctx.lineWidth = 2;
  this.ctx.beginPath();

  // Draw in maze walls
  for (var i=0; i<height; i++) {
    for (var j=0; j<width; j++) {
      this.ctx.moveTo(j*rW, i*rH);

      // Wall: north
      if (this.maze[i][j].wall[0]) {
        this.ctx.moveTo((j+1)*rW, i*rH);
      } else {
        this.ctx.lineTo((j+1)*rW, i*rH);
      }

      // Wall: east
      if (this.maze[i][j].wall[1]) {
        this.ctx.moveTo((j+1)*rW, (i+1)*rH);
      } else {
        this.ctx.lineTo((j+1)*rW, (i+1)*rH);
      }

      // Wall: south
      if (this.maze[i][j].wall[2]) {
        this.ctx.moveTo(j*rW, (i+1)*rH);
      } else {
        this.ctx.lineTo(j*rW, (i+1)*rH);
      }

      // Wall: west
      if (this.maze[i][j].wall[3]) {
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
      var borders = [0, 0, 0, 0];

      // Border: north
      if (i === 0) {
        borders[0] = 1;
      }

      // Border: south
      else if (i === height-1) {
        borders[2] = 1;
      }

      // Boder: west
      if (j === 0) {
        borders[3] = 1;
      }

      // Border: east
      else if (j === width-1) {
        borders[1] = 1;
      }

      this.maze[i].push(new MazeCell(i, j, borders));
    }
  }
};

MazeGenerator.prototype.packCell = function(cell, current, neighbor) {
  return {
    cell: cell,
    current: current,
    neighbor: neighbor,
  };
};

MazeGenerator.prototype.getUnvisitedNeighbors = function(row, col) {
  // Elements: [MazeCell, cCell, nCell]
  var neighbors = [];
  var cell = this.maze[row][col];

  // Neighbor: north
  if (!cell.border[0] && !this.maze[row-1][col].connected()) {
    neighbors.push(this.packCell(this.maze[row-1][col], 0, 2));
  }

  // Neighbor: east
  if (!cell.border[1] && !this.maze[row][col+1].connected()) {
    neighbors.push(this.packCell(this.maze[row][col+1], 1, 3));
  }

  // Neighbor: south
  if (!cell.border[2] && !this.maze[row+1][col].connected()) {
    neighbors.push(this.packCell(this.maze[row+1][col], 2, 0));
  }

  // Neighbor: west
  if (!cell.border[3] && !this.maze[row][col-1].connected()) {
    neighbors.push(this.packCell(this.maze[row][col-1], 3, 1));
  }

  return neighbors;
};

MazeGenerator.prototype.generateMaze = function() {
  var height = this.settings.height;
  var width = this.settings.width;
  var cellStack = [];
  var totalCells = height * width;
  var visitedCells = 1;

  // Chose a random cell
  var cell = this.maze[this.randRange(0, height)][this.randRange(0, width)];

  // Repeat until visited all cells
  while (visitedCells < totalCells) {

    // Find neighbors of cell with all walls intact
    var neighbors = this.getUnvisitedNeighbors(cell.row, cell.col);

    if (neighbors.length) {
      // Remove wall between cell and neighbor
      var n = neighbors[this.randRange(0, neighbors.length)];
      var nCell = n.cell;
      cell.setWall(n.current, 1);
      nCell.setWall(n.neighbor, 1);

      // Make neighbor the current cell
      cellStack.push(nCell);
      cell = nCell;
      visitedCells++;
    }

    // No closed-off neighbors found
    else { cell = cellStack.pop(); }
  }
};

/****************************
 * Maze Generator Utilities *
 ****************************/
MazeGenerator.prototype.randRange = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
