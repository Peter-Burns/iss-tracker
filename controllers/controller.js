const express = require('express');
let router = express.Router();
let axios = require('axios');

router.get("/", function (req, res) {
    res.render("index");
});

router.get("/passes", function(req, res){
    let {lat, long} = req.query;
    axios.get("http://api.open-notify.org/iss-pass.json?lat=" + lat + "&lon=" + long + "&alt=20&n=5&callback=?")
    .then(function (data){
        let dates = JSON.parse(data.data.substring(2, data.data.length-1));
        res.send(dates.response.map(date => {
            return new Date(date.risetime*1000)
        }));
    })
    .catch(function(error){
        console.log(error);
    });
});

module.exports = router;