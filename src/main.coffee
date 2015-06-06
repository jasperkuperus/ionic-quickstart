angular.module 'ionicQuickstart', [
  'ionic',
  'ionicQuickstartTemplates',

  # Add your dependencies here, e.g.:
  # 'ngResource',
]
.run ($rootScope, $state) ->
  # Used to add state-based css class to body
  $rootScope.$state = $state