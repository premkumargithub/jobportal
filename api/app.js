'use strict';
console.log('Server initializing %s', new Date());

// loading some module
var restify = require('restify');
var Sequelize = require('sequelize');
var async = require('async');
var pkg = require(__dirname + '/package');
var routes = require(__dirname + '/routes/');
var models = require(__dirname + '/models/');
var config = require(__dirname + '/config');

// starting database and application server

async.waterfall([
		function(cb) {
			console.log('Initializing server...');
			var app = restify.createServer({
				name : pkg.name,
				version : pkg.version
			});

			app.use(restify.acceptParser(app.acceptable));
			app.use(restify.queryParser());
			app.use(restify.bodyParser({
				mapParams : false,
				keepExtensions : true,
				rejectUnknown : true
			}));

			app.on('uncaughtException', function(err) {
				console.error(err);
			});
			cb(null, app);
		},
		function(app, cb) {
			console.log('Connecting to database...');
			var sequelize = new Sequelize(config.conf_sequelize.db_name,
					config.conf_sequelize.user, config.conf_sequelize.password,
					{
						dialect : config.conf_sequelize.dialect,
						host : '127.0.0.1',
						port : config.conf_sequelize.port,
						loggin : console.log(),
						define : {
							timestamps : config.conf_sequelize.timestamp
						}
					});

			sequelize.authenticate().complete(function(err) {
				if (err) {
					console.log('Unable to connect to the database:', err);
					cb(err);
				}
			});
			models.setup(sequelize);
			cb(null, app);
		},
		function(app, cb) {
			console.log('Initializing services...');
			routes.setup(app);
			cb(null, app);
		},
		function(app, cb) {
			console.log('Starting server...');
			app.listen(config.conf_server.port, config.conf_server.host,
					function(err) {
						cb(err);
					});
		} ], function(err, app) { // This function gets called after all the
									// task will done
	if (err) {
		console.error(err);
	} else {
		console.log('App is listening at http://%s:%s/',
				config.conf_server.host, config.conf_server.port);
		exports.app = app;
	}

});