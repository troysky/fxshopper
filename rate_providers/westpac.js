var scrapper = require('../scrapper');

exports.name = "WESTPAC";

exports.getRate = function(fromCcy, toCcy, amount, rateCollector){
	var self = this;
	if(fromCcy !== "AUD"){
		rateCollector.onRate(self.name, null);
		return;
	}
	scrapper.getRaw(
		{uri: "https://forms.westpac.com.au/forms/metadata/ratesdb.nsf/jsonforex?openagent&format=jsonp"},
		function(data, err){
			if(data){				
				try{
					var found = false;
					var json = JSON.parse(data);
					json.spotrates.rates.forEach(function(item){
						if(item.code === toCcy){
							found = true;
							rateCollector.onRate(self.name, item.data[0].TTSell);								
						}						
					});
					if(!found){
						rateCollector.onRate(self.name, null);
					}
				}catch(e){
					console.log("error extracting rate from html: " + e);
					
				}            
			}else{
				rateCollector.onRate(self.name, null);
			}
		}
	);
}

