'use strict';
/*функция делающая поле с отзывом обязательным при оценке меньше 3,
которая прячет линки при заполнении полей и не дает нажать кнопку "отправить отзыв",
при пустых обязательных полях*/
function validate(mark) {
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

(function() {
  var browserCookies = require('browser-cookies');

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

  var marks = formContainer.querySelectorAll('input[name="review-mark"]');
  marks.value = browserCookies.get('mark') || marks.value;
  var i = 0;
  for (i = 0; i < marks.length; i++) {
    marks[i].onclick = function() {
      var prev = formContainer.querySelector('input[name="review-mark"][checked]');
      prev.removeAttribute('checked');
      this.setAttribute('checked', null);
      validate(this);
    };
  }

  var button = document.querySelector('.review-submit');
  button.disabled = true;

  var name = document.querySelector('#review-name');
  name.value = browserCookies.get('name') || name.value;
  name.required = true;
  name.oninput = function() {
    validate(null);
  };

  var text = document.querySelector('#review-text');
  text.required = true;
  text.oninput = function() {
    validate(null);
  };

  var checkedMark = formContainer.querySelector('input[name="review-mark"][checked]');
  validate(checkedMark);

  //cookies
  var form = formContainer.querySelector('form');
  form.onsubmit = function(evt) {
    evt.preventDefault();
    var dateNow = new Date();
    var dateBirthday = new Date(dateNow.getFullYear(), 0, 20);
    var oneYear = 1000 * 60 * 60 * 24 * 365;
    var dateDifferent = 0;
    // на случай если День рождения будет меняться.
    if (dateBirthday > dateNow) {
      dateDifferent = (oneYear - (dateBirthday.valueOf() - dateNow.valueOf()));
    } else if (dateBirthday < dateNow) {
      dateDifferent = dateNow.valueOf() - dateBirthday.valueOf();
    } else {
      dateDifferent = oneYear;
    }

    var dateToExpire = new Date(dateNow.valueOf() + dateDifferent);
    var formattedDateToExpire = { expires: dateToExpire.toUTCString() };

    browserCookies.set('name', name.value, formattedDateToExpire);

    var mark = document.querySelector('input[name="review-mark"][checked]');
    browserCookies.set('mark', mark.value, formattedDateToExpire);

    form.submit();
  };
})();
