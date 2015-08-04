var models = require('../models/models');

//interaccion de las peticiones del router
//get question

exports.show = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz) {
		res.render('quizes/show', { quiz: quiz });
	})	
};

//get /quizes
exports.index = function (req, res){
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index', { quizes : quizes});
	})
};

//get /quizes/:id/answer

exports.answer = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		if(req.query.respuesta === quiz.respuesta){
			res.render('quizes/answer', { quiz : quiz, respuesta: 'Correcto !'});
		}else{
			res.render('quizes/answer', { quiz : quiz, respuesta: 'Incorrecto !'});
		}
	})
};

exports.author = function(req, res){
	res.render('author',{ autor: "Rodrigo Hurtado", edad: 27, pais:"Colombia"});
};