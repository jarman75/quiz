var models = require('../models/models.js');


//Autoload - factoriza el códig si ruta incluye : quizId
exports.load = function (req, res, next, quizId)  {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next (new Error('No existe quizId=' + quizId)); }
    }
    ).catch(function(error) { next(error);});
};

//Get /quizes
exports.index = function(req, res) {
  models.Quiz.findAll().then(
    function(quizes) {
      res.render('quizes/index', {quizes: quizes});
    }
  ).catch(function(error) { next(error);})
};

//Get /quizes/:id
exports.show = function(req, res) {
    res.render('quizes/show', { quiz: req.quiz});
};

//Get /quizes/:id/answer
exports.answer = function (req, res) {
  var resultado = 'Incorrecto';
    if (req.query.respuesta === req.quiz.respuesta) {
      resultado = "Correcto";
    }
    res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado});
};

//Get /quizes/new
exports.new = function (req, res) {
  var quiz = models.Quiz.build(  //crea objeto quiz
    {tema: "Tema", pregunta: "Pregunta", respuesta: "Respuesta"}
  );
  res.render('quizes/new', {quiz: quiz});
};

exports.create = function (req, res) {
  var quiz = models.Quiz.build ( req.body.quiz );

  //guarda en DB los campos pregunta y respuestas de quiz
  quiz.save( {fields: ["tema", "pregunta", "respuesta"]} ).then(function(){
    res.redirect('/quizes');
  })  //Redirección HTTP (URL relativo) lista de preguntas
};

exports.author = function (req, res) {
  res.render('author');
}

/*//Get /quizes/question
exports.question = function(req, res) {
  models.Quiz.findAll().success(function(quiz){
      res.render('quizes/question', {pregunta: quiz[0].pregunta});
  })
};

//Get /quizes/answer
exports.answer = function (req, res) {
  models.Quiz.findAll().success(function(quiz){
    if (req.query.respuesta === quiz[0].respuesta){
      res.render('quizes/answer', {respuesta: 'Correcto'});
    }else{
      res.render('quizes/answer', {respuesta: 'Incorrecto'});
    }
  })
}; */
