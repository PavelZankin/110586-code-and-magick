'use strict';

function Gallery() {

  this.imgArray = document.querySelectorAll('.photogallery-image > img');
  this.galleryPreview = document.querySelector('.overlay-gallery-preview');
  this.galleryContainer = document.querySelector('.overlay-gallery');
  this.totalPreviews = this.galleryContainer.querySelector('.preview-number-total');
  this.previewId = this.galleryContainer.querySelector('.preview-number-current');
  this.imgPrev = this.galleryContainer.querySelector('.overlay-gallery-control-left');
  this.imgNext = this.galleryContainer.querySelector('.overlay-gallery-control-right');
  this.btnCloseGallery = this.galleryContainer.querySelector('.overlay-gallery-close');
  this.imgDisabledClassName = 'overlay-gallery-control--disabled';
  this.photogallery = document.querySelector('.photogallery');

  this.photos = [];
  this.lengthArrayPhotos = this.photos.length;

  /** @constant {number} */
  this.KEY_CODE_ESC = 27;

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
  this.photos = Array.prototype.map.call(this.imgArray, function(image) {
    image.dataset.gallery = true;
    return image.getAttribute('src');
  });

  this.lengthArrayPhotos = this.photos.length;

  this.totalPreviews.textContent = this.lengthArrayPhotos;
  this.currentPhoto = this.galleryPreview.appendChild(new Image(480, 480));
};

/** @param  {Number} idPhoto */
Gallery.prototype.showGallery = function(idPhoto) {
  this.numberPhoto = idPhoto;
  this.currentPhoto.src = this.photos[this.numberPhoto];
  this.previewId.textContent = this.numberPhoto + 1;
  this.galleryContainer.classList.remove('invisible');

  this.imgPrev.addEventListener('click', this.showPrevImage);
  this.imgNext.addEventListener('click', this.showNextImage);
  this.btnCloseGallery.addEventListener('click', this.onCloseClick);

  window.addEventListener('keydown', this.onDocumentKeyDown);
};

Gallery.prototype.showPrevImage = function() {
  if (this.numberPhoto > 0) {

    this.savePhoto(this.photos[this.numberPhoto - 1]);
  }
};

Gallery.prototype.showNextImage = function() {
  if (this.numberPhoto < this.lengthArrayPhotos - 1) {

    this.savePhoto(this.photos[this.numberPhoto + 1]);
  }
};

Gallery.prototype.hideGallery = function() {
  this.galleryContainer.classList.add('invisible');

  this.imgPrev.removeEventListener('click', this.showPrevImage);
  this.imgNext.removeEventListener('click', this.showNextImage);
  this.btnCloseGallery.removeEventListener('click', this.onCloseClick);

  window.removeEventListener('keydown', this.onDocumentKeyDown);
};

Gallery.prototype.onCloseClick = function() {
  this.savePhoto();
};

Gallery.prototype.onDocumentKeyDown = function(evt) {
  if (evt.keyCode === this.KEY_CODE_ESC) {

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

  this.imgPrev.classList.toggle(this.imgDisabledClassName, this.numberPhoto === 0);
  this.imgNext.classList.toggle(this.imgDisabledClassName, this.numberPhoto === this.lengthArrayPhotos - 1);

  this.previewId.textContent = this.numberPhoto + 1;
};

Gallery.prototype.addClickHandler = function() {
  this.onClick = this.onClick.bind(this);
  this.photogallery.addEventListener('click', this.onClick);
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
