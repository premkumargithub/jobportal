var config = require('../config');
var _ = require('underscore');
var restify = require('restify');
var util = require('util');
var async = require('async');
// --------------------------------------API-------------------------------------//
module.exports.err_ApiCredentailsRequired = {
	http_code : 401,
	err_code : 100,
	err_msg : 'API credentials required to access the api service'
};

module.exports.err_InvalidApiCredentails = {
	http_code : 402,
	err_code : 101,
	err_msg : 'API credentials provided are invalid'
};

module.exports.err_NoRecordFound = {
	http_code : 402,
	err_code : 102,
	err_msg : 'No record found'
};

module.exports.err_CouldNotSaveRecord = {
	http_code : 403,
	err_code : 103,
	err_msg : 'Could not save record'
};

module.exports.err_CouldNotUpdateRecord = {
	http_code : 403,
	err_code : 104,
	err_msg : 'Could not update record'
};

module.exports.err_CouldNotDeleteRecord = {
	http_code : 403,
	err_code : 105,
	err_msg : 'Could not delete record'
};
//creating custom error message
function InvalidInputError(msg){
	restify.RestError.call(this,{
		restCode :'406',
		statusCode: 406,
		message : msg
	});
	
	this.name='InvalidInputError';
}

util.inherits(InvalidInputError,restify.RestError);

module.exports.errorlog = function(err) {
	var logpath = config.conf_log.log_file;
	var fs = require('fs');
	err = err.toString().replace(/\r\n|\r/g, '\n'); // hack
	try {
		console.log(logpath);
		fs.appendFile(logpath, err, function(logerr) {
			if (err)
				throw err;
			console.log('The "data to append" was appended to file!');
		});
	} catch (e) {
		console.log(e);
	}
};

module.exports.checkForkey = function(validations, content, callback) {
	console.log('hello1');
	async.waterfall([
	                function (cb){
	                	console.log('hello12');
	                	// resquired_keys= array();
	                	_.find(validations, function(value){
	                		console.log(value);
	                		var arr=_.keys(value);
	                		 
	                		 console.log(test);
	                		console.log(arr);
	                		console.log('aaaaa');
	                		//resquired_keys=_.has(validation.valkeys,);
	                		//return num % 2 == 0; 
	                		
	                	});
	                	//console.log(even);
//	                	_.each(validations, function(value,key,validation){
//	                		//validatekey=_.keys(value);
//	                		validatevalue=_.values(value);
//	                		required_keys=_.where(validation, {isRequired: true});
//	                		console.log(required_keys);
////	                		if(validation[key].validatekey.isRequired){
////	                			if(content.validatekey == '')
////	                				{
////	                				callback(new InvalidInputError('missing value' + validatekey ));
////	                				}
////	                		};
//	                		//required_keys=_.values(value);
//		                	//console.log(required_keys);
//	                		console.log('in each');
//	                		//console.log(validatekey);
//	                		//cosole.log(validation.key.isRequired);
//	                	});
	                	 
	                	
	                }
	                ], function(err){
						callback(err);
					});
	};
