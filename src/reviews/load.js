'use strict';

/**This module load reviews */

/** @constant {number} */
var REQUEST_TIMEOUT = 10000;

var reviewsBlock = document.querySelector('.reviews');



/**
* @param {String} uri - path to file with JSON data
* @param {function(Array.<Object>)} callback
*/
function loadReviews(uri, callback) {
  var xhr = new XMLHttpRequest();

  reviewsBlock.classList.add('reviews-list-loading');

  xhr.addEventListener('load', onLoadReviews);

  xhr.addEventListener('error', _removeLoadingAndAddFailure);

  xhr.timiout = REQUEST_TIMEOUT;

  xhr.addEventListener('timeout', _removeLoadingAndAddFailure);

  xhr.open('GET', uri);
  xhr.send();

  function onLoadReviews(evt) {
    reviewsBlock.classList.remove('reviews-list-loading');
    var requestObj = evt.target;
    var response = requestObj.response;
    module.exports.reviews = JSON.parse(response);
    callback(module.exports.reviews);
    removeEventListener('error', _removeLoadingAndAddFailure);
  }

  function _removeLoadingAndAddFailure() {
    reviewsBlock.classList.remove('reviews-list-loading');
    reviewsBlock.classList.add('review-load-failure');
    removeEventListener('load', onLoadReviews);
  }
}



/**
* @param {HTMLElement} review
* @param {HTMLElement} reviewImg
* @param {String} reviewImgSrc
*/
function loadImg(review, reviewImg, reviewImgSrc) {
  var avatarImage = new Image(124, 124);
  var imageLoadTimeout;

  avatarImage.addEventListener('load', onLoadImg);

  avatarImage.addEventListener('error', onErrorImg);

  imageLoadTimeout = setTimeout(function() {
    avatarImage.src = '';
    review.classList.add('review-load-failure');
  }, REQUEST_TIMEOUT);

  avatarImage.src = reviewImgSrc;

  function onLoadImg() {
    clearTimeout(imageLoadTimeout);
    reviewImg.src = reviewImgSrc;
    reviewImg.width = avatarImage.width;
    reviewImg.height = avatarImage.height;
    removeEventListener('error', onErrorImg);
  }

  function onErrorImg() {
    review.classList.add('review-load-failure');
    removeEventListener('load', onLoadImg);
  }
}


module.exports.loadReviews = loadReviews;
module.exports.loadImg = loadImg;
module.exports.reviews = [];
