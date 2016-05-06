'use strict';

/**
 * @param  {Object} game
 * @param  {String} text
 * @param  {Number} maxWidth
 */
function _getTextLines(game, text, maxWidth) {
  var words = text.split(' ');
  var lines = [];
  var line = '';
  for (var i = 0; i < words.length; ++i) {
    var testLine = line + words[i] + ' ';
    var testWidth = game.ctx.measureText(testLine).width;
    if (testWidth > maxWidth) {
      lines.push(line);
      line = words[i] + ' ';
    } else {
      line = testLine;
    }
  }
  lines.push(line);
  return lines;
}

/**
 * @param  {Object} game
 * @param  {Number} x
 * @param  {Number} y
 * @param  {Number} lineHeight
 * @param  {Number} lines
 */
function _drawText(game, x, y, lineHeight, lines) {
  for (var i = 0; i < lines.length; ++i) {
    game.ctx.fillText(lines[i], x, y);
    y += lineHeight;
  }
}

/**
* @param {Object} game
* @param {String} text
*/
function drawTextBox(game, text) {
  var leftSideObject = game.state.objects[0].x;
  var topSiseObject = game.state.objects[0].y;
  var objectWidth = game.state.objects[0].width;
  var objectHeight = game.state.objects[0].height;

  var maxWidth = 290;
  var lineHeight = 30;
  game.ctx.font = '16px PT Mono';
  var lines = _getTextLines(game, text, maxWidth);

  game.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  game.ctx.fillRect(leftSideObject + objectWidth + 10, topSiseObject + objectHeight - 190, maxWidth + 10, lines.length * lineHeight + 15);
  game.ctx.fillStyle = '#FFFFFF';
  game.ctx.fillRect(leftSideObject + objectWidth, topSiseObject + objectHeight - 200, maxWidth + 10, lines.length * lineHeight + 15);
  game.ctx.fillStyle = '#000000';

  _drawText(game, leftSideObject + objectWidth + 15, topSiseObject + objectHeight - 170, lineHeight, lines);
}

module.exports.drawTextBox = drawTextBox;
