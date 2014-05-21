var Sequelize = require('sequelize');  
var job = require('./job').job;
var department = require('./department').department;

exports.setup = function (sequelize){
//importing models
	module.exports.job = sequelize.import('Job',job);
	module.exports.department = sequelize.import('Department',department);
};


