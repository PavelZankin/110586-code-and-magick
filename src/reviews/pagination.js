'use strict';

var buttonMoreReviews = document.querySelector('.reviews-controls-more');
buttonMoreReviews.classList.remove('invisible');

var reviewsList = document.querySelector('.reviews-list');
var templateElement = document.querySelector('#review-template');
var elementToClone;

/** @constant {number} */
var PAGE_SIZE = 3;

var modules = {
  data: require('./data'),
  filter: require('./filter')
};

if ('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}

buttonMoreReviews.addEventListener('click', function() {
  module.exports.pageNumber++;
  renderReviews(false);
});

/**
 * [renderReview description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function _renderReview(data) {
  var review = elementToClone.cloneNode(true);
  var reviewImg = review.querySelector('.review-author');
  var reviewImgSrc = data.author.picture;

  review.querySelector('.review-text').textContent = data.description;
  review.querySelector('.review-rating').textContent = data.rating;
  reviewImg.alt = data.author.name;
  reviewImg.title = data.author.name;

  modules.data.loadImg(review, reviewImg, reviewImgSrc);

  reviewsList.appendChild(review);

  return review;

}
/**
 * [isNextPageAvailable description]
 * @return {Boolean} [description]
 */
function _isNextPageAvailable() {
  return (module.exports.pageNumber + 1) * PAGE_SIZE < modules.filter.filteredReviews.length;
}

/**
 * [prepareReviewsToRender description]
 * @param  {[type]} array [description]
 * @return {[type]}       [description]
 */
function _prepareReviewsToRender(array) {
  var renderBegin = module.exports.pageNumber * PAGE_SIZE;
  var renderEnd = renderBegin + PAGE_SIZE;

  return array.slice(renderBegin, renderEnd);
}

/**
 * [renderReviews description]
 * @param  {[type]} replace [description]
 * @return {[type]}         [description]
 */
function renderReviews(replace) {
  if (replace) {
    reviewsList.innerHTML = '';
  }

  if (!_isNextPageAvailable()) {
    buttonMoreReviews.classList.add('invisible');
  } else {
    buttonMoreReviews.classList.remove('invisible');
  }

  _prepareReviewsToRender(modules.filter.filteredReviews).forEach(_renderReview);
}

module.exports.renderReviews = renderReviews;
module.exports.pageNumber = 0;
