'use strict';

var modules = {
  data: require('./data'),
  filter: require('./filter'),
  pagination: require('./pagination')
};

(function() {

  modules.filter.reviewsFilter.classList.add('invisible');

  modules.data.loadReviews('//o0.github.io/assets/json/reviews.json', function(data) {
    modules.data.reviews = data;
    modules.filter.setFiltrationEnabled();
    modules.filter.setFilterEnabled(modules.filter.activeFilter.id);
    modules.filter.reviewsFilter.classList.remove('invisible');
  });

})();


