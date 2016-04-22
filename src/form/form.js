'use strict';

(function() {

  require('./form-submit');

  var browserCookies = require('browser-cookies');

  var formContainer = document.querySelector('.overlay-container');
  var labelName = document.querySelector('.review-fields-name');
  var labelText = document.querySelector('.review-fields-text');
  var labelBlock = document.querySelector('.review-fields');

  document.querySelector('.reviews-controls-new').onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  document.querySelector('.review-form-close').onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  var marks = formContainer.querySelectorAll('input[name="review-mark"]');
  for (var i = 0; i < marks.length; i++) {
    marks[i].onclick = function() {
      var prev = formContainer.querySelector('input[name="review-mark"][checked]');
      prev.removeAttribute('checked');
      this.setAttribute('checked', null);
      _validate(this);
    };
  }

  var button = document.querySelector('.review-submit');
  button.disabled = true;

  var name = document.querySelector('#review-name');
  name.value = browserCookies.get('name') || name.value;
  name.required = true;
  name.oninput = function() {
    _validate(null);
  };

  var text = document.querySelector('#review-text');
  text.required = true;
  text.oninput = function() {
    _validate(null);
  };

  function _validate() {
    var mark = document.querySelector('input[name="review-mark"][checked]');

    if (mark !== null) {
      text.required = mark.value < 3;
    }

    var isNameInvalid = name.value === '';
    var isTextInvalid = text.required && text.value === '';

    if (isNameInvalid || isTextInvalid) {
      button.disabled = true;
      labelBlock.style.visibility = '';
    } else {
      button.disabled = false;
      labelBlock.style.visibility = 'hidden';
    }

    labelName.hidden = !(isNameInvalid);

    labelText.hidden = !(isTextInvalid);
  }

  var oldCheckedMark = formContainer.querySelector('input[name="review-mark"][checked]');
  var newCheckedMark = oldCheckedMark;

  var savedMark = browserCookies.get('mark');
  if (savedMark !== null) {
    oldCheckedMark.removeAttribute('checked');
    newCheckedMark = formContainer.querySelector('input[name="review-mark"][value="' + savedMark + '"]');
    newCheckedMark.setAttribute('checked', null);
  }

  _validate(newCheckedMark);
})();
