var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider,$httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $routeProvider
        .when('/', {
            templateUrl: 'login.html',
            controller: 'mainController'
        })
        .when('/register', {
            templateUrl: 'register.html',
            controller: 'registerController'
        })
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'homeController'
        });

});
myApp.controller('mainController', function($scope) {
    $scope.pageClass = 'login';
});

myApp.controller('registerController', function($scope) {
    $scope.pageClass = 'register';
});

myApp.controller('homeController', function($scope,$http) {
    $scope.pageClass = 'home';
    var map;
    var mapOptions;
    var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true
    });
    var directionsService = new google.maps.DirectionsService();


    $scope.initialize = function () {
        var pos = new google.maps.LatLng(0, 0);
        var mapOptions = {
            zoom: 3,
            center: pos
        };

        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
    };
    $scope.$on('homeController', function() {
        initialize();
    });
    $scope.calcRoute = function () {
        var end = document.getElementById('endlocation').value;
        var start = document.getElementById('startlocation').value;
        var state_end = document.getElementById('originstate').value;
        var state_start = document.getElementById('destinationstate').value;
        var base_url='http://api.wunderground.com/api/b62fdb6f15593b7e/conditions/q/';
        var url_1=base_url.concat(state_end,'/',start,'.json');
        console.log(url_1);
        var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setMap(map);
                directionsDisplay.setDirections(response);
                console.log(status);
            }
        });
        $http.get('http://api.wunderground.com/api/b62fdb6f15593b7e/conditions/q/mo/kansas_city.json').success(function(data) {
            console.log(data);
            temp = data.current_observation.temp_f;
            weather = data.current_observation.weather;
            console.log(temp);
            console.log(weather);
            $scope.currentweather = {
                html: "Currently " + temp + " &deg; F and " + weather + ""
            }
        });
    };
    google.maps.event.addDomListener(window, 'load', $scope.initialize);
});

/*
myApp.controller('googlemapoutput',function ($scope) {
    var map;
    var mapOptions;
    var directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: true
    });
    var directionsService = new google.maps.DirectionsService();

    $scope.initialize = function () {
        var pos = new google.maps.LatLng(0, 0);
        var mapOptions = {
            zoom: 3,
            center: pos
        };

        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
    };
    google.maps.event.addDomListener(window, 'load', $scope.initialize);
});*/
