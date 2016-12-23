export default () => {
  'ngInject';
    return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: {
    currentsite:'@',
    currentyear:'@'}, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
    templateUrl: '/app/in/economy/gdp/template/gdptemplate.html',
    replace: true,
    transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
      $scope.showMe = false;
      $scope.toggle = function(){
        $scope.showMe = !$scope.showMe;
      }
    }
  };
};
