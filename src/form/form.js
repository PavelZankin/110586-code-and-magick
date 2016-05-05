'use strict';

(function() {

  require('./form-submit');

  var browserCookies = require('browser-cookies');

  var formContainer = document.querySelector('.overlay-container');
  var labelName = document.querySelector('.review-fields-name');
  var labelText = document.querySelector('.review-fields-text');
  var labelBlock = document.querySelector('.review-fields');
  var oldCheckedMark = formContainer.querySelector('input[name="review-mark"][checked]');
  var newCheckedMark = oldCheckedMark;
  var marks = formContainer.querySelectorAll('input[name="review-mark"]');
  var button = document.querySelector('.review-submit');
  var name = document.querySelector('#review-name');
  var text = document.querySelector('#review-text');
  var savedMark = browserCookies.get('mark');

  document.querySelector('.reviews-controls-new').addEventListener('click', function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  });

  document.querySelector('.review-form-close').addEventListener('click', function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  });

  for (var i = 0; i < marks.length; i++) {
    marks[i].addEventListener('click', _onChangeChecked);
  }

  function _onChangeChecked() {
    var prev = formContainer.querySelector('input[name="review-mark"][checked]');
    prev.removeAttribute('checked');
    this.setAttribute('checked', null);
    _validate(this);
  }

  button.disabled = true;

  name.value = browserCookies.get('name') || name.value;
  name.required = true;
  name.addEventListener('input', _onValidateNull);

  text.required = true;
  text.addEventListener('input', _onValidateNull);

  function _onValidateNull() {
    _validate(null);
  }

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


  if (savedMark !== null) {
    oldCheckedMark.removeAttribute('checked');
    newCheckedMark = formContainer.querySelector('input[name="review-mark"][value="' + savedMark + '"]');
    newCheckedMark.setAttribute('checked', null);
  }

  _validate(newCheckedMark);
})();
