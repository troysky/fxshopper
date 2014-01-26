var jsdom = require('jsdom');
var request = require('request');

exports.JQUERY_PATH = './public/js/jquery-1.10.2.min.js';

exports.get = function(config, callback){
	console.log("get " + JSON.stringify(config));
	request(
        config, 
        scrape.bind({"callback": callback})
    );
}

exports.post = function(config, callback){
    console.log("get " + JSON.stringify(config));
    request.post(
        config, 
        scrape.bind({"callback": callback})
    );
}

exports.getRaw = function(config, callback){
    console.log("get " + JSON.stringify(config));
    request(
        config, 
        fetch.bind({"callback": callback})
    );
}

exports.postRaw = function(config, callback){
    console.log("get " + JSON.stringify(config));
    request.post(
        config, 
        fetch.bind({"callback": callback})
    );
}

function scrape(err, response, body){
    var self = this;
    if(err && response.statusCode !== 200){
        console.log('Request error.');
        self.callback(null, err);
    }
    
    jsdom.env(
        {
            html: body,
            scripts: [exports.JQUERY_PATH],
            done: function(err, window){
                    if(err){
                        self.callback(null, err);
                    }else{
                        self.callback(window, null);                             
                    }                                           
                }
        }
    );
}

function fetch(err, response, body){
    var self = this;
    if(err && response.statusCode !== 200){
        console.log('Request error.');
        self.callback(null, err);
    }
    self.callback(body, null);
}