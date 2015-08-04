var path = require('path');

//cargar el modelo ORM
var Sequelize = require('sequelize');

//usar BBDD SQlite:

var sequelize = new Sequelize(null, null, null,
					{
						dialect : "sqlite", storage : "quiz.sqlite"
					});

//importamos la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

//exportar definicion de la tabla Quiz
exports.Quiz = Quiz;

// sequelize.sync() crea e inicializa la tabla de preguntas en DB

sequelize.sync().success ( function() {
	Quiz.count().success( function (count) {
		if(count === 0){
			Quiz.create({ pregunta: "Capital de Italia",
						  respuesta: 'Roma'
						}
						)
			.success(function(){ console.log('Base de datos inicializada')});
		};
	});
});