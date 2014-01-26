var rateProviders = [
		require('./rate_providers/ozforex'),
		require('./rate_providers/westpac'),
		require('./rate_providers/anz')
		//require('./rate_providers/currencyonline')
	];

exports.collect = function(fromCcy, toCcy, amount, callback){
	var rateCollector = new RateCollector(rateProviders.length, callback);
	for(var i = 0; i < rateProviders.length; i++){
		var rateProvider = rateProviders[i];
		rateProvider.getRate(fromCcy, toCcy, amount, rateCollector);
		console.log("Collected rate from " + rateProvider.name + "(" + (i+1) + "/" + rateProviders.length +")");
	}

}

function RateCollector(size, cb){
	this.results = [];
	this.endCount = size;	
	this.count = 0;
	this.callback = cb;	
}

RateCollector.prototype.onRate = function(provider, rate){
	console.log("adding rate to result: " + provider + "=" + rate);
	this.results.push({"provider": provider, "rate": rate});
	this.count++;
	this.checkNotify();
}

RateCollector.prototype.checkNotify = function(){
	if(this.endCount === this.count){
		this.sortResults("rate", false);
		this.callback(this.results);
	}
}

RateCollector.prototype.sortResults = function(prop, asc){
	this.results = this.results.sort(function(a, b) {
        if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
    });
}

