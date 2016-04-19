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
* @param {object} data
* @return {HTMLElement} review
*/
function renderReview(data) {
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

function isNextPageAvailable() {
  return (module.exports.pageNumber + 1) * PAGE_SIZE < modules.filter.filteredReviews.length;
}

/** @param {object} array */
function prepareReviewsToRender(array) {
  var renderBegin = module.exports.pageNumber * PAGE_SIZE;
  var renderEnd = renderBegin + PAGE_SIZE;

  return array.slice(renderBegin, renderEnd);
}

/** @param {boolean=} replace */
function renderReviews(replace) {
  if (replace) {
    reviewsList.innerHTML = '';
  }

  if (!isNextPageAvailable()) {
    buttonMoreReviews.classList.add('invisible');
  } else {
    buttonMoreReviews.classList.remove('invisible');
  }

  prepareReviewsToRender(modules.filter.filteredReviews).forEach(renderReview);
}

module.exports.renderReviews = renderReviews;
module.exports.pageNumber = 0;
