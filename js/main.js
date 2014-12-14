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
  var settings = {width: 30, height: 30};
  var maze = new MazeGenerator(canvasID, settings);
  maze.generateMaze();
  maze.drawMaze();

  // Setup event handler for button
  var btnNewMaze = document.getElementById('btn-new-maze');
  btnNewMaze.addEventListener('click', function() {
    maze.setupMaze();
    maze.generateMaze();
    maze.drawMaze();
  });

})();
