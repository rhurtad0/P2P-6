
//interaccion de las peticiones del router
//get question

exports.question = function(req, res){
	res.render('quizes/question', { pregunta: 'Capital de Italia' });
};

//get answer

exports.answer = function(req, res){
	if(req.query.respuesta === 'Roma'){
		res.render('quizes/answer', { respuesta: "Correcto !"});
	}else{
		res.render('quizes/answer', { respuesta: "Incorrecto"});
	}
};

exports.author = function(req, res){
	res.render('author',{ autor: "Rodrigo Hurtado", edad: 27, pais:"Colombia"});
};