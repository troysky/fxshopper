var scrapper = require('../scrapper');

exports.name = "OZFOREX";

exports.getRate = function(fromCcy, toCcy, amount, rateCollector){
	var self = this;
	scrapper.post(
		{
	        uri: "http://www.ozforex.com.au/widget/customer-rates-widget", 
	        form: {
				Currency: fromCcy, 
				Amount: amount
			},
	        method: 'PUT', 
	        headers: {
	            "Host":"www.ozforex.com.au",
	            "Origin": "http://www.ozforex.com.au",
	            "Referer": "http://www.ozforex.com.au/customer-rates",
	            "Accept": "*/*",
	            "X-Requested-With": "XMLHttpRequest" 
	        }

	    },
		function(window, err){
			if(window){
				var $ = window.jQuery;
				try{
					var rateText = $("td:contains(" + toCcy + ")").eq(0).next().children(":first").text().trim().replace(/ /g,'');
					rateCollector.onRate(self.name, rateText.split("(")[0]);	
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