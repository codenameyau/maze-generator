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
  var settings = {width: 30, height: 20};
  var canvasID = 'imagination';
  var globalMaze = new MazeGenerator(canvasID, settings);

  // Test Case: maze generation borders
  test.testCase(function() {
    var maze = globalMaze.maze;

    // Test borders of top left cell
    var topLeftCell = maze[0][0];
    test.assertEqual(topLeftCell[0], 1,
      'Border north of top left cell should be 1');

    test.assertEqual(topLeftCell[1], 0,
      'Border east of top left cell should be 0');

    test.assertEqual(topLeftCell[2], 0,
      'Border south of top left cell should be 0');

    test.assertEqual(topLeftCell[3], 1,
      'Border west of top left cell should be 1');

    // Test borders of top right cell
    var topRightCell = maze[0][settings.width-1];
    test.assertEqual(topRightCell[0], 1,
      'Border north of top left cell should be 1');

    test.assertEqual(topRightCell[1], 1,
      'Border east of top left cell should be 1');

    test.assertEqual(topRightCell[2], 0,
      'Border south of top left cell should be 0');

    test.assertEqual(topRightCell[3], 0,
      'Border west of top left cell should be 0');

    // Test borders of bottom left cell
    var bottomLeftCell = maze[settings.height-1][0];
    test.assertEqual(bottomLeftCell[0], 0,
      'Border north of top left cell should be 0');

    test.assertEqual(bottomLeftCell[1], 0,
      'Border east of top left cell should be 0');

    test.assertEqual(bottomLeftCell[2], 1,
      'Border south of top left cell should be 1');

    test.assertEqual(bottomLeftCell[3], 1,
      'Border west of top left cell should be 1');

    // Test borders of bottom right cell
    var bottomRightCell = maze[settings.height-1][settings.width-1];
    test.assertEqual(bottomRightCell[0], 0,
      'Border north of top left cell should be 0');

    test.assertEqual(bottomRightCell[1], 1,
      'Border east of top left cell should be 1');

    test.assertEqual(bottomRightCell[2], 1,
      'Border south of top left cell should be 1');

    test.assertEqual(bottomRightCell[3], 0,
      'Border west of top left cell should be 0');
  });


  // Show test results
  test.results();

})();
