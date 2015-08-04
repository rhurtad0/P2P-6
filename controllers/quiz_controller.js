var models = require('../models/models.js');

//interaccion de las peticiones del router
//get question

exports.question = function(req, res){
	models.Quiz.findAll().success(function(quiz) {
		res.render('quizes/question', { pregunta: quiz[0].pregunta });
	})	
};

//get answer

exports.answer = function(req, res){
	models.Quiz.findAll().success(function(quiz){
		if(req.query.respuesta === quiz[0].respuesta){
			res.render('quizes/answer', {respuesta: 'Correcto !'});
		}else{
			res.render('quizes/answer', {respuesta: 'Incorrecto !'});
		}
	})
};

exports.author = function(req, res){
	res.render('author',{ autor: "Rodrigo Hurtado", edad: 27, pais:"Colombia"});
};