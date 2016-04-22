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
  },

    /**
   * @param {KeyboardEvent} evt [description]
   * @private
   */
  onKeyDown: function(evt) {
    switch (evt.keyCode) {
      case 37:
        this.state.keysPressed.LEFT = true;
        break;
      case 39:
        this.state.keysPressed.RIGHT = true;
        break;
      case 38:
        this.state.keysPressed.UP = true;
        break;
      case 27:
        this.state.keysPressed.ESC = true;
        break;
    }

    if (evt.shiftKey) {
      this.state.keysPressed.SHIFT = true;
    }
  }

};
