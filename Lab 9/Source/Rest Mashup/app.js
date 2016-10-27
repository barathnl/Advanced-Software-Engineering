/**
 * Created by barat on 10/25/2016.
 */
var myApp = angular.module('myApp', []);

myApp.controller('stock', function($scope,$http) {
    $scope.searchStock= function () {
        var comp_symbol=document.getElementById("comp").value;
        $http.get('http://localhost:8081/getdata/'+comp_symbol).success(function(data) {
                console.log(data);
            $scope.comp_symbol=data.stocks[0].stock_detail[0].Symbol;
            $scope.comp_name=data.stocks[0].stock_detail[0].Name;
            $scope.comp_exchange=data.stocks[0].stock_detail[0].Exchange;

            $scope.high=data.stocks[0].stock_quote.High ;
            $scope.low=data.stocks[0].stock_quote.Low;
            $scope.open=data.stocks[0].stock_quote.Open;
            $scope.lastprice=data.stocks[0].stock_quote.LastPrice;
            $scope.change=data.stocks[0].stock_quote.Change;
            $scope.changepercent=data.stocks[0].stock_quote.ChangePercent;
            $scope.marketcap=data.stocks[0].stock_quote.MarketCap;
            $scope.volume=data.stocks[0].stock_quote.Volume;

            document.getElementById('stock_body').style.display = 'block';
        });
    }
});