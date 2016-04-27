'use strict';

var modules = {
  load: require('./load'),
  filter: require('./filter'),
  pagination: require('./pagination')
};

(function() {

  modules.load.loadReviews('//o0.github.io/assets/json/reviews.json', function() {

    modules.filter.setFiltrationEnabled();
    modules.filter.setActiveFilter(modules.filter.activeFilter.id);
  });

})();


