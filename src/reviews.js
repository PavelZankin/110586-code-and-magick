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

    review.querySelector('.review-text').textContent = data.description;
    review.querySelector('.review-rating').textContent = data.rating;
    reviewImg.alt = data.author.name;
    reviewImg.title = data.author.name;

    renderImg(data, review, reviewImg);

    reviewsList.appendChild(review);

    return review;

  }

  /**
  * @param {object} data
  * @param {HTMLElement} review
  * @param {HTMLElement} reviewImg
  */
  function renderImg(data, review, reviewImg) {
    var avatarImage = new Image(124, 124);
    var imageLoadTimeout;

    avatarImage.onload = function() {
      clearTimeout(imageLoadTimeout);
      reviewImg.src = data.author.picture;
      reviewImg.width = avatarImage.width;
      reviewImg.height = avatarImage.height;
    };

    avatarImage.onerror = function() {
      review.classList.add('review-load-failure');
    };

    imageLoadTimeout = setTimeout(function() {
      avatarImage.src = '';
      review.classList.add('review-load-failure');
    }, 10000);
    avatarImage.src = data.author.picture;
  }

  window.reviews.forEach(renderReview);

  reviewsFilter.classList.remove('invisible');
})();
