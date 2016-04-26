'use strict';

/**This module load reviews */

/** @constant {number} */
var REQUEST_TIMEOUT = 10000;

var reviewsBlock = document.querySelector('.reviews');

function _removeLoadingAndAddFailure() {
  reviewsBlock.classList.remove('reviews-list-loading');
  reviewsBlock.classList.add('review-load-failure');
}

/**
* @param {String} uri - path to file with JSON data
* @param {function(Array.<Object>)} callback
*/
function loadReviews(uri, callback) {
  var xhr = new XMLHttpRequest();
  reviewsBlock.classList.add('reviews-list-loading');

  xhr.onload = function(evt) {
    reviewsBlock.classList.remove('reviews-list-loading');
    var requestObj = evt.target;
    var response = requestObj.response;
    module.exports.reviews = JSON.parse(response);
    callback(module.exports.reviews);
  };

  xhr.onerror = function() {
    _removeLoadingAndAddFailure();
  };

  xhr.timiout = REQUEST_TIMEOUT;
  xhr.ontimeout = function() {
    _removeLoadingAndAddFailure();
  };

  xhr.open('GET', uri);
  xhr.send();
}

/**
* @param {HTMLElement} review
* @param {HTMLElement} reviewImg
* @param {String} reviewImgSrc
*/
function loadImg(review, reviewImg, reviewImgSrc) {
  var avatarImage = new Image(124, 124);
  var imageLoadTimeout;

  avatarImage.onload = function() {
    clearTimeout(imageLoadTimeout);
    reviewImg.src = reviewImgSrc;
    reviewImg.width = avatarImage.width;
    reviewImg.height = avatarImage.height;
  };

  avatarImage.onerror = function() {
    review.classList.add('review-load-failure');
  };

  imageLoadTimeout = setTimeout(function() {
    avatarImage.src = '';
    review.classList.add('review-load-failure');
  }, REQUEST_TIMEOUT);

  avatarImage.src = reviewImgSrc;
}


module.exports.loadReviews = loadReviews;
module.exports.loadImg = loadImg;
module.exports.reviews = [];
