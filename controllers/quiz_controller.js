var models = require('../models/models.js');


//Get /quizes/:id
exports.show = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz) {
    res.render('quizes/show', {quiz: quiz});
  })
};

//Get /quizes/:id/answer
exports.answer = function (req, res){
  models.Quiz.find(req.params.quizId).then(function(quiz){
    if (req.query.respuesta === quiz.respuesta) {
      res.render('quizes/answer', {quiz:quiz, respuesta: 'Correcto'});
    }else{
      res.render('quizes/answer', {quiz:quiz, respuesta: 'Incorrecto'});
    }
  })
};

//Get /quizes
exports.index = function(req, res) {
  models.Quiz.findAll().then(function(quizes){
    res.render('quizes/index.ejs', {quizes: quizes});
  })
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
