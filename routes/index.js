var express = require('express');
var router = express.Router();
const path = require('path');
const puppeteer = require('puppeteer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express!' });
});

router.get('/pdf0', function(req, res, next) {
	console.log(__dirname); // C:\test\formio-test\formio-server\routes
  res.render('index', { title: '222777' });
  // res.pdfFromHTML({
  //     filename: 'generated.pdf',
  //     html: path.resolve(__dirname, './template.html'),
  //     options: {}
  // });
});

router.get('/pdf1', function(req, res, next) {
  (async () => {
	  try {
		var dir = path.resolve(__dirname, '../public');
		var file = path.resolve(dir, '123.pdf');
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		//await page.goto('http://localhost:3000/test-submision.html', {waitUntil: 'networkidle2'});
		await page.goto('http://fanbintest-env.eba-qqzqkq7d.us-east-1.elasticbeanstalk.com/test-submision.html', {waitUntil: 'networkidle2'});
		await page.pdf({path: file, format: 'A4'});
		await browser.close();
		res.redirect('/123.pdf');
	  } catch(error) {
		res.render('index', { title: error });
	  }

    //res.render('index', { title: 'download' });
  })();
});

router.get('/pdf2', function(req, res, next) {
  (async () => {
    //console.log(__dirname);
    //console.log(path.resolve(__dirname, './template.html'));
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('file:///C:/test/formio-test/formio-server/public/test-submision.html', {waitUntil: 'networkidle2'});
    await page.pdf({path: 'C:/test/formio-test/formio-server/public/test-submision.pdf', format: 'A4'});
    await browser.close();

    res.render('index', { title: 'download' });
  })();
});

module.exports = router;
