'use strict';

(function() {
  var reviewsFilter = document.querySelector('.reviews-filter');
  reviewsFilter.classList.add('invisible');

  var reviewsList = document.querySelector('.reviews-list');
  var templateElement = document.querySelector('#review-template');
  var elementToClone;

  if ('content' in templateElement) {
    elementToClone = templateElement.content.querySelector('.review');
  } else {
    elementToClone = templateElement.querySelector('.review');
  }

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

    renderImg(review, reviewImg, reviewImgSrc);

    reviewsList.appendChild(review);

    return review;

  }

  /**
  * @param {HTMLElement} review
  * @param {HTMLElement} reviewImg
  * @param {String} reviewImgSrc
  */
  function renderImg(review, reviewImg, reviewImgSrc) {
    var TIMEOUT = 10000;
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
    }, TIMEOUT);

    avatarImage.src = reviewImgSrc;
  }

  window.reviews.forEach(renderReview);

  reviewsFilter.classList.remove('invisible');
})();
