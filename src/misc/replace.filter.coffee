# Simple filter that performs a string replace.
angular.module('ionicQuickstart').filter 'replace', ->
  (input, searchValue, newValue) ->
    if (typeof input isnt 'undefined') then input.replace(searchValue, newValue) else ''