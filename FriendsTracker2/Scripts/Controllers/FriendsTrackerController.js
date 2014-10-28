var friendsTrackerModule = angular.module('friendsTrackerModule', ['ngRoute']);

friendsTrackerModule.controller('FriendsTrackerController', function ($scope) {
    //Posible to add some data
    $scope.testData = "Ahoj";
});

friendsTrackerModule.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider.
        when('/', {
            templateUrl: 'Scripts/Templates/FriendsTrackerTemplate.html',
            controller: 'FriendsTrackerController'
        })
        .otherwise({
            redirectTo: '/'
        });
    }]
);

