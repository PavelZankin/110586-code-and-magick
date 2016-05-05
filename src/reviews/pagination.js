'use strict';

/**This module breaks reviews and renders one page */

var buttonMoreReviews = document.querySelector('.reviews-controls-more');
buttonMoreReviews.classList.remove('invisible');

var renderedReviews = [];
var reviewsList = document.querySelector('.reviews-list');

/** @constant {number} */
var PAGE_SIZE = 3;

var filter = require('./filter');
var Review = require('./render-review');


buttonMoreReviews.addEventListener('click', onClickMoreReviews);

function onClickMoreReviews() {
  module.exports.pageNumber++;
  renderReviews(false);
}

function _isNextPageAvailable() {
  return (module.exports.pageNumber + 1) * PAGE_SIZE < filter.filteredReviews.length;
}

/**
 * @param  {Object} array
 */
function _prepareReviewsToRender(array) {
  var renderBegin = module.exports.pageNumber * PAGE_SIZE;
  var renderEnd = renderBegin + PAGE_SIZE;

  return array.slice(renderBegin, renderEnd);
}

/**
 * @param  {Boolean} replace
 */
function renderReviews(replace) {
  if (replace) {
    renderedReviews.forEach(function(review) {
      review.remove();
    });
    renderedReviews = [];
  }

  if (!_isNextPageAvailable()) {
    buttonMoreReviews.classList.add('invisible');
  } else {
    buttonMoreReviews.classList.remove('invisible');
  }

  _prepareReviewsToRender(filter.filteredReviews).forEach(function(review) {
    renderedReviews.push(new Review(review, reviewsList));
  });
}

module.exports.renderReviews = renderReviews;
module.exports.pageNumber = 0;
