var scrapper = require('../scrapper');

exports.name = "ANZ";

exports.getRate = function(fromCcy, toCcy, amount, rateCollector){
	var self = this;
	if(fromCcy !== "AUD"){
		rateCollector.onRate(self.name, null);
		return;
	}
	scrapper.get(
		{uri: "http://www.anz.com/aus/ratefee/fxrates/fxpopup.asp"},
		function(window, err){
			if(window){
				var $ = window.jQuery;
				try{
					var elem = $("td:contains(" + toCcy + ")").eq(3);
					var buyRate = elem.next().text().trim();
					var sellRate = elem.next().next().next().next().text().trim();
					rateCollector.onRate(self.name, sellRate);	
				}catch(e){
					console.log("error extracting rate from html: " + e);
					rateCollector.onRate(self.name, null);
				}            
			}else{
				rateCollector.onRate(self.name, null);
			}
		}
	);
}