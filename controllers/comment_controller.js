
var models = require('../models/models.js');

exports.new = function(req,res){
	res.render('comments/new', { quizId: req.params.quizId, errors: [] });	
};

//POST /quizes/:quizId/comments
exports.create = function(req,res){
	var comment = models.Comment.build({
		texto: req.body.comment.texto,
		QuizId: req.params.quizId
	});
	
	comment
	.validate()
	.then(function(error){
		if(error){
			res.render('comments/new',{
				comment: comment, 
				quizid: req.params.quizId, 
				errors: error.errors
			});
		}else{
			comment
			.save()
			.then(function(){
				res.redirect('/quizes/' + req.params.quizId)
				})
		}
	}).catch(function(error){next(error)});
};