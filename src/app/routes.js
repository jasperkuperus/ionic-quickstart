angular.module('ionicQuickstart').config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('intro', {
    url: '/intro',
    templateUrl: 'intro/intro.html',
    controller: 'IntroController',
    cache: false
  });

  $urlRouterProvider.otherwise('/intro');
});
