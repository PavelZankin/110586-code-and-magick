'use strict';

var browserCookies = require('browser-cookies');
var form = document.querySelector('.overlay-container form');

form.onsubmit = function(evt) {
  var mark = document.querySelector('input[name="review-mark"][checked]');
  var name = document.querySelector('#review-name');
  var dateNow = new Date();
  var dateBirthday = new Date(dateNow.getFullYear(), 0, 20);
  var oneYear = 1000 * 60 * 60 * 24 * 365;
  var dateDifferent = dateBirthday.valueOf() - dateNow.valueOf();

  evt.preventDefault();

  if (dateDifferent > 0) {
    dateDifferent = oneYear - dateDifferent;
  } else if (dateDifferent < 0) {
    dateDifferent = dateDifferent * -1;
  } else {
    dateDifferent = oneYear;
  }

  var dateToExpire = new Date(dateNow.valueOf() + dateDifferent);
  var formattedDateToExpire = { expires: dateToExpire.toUTCString() };

  browserCookies.set('name', name.value, formattedDateToExpire);
  browserCookies.set('mark', mark.value, formattedDateToExpire);

  form.submit();
};

module.exports.browserCookies = browserCookies;
