'use strict';

function CanvasProject(canvasID, settings) {
  this.canvasID = canvasID;
  this.settings = settings;
  this.setupCanvas();
}

CanvasProject.prototype.setupCanvas = function() {
  this.canvas = document.getElementById(this.canvasID);
  this.ctx = this.canvas.getContext('2d');
  this.ctx.imageSmoothingEnabled = false;
};

CanvasProject.prototype.getWidth = function() {
  return this.canvas.width;
};

CanvasProject.prototype.getHeight = function() {
  return this.canvas.height;
};

CanvasProject.prototype.drawDemo = function() {
  this.ctx.fillStyle = 'rgb(200, 0, 0)';
  this.ctx.fillRect(0, 0, 50, 50);
  this.ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
  this.ctx.fillRect(30, 30, 50, 50);
  this.ctx.save();
};

/****************
 * Main Program *
 ****************/
(function() {

  // Setup canvas project
  var canvasID = 'imagination';
  var project = new CanvasProject(canvasID);
  project.drawDemo();

})();
