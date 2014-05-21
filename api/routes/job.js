'use strict';
var restify = require('restify');
var _ = require('underscore');
var util = require('util');
var async = require('async');
var error = require('../libs/errors');
var Job = require('../models').job;

function getAllJob(req, res) {
	try {
		// finding a job with name
		Job.findAll().success(function(jobs) {
			if (jobs.length == 0) {
				res.send(error.err_NoRecordFound);
			} else {
				res.send(jobs);
			}
		});
	} catch (e) {
		error.errorlog(e);
	}
};

function getJob(req, res) {
	try {
		// finding a job with name
		Job.find({
			where : {
				id : req.params.id
			}
		}).success(function(jobs) {
			if (!jobs) {
				res.send(error.err_NoRecordFound);
			} else {
				res.send(jobs);
			}
		});
	} catch (e) {
		error.errorlog(e);
	}
};

var postJob = function(req, res) {
	console.log('in post job before try');
	try {
		async.waterfall([
				function(cb) {
					var validation= [{"title":{"isRequired": true}},{"department":{"isRequired": true,isInt: true}}];
					console.log(validation[0].title.isRequired);
					console.log('in posjob');
					error.checkForkey(validation, req.body, cb);
				}, function(cb) {
					console.log('in save job');
					var jobdata = {};
					jobdata.title = req.body.title;
					jobdata.department = req.body.department;
					jobdata.jobtype = req.body.jobtype;
					jobdata.startPublishing = req.body.startPublishing;
					jobdata.stoptPublishing = req.body.stopPublishing;

					// post a job
					Job.build(jobdata).save().success(function(job) {
						cb(null);
					}).fail(function(err) {
						error.errorlog(err);
						cb(error.err_CouldNotSaveRecord);
					});

				}

		], function(err) {
			res.send(err || {success : true});

		});

	} catch (e) {
		error.errorlog(e);
	}

};

var updateJob = function(req, res) {
	try {
		// update job
		Job.update({
			title : req.body.title
		}, {
			id : req.params.id
		}).success(function(job) {
			Job.findOrCreate({
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

var deleteJob = function(req, res) {
	try {
		// delete a record from job table
		Job.destroy({
			id : req.params.id
		}).success(function(job) {
			Job.findAll().success(function(job) {
				if (job.length == 0) {
					res.send(error.err_NoRecordFound);
				} else {
					res.send(job);
				}
			});
		}).fail(function(err) {
			error.errorlog(err);
			res.send(error.err_CouldNotDeleteRecord);
		});
	} catch (e) {
		error.errorlog(err);
	}

};

exports.setup = function(app) {
	app.get('/api/job', getAllJob);
	app.get({
		url : '/api/job/:id',
		validation : {
			id : {
				isRequired : true,
				isInt : true
			}
		}
	}, getJob);

	app.post('/api/job', postJob);

	app.put({
		url : '/api/job/:id',
		validation : {
			id : {
				isRequired : true,
				isInt : true
			},
			title : {
				isRequired : true
			}
		}
	}, updateJob);
	app.del({
		url : '/api/job/:id',
		validation : {
			id : {
				isRequired : true,
				isInt : true
			}
		}
	}, deleteJob);
};
