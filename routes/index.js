var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
// opcion controlador para creditos autor :
// var authorController = require('../controllers/author_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* Página de entrada (home page) */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' ,  errors: [] });
});

//Autoload de comandos con :quizId
router.param('quizId', quizController.load); //autoload :quizid

//Definición de las rutas de session
router.get('/login', sessionController.new);      //Cargar Formulario de login
router.post('/login', sessionController.create);  //Crear la sesión de usuario
router.get('/logout', sessionController.destroy); //Destruir la sesión. DELETE

//Definición de la route /quizes
router.get('/quizes',                       quizController.index);
router.get('/quizes/:quizId(\\d+)',          quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

//Definición de route /quizes para la edicion de preguntas
router.get('/quizes/new', sessionController.loginRequired, quizController.new);
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);

//Definición de la route comments en /quizes
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

//Definición de la route author
router.get('/author', function(req, res) {
    res.render('author', { title: 'Quiz' ,  errors: [] });
  });
//opcion controlador para creditos autor :
//router.get('/author', authorController.author);

module.exports = router;
