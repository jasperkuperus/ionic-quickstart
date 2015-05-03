angular.module('ionicQuickstart').controller('IntroController', function($scope, IntroService) {
  $scope.who = IntroService.who();
});