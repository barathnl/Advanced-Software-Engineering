var express = require('express');
var app = express();
var request = require('request');
app.get('/getdata/:comp', function (req, res) {
    var result={
        'stocks': []
    };

    request('http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input='+req.params.comp, function (error,response,body) {
        if (error) {
            return console.log('Error:', error);
        }

        if (response.statusCode !== 200) {
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
        body = JSON.parse(body);
        var stocks_list = body;

        request('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol='+req.params.comp, function (error,response,body1) {
        if (error) {
            return console.log('Error:', error);
        }

        if (response.statusCode !== 200) {
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
        body1 = JSON.parse(body1);
        var rate = body1;
        result.stocks.push({"stock_detail": stocks_list,"stock_quote":rate});

        res.contentType('application/json');
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.write(JSON.stringify(result));
        res.end();
    });

});
console.log(result);
})
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})