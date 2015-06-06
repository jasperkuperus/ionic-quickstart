###
This file contains a specific exception handler for AngularJS, overriding the default
behavior. This is done because AngularJS and source maps don't play nice. AngularJS
catches all exceptions and then the source maps fail. By just throwing the exception,
source maps simply work again. Tadaaa.
###
angular.module('ionicQuickstart').config ($provide) ->
  $provide.decorator '$exceptionHandler', ->
    (exception, cause) -> throw exception