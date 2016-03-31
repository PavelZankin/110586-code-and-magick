'use strict';
/*функция делающая поле с отзывом обязательным при оценке меньше 4,
которая прячет линки при заполнении полей и не дает нажать кнопку "отправить отзыв",
при пустых обязательных полях*/
function validate(mark) {
  var button = document.querySelector('.review-submit');
  var name = document.querySelector('#review-name');
  var text = document.querySelector('#review-text');

  if (mark !== null) {
    if (mark.value > 3) {
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

  if (isNameInvalid) {
    labelName.hidden = false;
  } else {
    labelName.hidden = true;
  }

  if (isTextInvalid) {
    labelText.hidden = false;
  } else {
    labelText.hidden = true;
  }
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

  var mark1 = document.querySelector('#review-mark-1');
  mark1.onclick = function() {
    validate(mark1);
  };
  var mark2 = document.querySelector('#review-mark-2');
  mark2.onclick = function() {
    validate(mark2);
  };
  var mark3 = document.querySelector('#review-mark-3');
  mark3.onclick = function() {
    validate(mark3);
  };
  var mark4 = document.querySelector('#review-mark-4');
  mark4.onclick = function() {
    validate(mark4);
  };
  var mark5 = document.querySelector('#review-mark-5');
  mark5.onclick = function() {
    validate(mark5);
  };
})();
