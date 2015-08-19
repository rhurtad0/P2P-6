var express = require('express');
var router = express.Router();

var quizController = require("../controllers/quiz_controller");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// Autoload de comando con :quizId
router.param('quizId', quizController.load);
//Peticion de la question
router.get('/quizes',			quizController.index);
router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/author', quizController.author);
router.get('/quizes/new', 		quizController.new);
router.post('/quizes/create',	quizController.create);

module.exports = router;
