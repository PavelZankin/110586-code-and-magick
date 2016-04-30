'use strict';

/**This module filtered reviews */

var reviewsFilter = document.querySelector('.reviews-filter');
var activeFilter = reviewsFilter.querySelector('input[name="reviews"][checked]');
var filterStorage = 'filter';
var defaultFilter = 'reviews-all';
var lastFilterId;

var load = require('./load');
var pagination = require('./pagination');



/** @param {string} filter */
function _getFilteredListRewiews(filter) {
  var reviewsToFilter = load.reviews.slice(0);

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
function setActiveFilter(filter) {
  module.exports.filteredReviews = _getFilteredListRewiews(filter);
  pagination.pageNumber = 0;
  localStorage.setItem(filterStorage, filter);
  reviewsFilter.elements['reviews'].value = defaultFilter;

  if (activeFilter) {
    activeFilter.removeAttribute('checked');
  }

  var filterToActivate = document.getElementById(filter);
  filterToActivate.setAttribute('checked', null);

  pagination.renderReviews(true);
}

function setFiltrationEnabled() {
  reviewsFilter.classList.remove('invisible');
  reviewsFilter.addEventListener('click', function(evt) {
    if (evt.target.classList.contains('reviews-filter-item')) {
      setActiveFilter(evt.target.htmlFor);
    }
  });
}

function getLastFilterId() {
  lastFilterId = localStorage.getItem(filterStorage);

  if (lastFilterId === null) {
    lastFilterId = activeFilter.id;
  }

  return lastFilterId;
}

module.exports.setFiltrationEnabled = setFiltrationEnabled;
module.exports.setActiveFilter = setActiveFilter;
module.exports.filteredReviews = [];
module.exports.getLastFilterId = getLastFilterId;

