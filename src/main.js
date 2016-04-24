'use strict';

require('./game/game');
require('./form/form');
require('./reviews/reviews');

var gallery = require('./gallery');

var photogallery = document.querySelector('.photogallery');

var idPhoto;


gallery.getPhotos();

photogallery.addEventListener('click', function(evt) {
  evt.preventDefault();
  if (evt.target.tagName === 'IMG') {
    idPhoto = parseInt(evt.target.dataset.id, 10);
    gallery.showGallery(idPhoto);
  }
});
