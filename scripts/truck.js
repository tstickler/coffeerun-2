(function (window){
	"use strict";

	var App = window.App || {};

	function Truck(truckID, db){
		this.truckID = truckID;
		this.db = db;
	}

	Truck.prototype.createOrder = function(order) {
		this.db.add(order.emailAddress, order);
	};

	Truck.prototype.deliverOrder = function(customerID) {
		this.db.remove(customerID);
	};

	Truck.prototype.printOrders = function() {
		var customerIDArray = Object.keys(this.db.getAll());

		customerIDArray.forEach(function (id) {
			console.log(this.db.get(id));
		}.bind(this));
	};

	App.Truck = Truck;
	window.App = App;
})(window);
