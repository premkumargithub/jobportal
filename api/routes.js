// app.get('/job/:name', function(req, res, next) {
// // since v1.3.0: only select some attributes and rename one
// Job.find({
// where : {
// title : req.params.name
// }
// }).success(function(result) {
// console.log(result);
// res.send(result);
// });
//
// next();
// });
//
// app.post('/job', function(req, res, next) {
// // since v1.3.0: only select some attributes and rename one
// Job.build({
// title : req.body.title
// }).save().success(function(job) {
// res.send(job);
// });
//
// next();
// });
//
// app.put('/job/:id', function(req, res, next) {
// // since v1.3.0: only select some attributes and rename one
// Job.update({
// title : req.body.title
// }, {
// id : req.params.id
// }).success(function(job) {
// Job.findOrCreate({
// title : req.body.title
// }).success(function(job) {
// res.send(job);
// });
// });
//
// next();
// });
//
// app.del('/job/:id', function(req, res, next) {
// // since v1.3.0: only select some attributes and rename one
// Job.destroy({
// id : req.params.id
// }).success(function(job) {
// Job.findAll().success(function(job) {
// res.send(job);
// });
// });
//
// next();
// });


