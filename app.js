angular.module('hg-tea', [])
    .directive('entry', function() {
        return {
            // restrict: 'E',
            // transclude: true,
            templateUrl: 'entry.html',
            // template: '<div>' +
                        // '<i>blah</i>' +
                      // '</div>',
            // controller: ['$scope', function($scope) {
            // }],
            // controllerAs: 'entryCtrl'
        };
    })
    .controller('tctrl', function($scope) {
        $scope.name = "TESTING";
        // console.log("TEST", $scope)
    });

