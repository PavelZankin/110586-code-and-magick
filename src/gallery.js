'use strict';

var galleryContainer = document.querySelector('.overlay-gallery');
var galleryPreview = document.querySelector('.overlay-gallery-preview');
var totalPreviews = galleryContainer.querySelector('.preview-number-total');
var imgArray = document.querySelectorAll('.photogallery-image > img');
var previewId = galleryContainer.querySelector('.preview-number-current');
var imgPrev = galleryContainer.querySelector('.overlay-gallery-control-left');
var imgNext = galleryContainer.querySelector('.overlay-gallery-control-right');
var btnCloseGallery = galleryContainer.querySelector('.overlay-gallery-close');
var imgDisabledClassName = 'overlay-gallery-control--disabled';
var photos = [];
var lengthArrayPhotos = photos.length;

/** @constant {number} */
var KEY_CODE_ESC = 27;

var currentPhoto;
var numberPhoto;


function _onCloseClick() {
  _hideGallery();
}

function _onDocumentKeyDown(evt) {
  if (evt.keyCode === KEY_CODE_ESC) {
    _hideGallery();
  }
}

function _showNextImage() {
  if (numberPhoto < lengthArrayPhotos - 1) {

    _changePhoto(numberPhoto++ );
  }
}

function _showPrevImage() {
  if (numberPhoto > 0) {

    _changePhoto(numberPhoto-- );
  }
}

function _changePhoto() {
  currentPhoto.src = photos[numberPhoto];

  imgPrev.classList.toggle(imgDisabledClassName, numberPhoto === 0);
  imgNext.classList.toggle(imgDisabledClassName, numberPhoto === lengthArrayPhotos - 1);

  previewId.textContent = numberPhoto + 1;
}

function _hideGallery() {
  galleryContainer.classList.add('invisible');

  imgPrev.removeEventListener('click', _showPrevImage);
  imgNext.removeEventListener('click', _showNextImage);
  btnCloseGallery.removeEventListener('click', _onCloseClick);

  window.removeEventListener('keydown', _onDocumentKeyDown);
}

function getPhotos() {
  for (var i = 0; i < imgArray.length; i++) {
    photos.push(imgArray[i].getAttribute('src'));
    imgArray[i].dataset.id = i;
  }
  lengthArrayPhotos = photos.length;

  totalPreviews.textContent = lengthArrayPhotos;
  currentPhoto = galleryPreview.appendChild(new Image(480, 480));
}

function showGallery(idPhoto) {
  numberPhoto = idPhoto;
  currentPhoto.src = photos[numberPhoto];
  previewId.textContent = numberPhoto + 1;
  galleryContainer.classList.remove('invisible');

  imgPrev.addEventListener('click', _showPrevImage);
  imgNext.addEventListener('click', _showNextImage);
  btnCloseGallery.addEventListener('click', _onCloseClick);

  window.addEventListener('keydown', _onDocumentKeyDown);
}


module.exports.getPhotos = getPhotos;
module.exports.showGallery = showGallery;
