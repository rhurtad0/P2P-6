var models = require('../models/models');

//Autoload - factoriza el codigo si la ruta incluye  :quizId
exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(
		function(quiz){
			if(quiz){
				req.quiz = quiz;
				next();
			}else{
				next(new Error ('No existe quizId = '+ quizId));
			}
		}
	).catch( function(error){next(error); });
};

//interaccion de las peticiones del router

//get /quizes
exports.index = function (req, res){
	if(req.query.search){
		var search = "%"+req.query.search+"%";
		models.Quiz.findAll({where: ["lower(pregunta) like lower(?)", search.replace(/(\s)+/g, '%')],
							order : [ ['pregunta', 'DESC' ] ]
		}).then( function(quizes){
			console.log(quizes);
			res.render('quizes/index', { quizes : quizes });
		});
	}else{
		models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index', { quizes : quizes});
		}
		).catch(function(error){ next(error);})
	}
};

//get question

exports.show = function(req, res){
	res.render('quizes/show', { quiz: req.quiz });
};

//get /quizes/:id/answer

exports.answer = function(req, res){
	var resultado = 'Incorrecto';
		if(req.query.respuesta === req.quiz.respuesta){
			resultado = "Correcto";
		}
		res.render('quizes/answer', { quiz : req.quiz , respuesta : resultado});
};

exports.author = function(req, res){
	res.render('author',{ autor: "Rodrigo Hurtado", edad: 27, pais:"Colombia"});
};