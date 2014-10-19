/*!
 * Maze Generator - test-maze.js
 * codenameyau.github.io
 * MIT License
 */

/*------------JSHint-------------*/
/* global PubTest, MazeGenerator */
/*-------------------------------*/

'use strict';

(function() {
  var test = new PubTest('MazeGenerator');
  var defaultSettings = {width: 30, height: 20};
  var canvasID = 'imagination';

  // Test Case: maze generation borders
  test.testCase(function() {
    var maze = new MazeGenerator(canvasID, defaultSettings);

  });

  // Show test results
  test.results();

})();
