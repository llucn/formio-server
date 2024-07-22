var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/res/:name', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'HEAD, GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  const name = req.params.name;
  const path = './.res/' + name;
  const exists = fs.existsSync(path);

  if (exists) {
    try {
      const content = fs.readFileSync(path, 'utf8');
      res.json(JSON.parse(content));
    } catch (err) {
      next(createError(500));
    }
  } else {
    next(createError(404));
  }
});

router.put('/res/:name', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'HEAD, GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  const name = req.params.name;
  const path = './.res/' + name;
  const content = JSON.stringify(req.body);

  try {
    const exists = fs.existsSync('./.res');
    if (!exists) {
      fs.mkdirSync('./.res');
    }

    fs.writeFileSync(path, content);
    res.json({ ok: true });
  } catch (err) {
    next(createError(500));
  }
});

router.delete('/res/:name', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'HEAD, GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  const name = req.params.name;
  const path = './.res/' + name;
  const exists = fs.existsSync(path);
  
  try {
    if (exists) {
      fs.rmSync(path);
    }
    res.json({ok: true});
  } catch (err) {
    next(createError(500));
  }
});

router.options('/res/:name', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'HEAD, GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  res.status(200).send();
});

module.exports = router;
