'use strict';

module.exports = {
  countDaysForCookies: function() {
    var dateNow = new Date();
    var dateBirthday = new Date(dateNow.getFullYear(), 0, 20);
    var oneYear = 1000 * 60 * 60 * 24 * 365;
    var dateDifferent = dateBirthday.valueOf() - dateNow.valueOf();
    var dateToExpire;

    if (dateDifferent > 0) {
      dateDifferent = oneYear - dateDifferent;
    } else if (dateDifferent < 0) {
      dateDifferent = dateDifferent * -1;
    } else {
      dateDifferent = oneYear;
    }

    dateToExpire = new Date(dateNow.valueOf() + dateDifferent);

    return dateToExpire;
  },

  isElementsVisible: function(element) {
    return element.getBoundingClientRect().bottom >= 0;
  }

};
