'use strict';
var clouds = document.querySelector('.header-clouds');

function _moveClouds() {
  clouds.style.backgroundPositionX = -window.pageYOffset + 'px';
}

function _isElementsVisible(element) {
  return element.getBoundingClientRect().bottom >= 0;
}

function _setParallaxEnabled() {
  if(_isElementsVisible(clouds)) {
    _moveClouds(true);
  }
}

function pauseWhenTheGameModuleInvisible(game) {
  var gameModule = document.querySelector('.demo');
  if (!_isElementsVisible(gameModule)) {
    game.setGameStatus(window.Game.Verdict.PAUSE);
  }
}


window.addEventListener('scroll', _setParallaxEnabled);

module.exports._isElementsVisible = _isElementsVisible;
module.exports.pauseWhenTheGameModuleInvisible = pauseWhenTheGameModuleInvisible;
