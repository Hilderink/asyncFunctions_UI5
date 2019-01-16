sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("asyncfunctions.asyncFunctions.controller.View1", {
		onInit: function () {

		},
		resolveAfter2Seconds: function(x) {   
		    return new Promise(function(resolve){
		        setTimeout(function(){   
		            resolve(x);   
		        }, 2000);   
		    });   
		},
		callbackAfter2Seconds: function(x, f) {   
		    setTimeout(function(){   
		        f(x);   
		    }, 2000);   
		},  
		handleExample1: async function () {
			var r = await this.resolveAfter2Seconds('Example 1');
			console.log(r);// returns Example 1 after 2 seconds
		}, 
		handleExample2: function () {
			this.resolveAfter2Seconds('Example 2')
			.then(function(r){
				console.log(r);// returns Example 2 after 2 seconds
			});
		}, 
		handleExample3: async function () {
			var a = await this.resolveAfter2Seconds("Example ");   
			var b = await this.resolveAfter2Seconds("3");   
			console.log(a + b); // returns Example 3 after 4 seconds
		}, 
		handleExample4: function () {
			var _this = this;
			this.callbackAfter2Seconds('Example ', function(x){
			    _this.callbackAfter2Seconds(x + '4', function(x){
			        console.log(x);//returns Example 4 after 4 seconds
			    });
			});  
		}, 
		handleExample5: async function () {
			permission = await Notification.requestPermission();
			if(permission=="granted"){
			    var notification = new Notification( 'Vladimir Hilderink says: ', {body: 'Example 5'});
			}
			if(permission=="denied"){
			    alert('Unblock push notifications in your browsers settings and restart your browser');
			}
		}, 
		getExample6: function (){
		    return new Promise(function(resolve, reject) {
		        $.ajax({url: "Example6.txt", 
		            success: function(result){ 
		                console.log('Call answered by server'); //Second text in console
		                resolve({data: 'This was Example 6'}); 
		            },
		            error: function(request,status,errorThrown){ console.log(status); }
		        });
		        console.log('Call made') //First text in console
		    });
		},
		handleExample6: async function () {
			var d = await this.getExample6();
			console.log(d.data); //Last text in console
		}, 
		handleExample7: async function () {
			try{
			    var data = await this.resolveAfter2Seconds('Example 7');
			    console.log(data); //returns Example 7 after 2 seconds
			}
			catch(err) 
			{
			    console.error('Error: ', error)    
			}
		}, 
		handleExample8: function () {
			this.resolveAfter2Seconds('Example 8').
			then(function(data) {     
			    console.log(data); //returns Example 8 after 2 seconds
			}).     
			catch(function(err) {           
			    console.error('Error: ', err)     
			});
		}, 
		handleExtra1: async function () {
			var a = this.resolveAfter2Seconds('Extra ');   
			var b = this.resolveAfter2Seconds('1');   
			console.log( await a + await b ); //returns Extra 1 after 2 seconds
		}, 
		handleExtra2: async function () {
			for (var val of ['Extra 2a...', 'Extra 2b']) {
			    console.log(await this.resolveAfter2Seconds(val));
			}
		} , 
		handleExtra3: async function () {
			var p = [];
			for (var val of ['Extra 2a', 'Extra 2b']) {
			   p.push(this.resolveAfter2Seconds(val));
			}
			var values = await Promise.all(p);
			console.log(values);
		}  
	});
});