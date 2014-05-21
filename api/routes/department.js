'use strict';
var error = require('../libs/errors');
var modelDept = require('../models').department;

function getAllDepartment(req, res) {
	try {
		// finding all departement
		modelDept.findAll().success(function(depts) {
			if (depts.length == 0) {
				res.send(error.err_NoRecordFound);
			} else {
				res.send(depts);
			}
		});
	} catch (e) {
		error.errorlog(e);
	}
};


function getDepartment(req, res) {
	try {
		//finding a Department with id
		modelDept.find({
			where : {
				id : req.params.id
			}
		}).success(function(depts) {
			if (depts.length == 0) {
				res.send(error.err_NoRecordFound);
			} else {
				res.send(depts);
			}
		});
	} catch (e) {
		error.errorlog(e);
	}
};

var postDepartment = function(req, res) {
	try {
		// post a Department
		modelDept.build({
			title : req.body.title
		}).save().success(function(dept) {
			res.send(dept);
		}).fail(function(err) {
			error.errorlog(err);
			res.send(error.err_CouldNotSaveRecord);
		});
	} catch (e) {
		error.errorlog(e);
	}

};

var updateDepartment = function(req, res) {
	try {
		// update Department
		modelDept.update({
			title : req.body.title
		}, {
			id : req.params.id
		}).success(function(job) {
			modelDept.findOrCreate({
				title : req.body.title
			}).success(function(job) {
				if (!job) {
					res.send(error.err_NoRecordFound);
				} else {
					res.send(job);
				}
			});
		}).fail(function(err) {
			error.errorlog(err);
			res.send(error.err_CouldNotSaveRecord);
		});
	} catch (e) {
		error.errorlog(e);
		console.log(e);
	}
};

var deleteDepartment = function(req, res) {
	try {
		// delete a record from Department table
		modelDept.destroy({
			id : req.params.id
		}).success(function(job) {
			res.send({success: true});
		}).fail(function(err) {
			error.errorlog(err);
			res.send(error.err_CouldNotDeleteRecord);
		});
	} catch (e) {
		error.errorlog(err);
	}

};

exports.setup = function(app) {
	app.get('/api/department', getAllDepartment);
	app.get({url: '/api/department/:id', validation: {id:{isRequired: true,isInt: true}}}, getDepartment);
	app.post({url: '/api/department'}, postDepartment);
	app.put({url: '/api/department/:id', validation: {id:{isRequired: true,isInt: true},title:{isRequired: true }}}, updateDepartment);
	app.del({url: '/api/department/:id', validation: {id:{isRequired: true,isInt: true}}}, deleteDepartment);
};
