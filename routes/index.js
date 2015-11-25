var express = require('express');
var router = express.Router();
var request = require('request');
var xml = require('xml');
var domains = process.env.DOMAINS || "";

function extractDomain(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    return domain;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  var url = req.query.url;
  if (!url){
    var err = new Error('Invalid parameters');
    next(err);
    return;
  }

  if (domains.indexOf(extractDomain(url))== -1){
    var err = new Error('Bad request, action has been reported');
    next(err);
    return;
  }

 

  req.pipe(request(url)).pipe(res);

});

module.exports = router;
