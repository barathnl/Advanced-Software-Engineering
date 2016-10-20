var myApp = angular.module('myApp', []);

myApp.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
]);

myApp.controller('KCweather', function($scope,$http) {
    $scope.City = 'Kansas City';
    
    $http.get('http://localhost:8085/RESTservice/rest/serverMashup').success(function(data) {
            console.log(data);
            $scope.temp=data.currentWeather.temp;
            $scope.mintemp=data.currentWeather.temp_min;
            $scope.maxtemp=data.currentWeather.temp_max;
            $scope.humidity=data.currentWeather.humidity;
            $scope.pressure=data.currentWeather.pressure;
            $scope.gnd_level=data.currentWeather.grnd_level;
            $scope.sea_level=data.currentWeather.sea_level;
            
            $scope.dt1=data.forecastWeather[0].dt_txt;
            $scope.dt2=data.forecastWeather[1].dt_txt;
            $scope.dt3=data.forecastWeather[2].dt_txt;
            $scope.dt4=data.forecastWeather[3].dt_txt;
            $scope.dt5=data.forecastWeather[4].dt_txt;
            $scope.dt6=data.forecastWeather[5].dt_txt;
            $scope.dt7=data.forecastWeather[6].dt_txt;
                            
            $scope.wdetail1=data.forecastWeather[0].weather[0].description;
            $scope.wdetail2=data.forecastWeather[1].weather[0].description;
            $scope.wdetail3=data.forecastWeather[2].weather[0].description;
            $scope.wdetail4=data.forecastWeather[3].weather[0].description;
            $scope.wdetail5=data.forecastWeather[4].weather[0].description;
            $scope.wdetail6=data.forecastWeather[5].weather[0].description;
            $scope.wdetail7=data.forecastWeather[6].weather[0].description;
        
            $scope.temp1=data.forecastWeather[0].main.temp;
            $scope.temp2=data.forecastWeather[1].main.temp;
            $scope.temp3=data.forecastWeather[2].main.temp;
            $scope.temp4=data.forecastWeather[3].main.temp;
            $scope.temp5=data.forecastWeather[4].main.temp;
            $scope.temp6=data.forecastWeather[5].main.temp;
            $scope.temp7=data.forecastWeather[6].main.temp;
        
            $scope.wind1=data.forecastWeather[0].wind.speed;
            $scope.wind2=data.forecastWeather[1].wind.speed;
            $scope.wind3=data.forecastWeather[2].wind.speed;
            $scope.wind4=data.forecastWeather[3].wind.speed;
            $scope.wind5=data.forecastWeather[4].wind.speed;
            $scope.wind6=data.forecastWeather[5].wind.speed;
            $scope.wind7=data.forecastWeather[6].wind.speed;
            
            $scope.icon1=data.forecastWeather[0].weather[0].icon;
            $scope.icon2=data.forecastWeather[1].weather[0].icon;
            $scope.icon3=data.forecastWeather[2].weather[0].icon;
            $scope.icon4=data.forecastWeather[3].weather[0].icon;
            $scope.icon5=data.forecastWeather[4].weather[0].icon;
            $scope.icon6=data.forecastWeather[5].weather[0].icon;
            $scope.icon7=data.forecastWeather[6].weather[0].icon;
        
            $scope.hum1=data.forecastWeather[0].main.humidity;
            $scope.hum2=data.forecastWeather[1].main.humidity;
            $scope.hum3=data.forecastWeather[2].main.humidity;
            $scope.hum4=data.forecastWeather[3].main.humidity;
            $scope.hum5=data.forecastWeather[4].main.humidity;
            $scope.hum6=data.forecastWeather[5].main.humidity;
            $scope.hum7=data.forecastWeather[6].main.humidity;
        });
          
});