angular.module('ionicQuickstart').factory('IntroService', function() {
  var _who = 'world';

  return {
    who: function() {
      return _who;
    }
  }
});