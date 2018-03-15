(function (window){
	"use strict";
	var App = window.App || {};
	var $ = window.jQuery;

	function RemoteDataStore(url) {
		if (!url) {
			throw new Error("No remote URL supplied.");
		}

		this.serverUrl = url;
	}

	RemoteDataStore.prototype.add = function (email, order) {

		$.post(this.serverUrl,
			{
				emailAddress: email,
				coffee: order.coffee,
				size: order.size,
				flavor: order.flavor,
				strength: order.strength
			},
			function (serverResponse) {
				console.log(serverResponse);
			});
	};

	RemoteDataStore.prototype.getAll = function (cb) {
		$.get(this.serverUrl, function (serverResponse) {
			console.log(serverResponse);
			cb(serverResponse);
		});
	};

	RemoteDataStore.prototype.get = function (key, cb) {
		$.get(this.serverUrl + "/" + key, function (serverResponse) {
			console.log(serverResponse);
			cb(serverResponse);
		});
	};

	RemoteDataStore.prototype.remove = function(key) {
		var id;
		var url = this.serverUrl;

		// Get all orders
		$.get(this.serverUrl, function (serverResponse) {
			// Find the matching email address in the db and get corresponding id
			serverResponse.forEach(function (element) {
				if (element.emailAddress == key) {
					id = element.id;
				}
			});

			// Use the id found in the server response to remove the order
			$.ajax(url + "/" + id, {
				type: "DELETE"
			});
		});

	};

	App.RemoteDataStore = RemoteDataStore;
	window.App = App;
})(window);
