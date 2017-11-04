var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/ee/:city', function(req, res){
    var cityName = "";
    var url = "http://ilm.ee/sisu/2015/json_eesti_linnade_ilm.php3?l="+req.params.city;
    //var extra_url = "https://ilm.ee/sisu/2015/json_reaal_linn.php3?linn=L*"+cityName+"*0";
    request({
        url: url,
        json: true
    },
        function(err, response, data){
            if(!err && response.statusCode === 200){
                var tempString = data.link;
                cityName = tempString.slice(1,-1);

                request({url: "https://ilm.ee/sisu/2015/json_reaal_linn.php3?linn=L*"+cityName+"*0",
                json: true},function(err, response, body){
                    if(!err && response.statusCode === 200){
                        data.extra = body;
                        console.log(data);
                        res.status(200).json(data);
                    }
                })
                
                //res.status(200).json(body);
            }
        }
    ); 
});

module.exports = router;