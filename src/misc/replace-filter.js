/**
 * Simple filter that performs a string replace.
 */
angular.module('ionicQuickstart').filter('replace', function() {
  return function(input, searchValue, newValue) {
    return (typeof input !== 'undefined') ? input.replace(searchValue, newValue) : '';
  };
});