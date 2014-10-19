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
  this.setupMaze();
  this.setupCanvas();
}

/*************************
 * Maze Generator Canvas *
 *************************/
MazeGenerator.prototype.setupCanvas = function() {
  this.canvas = document.getElementById(this.canvasID);
  this.ctx = this.canvas.getContext('2d');
  this.ctx.imageSmoothingEnabled = false;
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
};

MazeGenerator.prototype.drawDemo = function() {
  this.ctx.fillStyle = 'rgb(200, 0, 0)';
  this.ctx.fillRect(0, 0, 50, 50);
  this.ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
  this.ctx.fillRect(30, 30, 50, 50);
  this.ctx.save();
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
  var maze = new MazeGenerator(canvasID, {width: 20, height: 20});
  maze.drawDemo();

})();
