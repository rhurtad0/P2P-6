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
			res.render('quizes/index', { quizes : quizes , errors:[]});
		});
	}else{
		models.Quiz.findAll().then(function(quizes){
			res.render('quizes/index', { quizes : quizes, errors : [] });
		}
		).catch(function(error){ next(error);})
	}
};

//get question

exports.show = function(req, res){
	res.render('quizes/show', { quiz: req.quiz , errors:[] });
};

//get /quizes/:id/answer

exports.answer = function(req, res){
	var resultado = 'Incorrecto';
		if(req.query.respuesta === req.quiz.respuesta){
			resultado = "Correcto";
		}
		res.render('quizes/answer', { quiz : req.quiz , respuesta : resultado, errors:[] });
};

exports.author = function(req, res){
	res.render('author',{ autor: "Rodrigo Hurtado", edad: 27, pais:"Colombia", errors: []});
};

//get new
exports.new = function(req, res){
	var selected = [];
	var quiz = models.Quiz.build(
				{pregunta:"Pregunta", respuesta:"Respuesta"}
			);

	res.render('quizes/new', {quiz: quiz, errors:[], selected: selected});	
}

//post /quizes/create

exports.create = function(req, res){
	var quiz = models.Quiz.build( req.body.quiz );

	quiz.validate().then(function(err){
		if(err){
			res.render('quizes/new', {quiz : quiz, errors : err.errors});
		}else{
			//almacena en la base de datos los campos pregunta y respuesta
			quiz.save({fields: ["pregunta", "respuesta", "tema"]}).then( function(){
				res.redirect('/quizes');
			})
		}
	});

};

// get quizes/:quizId/edit

exports.edit = function(req, res){
	var quiz = req.quiz; //autoload de instacia de quiz
	var selected = [];
	 switch(quiz.tema) {
		case 'otro':
			var selected1='selected';
			selected1 = (selected1||'');
			selected[0]=selected1;
			break;
		case 'humanidades':
			var selected2='selected';
			selected2 = (selected2||'');
			selected[1]=selected2;
			break;
		case 'ocio':
			var selected3='selected';
			selected3 = (selected3||'');
			selected[2]=selected3;
			break;
		case 'ciencia':
			var selected4='selected';
			selected4 = (selected4||'');
			selected[3]=selected4;
			break;
		case 'tecnologia':
			var selected5='selected';
			selected5 = (selected5||'');
			selected[4]=selected5;
			break;
		}

	res.render('quizes/edit', {quiz : quiz, errors : [], selected: selected});
};

//put quizId

exports.update = function( req, res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;
	req.quiz.tema =		req.body.quiz.tema;

	req.quiz.validate().then(function(err){
		if( err){
			res.render('quizes/edit', { quiz: req.quiz, errors: err.errors});
		}else{
			req.quiz.save( { fields: ["pregunta", "respuesta", "tema"]}).then( function(){
				res.redirect('/quizes');
			});
		}
	}
	);
};

//delete /quizes/:quizId(\\d+)

exports.destroy = function(req, res){
	req.quiz.destroy().then( function() {
		res.redirect('/quizes');
	}).catch(function(error){
		next(error); 
	});
};
