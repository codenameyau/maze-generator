/*------------JSHint-------------*/
/* global MazeGenerator          */
/*-------------------------------*/
'use strict';


/****************
 * Main Program *
 ****************/
(function() {

  // Setup canvas project
  var canvasID = 'imagination';
  var settings = {width: 20, height: 20};
  var maze = new MazeGenerator(canvasID, settings);
  maze.generateMaze();
  maze.drawMaze();

  // Setup event handler for button

})();
