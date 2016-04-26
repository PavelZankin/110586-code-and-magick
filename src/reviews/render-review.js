'use strict';

/**This module creates and appends review element */

var elementToClone;
var templateElement = document.querySelector('#review-template');
var load = require('./load');

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}

/**
 * @param  {Object} data
 * @return {HTMLElement} element
 */
var _getElementReviews = function(data) {
  var element = elementToClone.cloneNode(true);
  var elementImg = element.querySelector('.review-author');
  var elementImgSrc = data.author.picture;

  element.querySelector('.review-text').textContent = data.description;
  element.querySelector('.review-rating').textContent = data.rating;
  elementImg.alt = data.author.name;
  elementImg.title = data.author.name;

  load.loadImg(element, elementImg, elementImgSrc);

  return element;
};

/**
 * @param {Object} data
 * @param {HTMLElement} container
 * @constructor
 */
var Review = function(data, container) {
  this.data = data;
  this.element = _getElementReviews(this.data);

  this.onQuizAnswerClick = function(evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('review-quiz-answer')) {
      evt.target.classList.add('review-quiz-answer-active');
    }
  };

  this.remove = function() {
    this.element.parentNode.removeChild(this.element);
    this.element.removeEventListener('click', this.onQuizAnswerClick);
  };

  this.element.addEventListener('click', this.onQuizAnswerClick);
  container.appendChild(this.element);
};

module.exports = Review;
