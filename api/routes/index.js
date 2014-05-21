'use strict';

exports.setup = function (app) {
	app.get('/',function(req,res,next){
		res.send('service online');
		next();
	});
	app.get('/api',function(req,res,next){
		res.send('service api section of jobportal');
		next();
	});
	require('./job').setup(app);
	require('./department').setup(app);
};