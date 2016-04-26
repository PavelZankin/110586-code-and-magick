'use strict';

var modules = {
  index: require('./index'),
  filter: require('./filter'),
  pagination: require('./pagination')
};

(function() {

  modules.filter.reviewsFilter.classList.add('invisible');

  modules.index.loadReviews('//o0.github.io/assets/json/reviews.json', function(data) {
    modules.index.reviews = data;
    modules.filter.setFiltrationEnabled();
    modules.filter.setFilterEnabled(modules.filter.activeFilter.id);
    modules.filter.reviewsFilter.classList.remove('invisible');
  });

})();


