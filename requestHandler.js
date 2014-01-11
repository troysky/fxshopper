var resultCollector = require('./resultCollector');

exports.init = function(app){
	app.get('/', function(req,res){		
		res.sendfile(__dirname + '/public/index.html');
	}); 

	app.get('/collectRates', function(req,res){
		var fromCcy = req.query.fromCcy;
		var toCcy = req.query.toCcy;
		var amount = req.query.amount;

		resultCollector.collect(fromCcy, toCcy, amount, function(result){
			res.writeHead(200, {"Content-Type": "application/json"});
			res.write(JSON.stringify(result));
			res.end();
		});
		
	}); 
}

