'use strict';

function Gallery() {

  var galleryContainer = document.querySelector('.overlay-gallery');
  var galleryPreview = document.querySelector('.overlay-gallery-preview');
  var totalPreviews = galleryContainer.querySelector('.preview-number-total');
  var imgArray = document.querySelectorAll('.photogallery-image > img');
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

  var that = this;
  this.photos = [];

  this.hashPhotoValidate = /#photo\/(\S+)/;

  this.createPhotoUrl = function(url) {
    return '#photo/' + url;
  };

  this.getPhotos = function() {
    that.photos = Array.prototype.map.call(imgArray, function(image) {
      image.dataset.gallery = true;
      return image.getAttribute('src');
    });

    lengthArrayPhotos = that.photos.length;

    totalPreviews.textContent = lengthArrayPhotos;
    that.currentPhoto = galleryPreview.appendChild(new Image(480, 480));
  };

  this.showGallery = function(idPhoto) {
    that.numberPhoto = idPhoto;
    that.currentPhoto.src = that.photos[that.numberPhoto];
    previewId.textContent = that.numberPhoto + 1;
    galleryContainer.classList.remove('invisible');

    imgPrev.addEventListener('click', that.showPrevImage);
    imgNext.addEventListener('click', that.showNextImage);
    btnCloseGallery.addEventListener('click', that.onCloseClick);

    window.addEventListener('keydown', that.onDocumentKeyDown);
  };

  this.showPrevImage = function() {
    if (that.numberPhoto > 0) {

      that.savePhoto(that.photos[that.numberPhoto - 1]);
    }
  };

  this.showNextImage = function() {
    if (that.numberPhoto < lengthArrayPhotos - 1) {

      that.savePhoto(that.photos[that.numberPhoto + 1]);
    }
  };

  this.hideGallery = function() {
    galleryContainer.classList.add('invisible');

    imgPrev.removeEventListener('click', that.showPrevImage);
    imgNext.removeEventListener('click', that.showNextImage);
    btnCloseGallery.removeEventListener('click', that.onCloseClick);

    window.removeEventListener('keydown', that.onDocumentKeyDown);
  };

  this.onCloseClick = function() {
    that.savePhoto();
  };

  this.onDocumentKeyDown = function(evt) {
    if (evt.keyCode === KEY_CODE_ESC) {

      that.savePhoto();
    }
  };

  this.savePhoto = function(photoUrl) {
    var newUrl;

    if (photoUrl) {

      newUrl = that.createPhotoUrl(photoUrl);

    } else {

      newUrl = window.location.pathname;

      that.hideGallery();
    }

    history.pushState('', document.title, newUrl);
    window.dispatchEvent(new Event('hashchange'));
  };

  this.changePhoto = function() {
    that.currentPhoto.src = that.photos[that.numberPhoto];

    imgPrev.classList.toggle(imgDisabledClassName, that.numberPhoto === 0);
    imgNext.classList.toggle(imgDisabledClassName, that.numberPhoto === lengthArrayPhotos - 1);

    previewId.textContent = that.numberPhoto + 1;
  };

  this.addClickHandler = function() {
    photogallery.addEventListener('click', function(evt) {
      if (evt.target.dataset.gallery) {
        evt.preventDefault();
        that.savePhoto(evt.target.getAttribute('src'));
      }
    });
  };

  this.hashCheck = function() {
    var matches = that.hashPhotoValidate.exec(location.hash);

    if (matches) {
      var photoNumber = that.photos.indexOf(matches[1]);
    }

    if (photoNumber >= 0) {
      that.showGallery(photoNumber);
    } else {
      that.hideGallery();
    }
  };

  this.getPhotos();
  this.hashCheck();

  window.addEventListener('hashchange', this.hashCheck);

}

module.exports = new Gallery();
