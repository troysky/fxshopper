var $ = require('jquery');

exports.index = function(req, res){
	$.ajax({
        url: 'http://www.google.com/',
        dataType: "jsonp",
        jsonpCallback: "_test",
        cache: false,
        timeout: 5000,
        success: function(data) {
            console.log(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });

	res.render('index', { title: 'Express' });
};

function _test(){
	console.log("testing");
}