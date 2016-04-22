'use strict';

var reviewsFilter = document.querySelector('.reviews-filter');
var activeFilter = reviewsFilter.querySelector('input[name="reviews"][checked]');

var data = require('./data');
var pagination = require('./pagination');



/** @param {string} filter */
function _getFilteredListRewiews(filter) {
  var reviewsToFilter = data.reviews.slice(0);

  switch (filter) {
    case 'reviews-recent':
      reviewsToFilter.sort(function(a, b) {
        if (a.date > b.date) {
          return -1;
        }
        if (a.date < b.date) {
          return 1;
        }
        return 0;
      });
      break;
    case 'reviews-good':
      reviewsToFilter = reviewsToFilter.filter(function(mark) {
        return mark.rating > 2;
      });
      reviewsToFilter.sort(function(a, b) {
        return b.rating - a.rating;
      });
      break;
    case 'reviews-bad':
      reviewsToFilter = reviewsToFilter.filter(function(mark) {
        return mark.rating < 3;
      });
      reviewsToFilter.sort(function(a, b) {
        return a.rating - b.rating;
      });
      break;
    case 'reviews-popular':
      reviewsToFilter.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
  }

  return reviewsToFilter;
}

  /** @param {string} filter */
function setFilterEnabled(filter) {
  module.exports.filteredReviews = _getFilteredListRewiews(filter);
  pagination.pageNumber = 0;

  if (activeFilter) {
    activeFilter.removeAttribute('checked');
  }

  var filterToActivate = document.getElementById(filter);
  filterToActivate.setAttribute('checked', null);

  pagination.renderReviews(true);
}

function setFiltrationEnabled() {
  reviewsFilter.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('reviews-filter-item')) {
      setFilterEnabled(evt.target.htmlFor);
    }
  });
}

module.exports.setFiltrationEnabled = setFiltrationEnabled;
module.exports.setFilterEnabled = setFilterEnabled;
module.exports.filteredReviews = [];
module.exports.reviewsFilter = reviewsFilter;
module.exports.activeFilter = activeFilter;

