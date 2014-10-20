/*!
 * Maze Generator
 * codenameyau.github.io
 * MIT License
 */
'use strict';

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

MazeGenerator.prototype.generateMaze = function() {

};

/****************
 * Main Program *
 ****************/
(function() {

  // Setup canvas project
  var canvasID = 'imagination';
  var settings = {width: 20, height: 20};
  var maze = new MazeGenerator(canvasID, settings);
  maze.drawMaze();

})();
