'use strict';

(function() {

  var formSubmit = require('./form-submit');

  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  function _validate() {
    var mark = document.querySelector('input[name="review-mark"][checked]');
    var button = document.querySelector('.review-submit');
    var name = document.querySelector('#review-name');
    var text = document.querySelector('#review-text');

    if (mark !== null) {
      if (mark.value >= 3) {
        text.required = false;
      } else {
        text.required = true;
      }
    }

    var labelName = document.querySelector('.review-fields-name');
    var labelText = document.querySelector('.review-fields-text');
    var labelBlock = document.querySelector('.review-fields');

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
  name.value = formSubmit.browserCookies.get('name') || name.value;
  name.required = true;
  name.oninput = function() {
    _validate(null);
  };

  var text = document.querySelector('#review-text');
  text.required = true;
  text.oninput = function() {
    _validate(null);
  };
  //меняем атрибуты checked у оценок по значению cookies
  var oldCheckedMark = formContainer.querySelector('input[name="review-mark"][checked]');
  var newCheckedMark = oldCheckedMark;

  var savedMark = formSubmit.browserCookies.get('mark');
  if (savedMark !== null) {
    oldCheckedMark.removeAttribute('checked');
    newCheckedMark = formContainer.querySelector('input[name="review-mark"][value="' + savedMark + '"]');
    newCheckedMark.setAttribute('checked', null);
  }

  _validate(newCheckedMark);
})();
