var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/ee', function(req, res){
    var url = "http://ilm.ee/sisu/2015/json_eesti_linnade_ilm.php3?l=1";
    request({
        url: url,
        json: true
    },
        function(err, response, body){
            if(!error && response.statusCode === 200){
                res.status(200).json(body);
            }
        }
    ); 
});