var createError = require('http-errors');
var express = require('express');
var router = express.Router();

router.get('/builder/:name', function(req, res, next) {
  const name = req.params.name;
  res.render('form-builder', { name: name });
});

router.get('/submission/:name', function(req, res, next) {
  const name = req.params.name;
  res.render('form-submission', { name: name });
});

router.get('/view/:name', function(req, res, next) {
  const name = req.params.name;
  res.render('form-view', { name: name });
});

module.exports = router;
