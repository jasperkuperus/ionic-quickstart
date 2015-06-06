angular.module('ionicQuickstart').factory 'IntroService', ->
  _who = 'world'

  return { who: -> _who }