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
  this.generateMaze();
  this.setupCanvas();
  this.drawMaze();
}

/*************************
 * Maze Generator Canvas *
 *************************/
MazeGenerator.prototype.setupCanvas = function() {
  this.canvas = document.getElementById(this.canvasID);
  this.ctx = this.canvas.getContext('2d');
  this.ctx.imageSmoothingEnabled = false;
};

MazeGenerator.prototype.getWidth = function() {
  return this.canvas.width;
};

MazeGenerator.prototype.getHeight = function() {
  return this.canvas.height;
};

MazeGenerator.prototype.drawMaze = function() {

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
      // Bit Values - 0-3: border, 4-8: walls
      this.maze[i].push([0, 0, 0, 0, 0, 0, 0, 0]);
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
  var project = new MazeGenerator(canvasID, {width: 20, height: 20});
  project.drawDemo();

})();
