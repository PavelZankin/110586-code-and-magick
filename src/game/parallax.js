'use strict';
var clouds = document.querySelector('.header-clouds');

var utilities = require('../utilities');

function _moveClouds() {
  clouds.style.backgroundPositionX = -window.pageYOffset + 'px';
}

function _setParallaxEnabled() {
  if(utilities.isElementsVisible(clouds)) {
    _moveClouds(true);
  }
}

window.addEventListener('scroll', _setParallaxEnabled);
