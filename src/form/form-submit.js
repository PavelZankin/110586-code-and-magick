'use strict';

var browserCookies = require('browser-cookies');
var form = document.querySelector('.overlay-container form');
var utilities = require('../utilities');

form.onsubmit = function(evt) {
  evt.preventDefault();

  var mark = document.querySelector('input[name="review-mark"][checked]');
  var name = document.querySelector('#review-name');

  var formattedDateToExpire = { expires: utilities.countDaysForCookies().toUTCString() };

  browserCookies.set('name', name.value, formattedDateToExpire);
  browserCookies.set('mark', mark.value, formattedDateToExpire);

  form.submit();
};

module.exports.browserCookies = browserCookies;
