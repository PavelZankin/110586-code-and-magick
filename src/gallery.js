'use strict';

var imgArray = document.querySelectorAll('.photogallery-image > img');
var galleryPreview = document.querySelector('.overlay-gallery-preview');
var galleryContainer = document.querySelector('.overlay-gallery');
var totalPreviews = galleryContainer.querySelector('.preview-number-total');
var previewId = galleryContainer.querySelector('.preview-number-current');
var imgPrev = galleryContainer.querySelector('.overlay-gallery-control-left');
var imgNext = galleryContainer.querySelector('.overlay-gallery-control-right');
var btnCloseGallery = galleryContainer.querySelector('.overlay-gallery-close');
var imgDisabledClassName = 'overlay-gallery-control--disabled';
var photogallery = document.querySelector('.photogallery');
var photos = [];
var lengthArrayPhotos = photos.length;

/** @constant {number} */
var KEY_CODE_ESC = 27;

function Gallery() {

  this.photos = [];

  this.showPrevImage = this.showPrevImage.bind(this);
  this.showNextImage = this.showNextImage.bind(this);
  this.onCloseClick = this.onCloseClick.bind(this);
  this.onDocumentKeyDown = this.onDocumentKeyDown.bind(this);

  this.getPhotos();
  this.hashCheck();

  window.addEventListener('hashchange', this.hashCheck.bind(this));

}

Gallery.prototype.hashPhotoValidate = /#photo\/(\S+)/;

/** @param  {String} url */
Gallery.prototype.createPhotoUrl = function(url) {
  return '#photo/' + url;
};

Gallery.prototype.getPhotos = function() {
  this.photos = Array.prototype.map.call(imgArray, function(image) {
    image.dataset.gallery = true;
    return image.getAttribute('src');
  });

  lengthArrayPhotos = this.photos.length;

  totalPreviews.textContent = lengthArrayPhotos;
  this.currentPhoto = galleryPreview.appendChild(new Image(480, 480));
};

/** @param  {Number} idPhoto */
Gallery.prototype.showGallery = function(idPhoto) {
  this.numberPhoto = idPhoto;
  this.currentPhoto.src = this.photos[this.numberPhoto];
  previewId.textContent = this.numberPhoto + 1;
  galleryContainer.classList.remove('invisible');

  imgPrev.addEventListener('click', this.showPrevImage);
  imgNext.addEventListener('click', this.showNextImage);
  btnCloseGallery.addEventListener('click', this.onCloseClick);

  window.addEventListener('keydown', this.onDocumentKeyDown);
};

Gallery.prototype.showPrevImage = function() {
  if (this.numberPhoto > 0) {

    this.savePhoto(this.photos[this.numberPhoto - 1]);
  }
};

Gallery.prototype.showNextImage = function() {
  if (this.numberPhoto < lengthArrayPhotos - 1) {

    this.savePhoto(this.photos[this.numberPhoto + 1]);
  }
};

Gallery.prototype.hideGallery = function() {
  galleryContainer.classList.add('invisible');

  imgPrev.removeEventListener('click', this.showPrevImage);
  imgNext.removeEventListener('click', this.showNextImage);
  btnCloseGallery.removeEventListener('click', this.onCloseClick);

  window.removeEventListener('keydown', this.onDocumentKeyDown);
};

Gallery.prototype.onCloseClick = function() {
  this.savePhoto();
};

Gallery.prototype.onDocumentKeyDown = function(evt) {
  if (evt.keyCode === KEY_CODE_ESC) {

    this.savePhoto();
  }
};

/** @param  {String} photoUrl */
Gallery.prototype.savePhoto = function(photoUrl) {
  var newUrl;

  if (photoUrl) {

    newUrl = this.createPhotoUrl(photoUrl);

  } else {

    newUrl = window.location.pathname;

    this.hideGallery();
  }

  history.pushState('', document.title, newUrl);
  window.dispatchEvent(new Event('hashchange'));
};

Gallery.prototype.changePhoto = function() {
  this.currentPhoto.src = this.photos[this.numberPhoto];

  imgPrev.classList.toggle(imgDisabledClassName, this.numberPhoto === 0);
  imgNext.classList.toggle(imgDisabledClassName, this.numberPhoto === lengthArrayPhotos - 1);

  previewId.textContent = this.numberPhoto + 1;
};

Gallery.prototype.addClickHandler = function() {
  this.onClick = this.onClick.bind(this);
  photogallery.addEventListener('click', this.onClick);
};

Gallery.prototype.onClick = function(evt) {
  if (evt.target.dataset.gallery) {
    evt.preventDefault();
    this.savePhoto(evt.target.getAttribute('src'));
  }
};

Gallery.prototype.hashCheck = function() {
  var matches = this.hashPhotoValidate.exec(location.hash);

  if (matches) {
    var photoNumber = this.photos.indexOf(matches[1]);
  }

  if (photoNumber >= 0) {
    this.showGallery(photoNumber);
  } else {
    this.hideGallery();
  }
};

module.exports = new Gallery();
