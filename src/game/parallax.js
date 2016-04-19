'use strict';
var clouds = document.querySelector('.header-clouds');

function moveClouds() {
  clouds.style.backgroundPositionX = -window.pageYOffset + 'px';
}

function isElementsVisible(element) {
  return element.getBoundingClientRect().bottom >= 0;
}

function setParallaxEnabled() {
  if(isElementsVisible(clouds)) {
    moveClouds(true);
  }
}

window.addEventListener('scroll', setParallaxEnabled);

module.exports.isElementsVisible = isElementsVisible;

