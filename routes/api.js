var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/form', function(req, res, next) {
  try {
    const content = fs.readFileSync('./.form.json', 'utf8');
    res.json(JSON.parse(content));
  } catch (err) {
    res.render('error', { message: err.message, error: err });
  }
});
  
router.put('/form', function(req, res, next) {
  const content = JSON.stringify(req.body);
  fs.writeFile('./.form.json', content, err => {
    if (err) {
      res.render('error', { message: err.message, error: err });
    } else {
      res.json({ok: true});
    }
  });
});

router.get('/form-data', function(req, res, next) {
  try {
    const content = fs.readFileSync('./.form-data.json', 'utf8');
    res.json(JSON.parse(content));
  } catch (err) {
    res.render('error', { message: err.message, error: err });
  }
});

router.put('/form-data', function(req, res, next) {
  const content = JSON.stringify(req.body);
  fs.writeFile('./.form-data.json', content, err => {
    if (err) {
      res.render('error', { message: err.message, error: err });
    } else {
      res.json({ok: true});
    }
  });
});

module.exports = router;
