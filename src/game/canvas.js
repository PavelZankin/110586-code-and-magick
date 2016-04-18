'use strict';
/**
* @param {Object} game
* @param {String} text
* @param {Number} maxWidth
*/
function getTextLines(game, text, maxWidth) {
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
* @param {Object} game
* @param {Number} x, y, lineHeight
* @param {Object} lines
*/
function drawText(game, x, y, lineHeight, lines) {
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
  var x = game.state.objects[0].x; // левый край волшебника
  var y = game.state.objects[0].y; // верхний край
  var w = game.state.objects[0].width; // ширина волшебника
  var h = game.state.objects[0].height; // высота

  var maxWidth = 290;
  var lineHeight = 30;
  game.ctx.font = '16px PT Mono';
  var lines = getTextLines(game, text, maxWidth);

  game.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  game.ctx.fillRect(x + w + 10, y + h - 190, maxWidth + 10, lines.length * lineHeight + 15);
  game.ctx.fillStyle = '#FFFFFF';
  game.ctx.fillRect(x + w, y + h - 200, maxWidth + 10, lines.length * lineHeight + 15);
  game.ctx.fillStyle = '#000000';

  drawText(game, x + w + 15, y + h - 170, lineHeight, lines);
}
