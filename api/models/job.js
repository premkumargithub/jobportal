var Sequelize = require('sequelize');

exports.job = function(sequelize, DataTypes) {
	var job = sequelize.define("job", {
		title : {
			type : DataTypes.STRING
		},
		department : {
			type : DataTypes.BIGINT
		},
		jobtype : {
			type : DataTypes.BIGINT
		},
		startPublishing : {
			type : DataTypes.DATE
		},
		stopPublishing : {
			type : DataTypes.DATE
		},
		createdAt : {
			type : DataTypes.DATE
		},
		updatedAt : {
			type : DataTypes.DATE
		}
	});
	return job;
};
