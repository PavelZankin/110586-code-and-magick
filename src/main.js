'use strict';

require('./game/game');
require('./form/form');
require('./reviews/reviews');

var gallery = require('./gallery');

var photogallery = document.querySelector('.photogallery');

photogallery.addEventListener('click', gallery.clickPhotogallery);
