angular.module('ionicQuickstart').controller 'IntroController', ($scope, IntroService) ->
  $scope.who = IntroService.who()