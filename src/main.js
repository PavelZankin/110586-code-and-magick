'use strict';

require('./game/game');
require('./form/form');
require('./reviews/reviews');

var gallery = require('./gallery');

var photogallery = document.querySelector('.photogallery');


gallery.getPhotos();

photogallery.addEventListener('click', function(evt) {
  evt.preventDefault();
  if (evt.target.tagName === 'IMG') {
    gallery.showGallery();
  }
});
