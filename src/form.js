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

// Эта функция присутствовала
(function() {
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
  // конец кода который был

  var marks = formContainer.querySelectorAll('input[name="review-mark"]');
  for (var i = 0; i < marks.length; i++) {
    marks[i].onclick = function() {
      validate(this);
    };
  }

  var button = document.querySelector('.review-submit');
  button.disabled = true;

  var name = document.querySelector('#review-name');
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
})();
