'use strict';
(function() {

  var gameModule = document.querySelector('.demo');
  var clouds = document.querySelector('.header-clouds');

  function moveClouds() {
    clouds.style.backgroundPositionX = -window.pageYOffset + 'px';
  }

  function isElementsVisible(element) {
    return element.getBoundingClientRect().bottom >= 0;
  }

  function pauseWhenTheGameModuleInvisible(game, Game) {
    if (!isElementsVisible(gameModule)) {
      game.setGameStatus(Game.Verdict.PAUSE);
    }
  }

  function setParallaxEnabled() {
    if(isElementsVisible(clouds)) {
      moveClouds(true);
    }
  }

  window.addEventListener('scroll', function() {
    setInterval(pauseWhenTheGameModuleInvisible, 100);
  });
  window.addEventListener('scroll', setParallaxEnabled);
})();
