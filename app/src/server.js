var express = require('express');
var app = express();
var root = process.cwd();
var path = require('path');
var auth_token;
//var configure = require('config-node')();
//var cors = require('cors');

//app.use(cors());

//your routes here


app.get('/', function (req, res) {
    res.sendFile('/ui/login.html', {root});
});

app.get('/login', function (req, res) {
    res.sendFile('/ui/login.html', {root});
});


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/*
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'login.html'));
});*/

app.get('/home', function (req, res) {
    res.sendFile('/ui/home.html', {root});
});

app.get('/moderator', function (req, res) {
    res.sendFile('/ui/moderator.html', {root});
});

app.get('/CSDomain/:domainid', function (req, res) {
    res.sendFile('/ui/csDomain.html', {root});
});

/*app.get('/:domainid', function (req, res) {
    res.sendFile('/ui/csDomain.html', {root});
});*/

app.get('/company-details', function (req, res) {
	
    res.sendFile('/ui/companyDetails.html', {root});
});

app.get('/company-details/:icici', function (req, res) {
    res.sendFile('/ui/companyDetails.html', {root});
});

app.get('/company', function (req, res) {
    res.sendFile('/ui/compLogo.html', {root});
});

app.get('/addQuiz', function (req, res) {
    res.sendFile('/ui/addQuiz.html', {root});
});

app.get('/addCSDomain', function (req, res) {
	
    res.sendFile('/ui/addCSDomain.html', {root});
});

app.get('/addCompany', function (req, res) {
    res.sendFile('/ui/addCompany.html', {root});
});

app.get('/addSoftSkill', function (req, res) {
    res.sendFile('/ui/addSoftSkill.html', {root});
});

app.get('/softSkill/:skillid', function (req, res) {
    res.sendFile('/ui/softSkill.html', {root});
});

app.get('/quiz', function (req, res) {
    res.sendFile('/ui/quiz.html', {root});
});

app.get('/aptitude', function (req, res) {
    res.sendFile('/ui/apti.html', {root});
});

app.get('/ui/loginPage.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'loginPage.js'));
});

app.get('/ui/home.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'home.js'));
});

app.get('/ui/auth.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'auth.js'));
});

app.get('/ui/compLogo.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'compLogo.js'));
});

app.get('/ui/moderator.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'moderator.js'));
});

app.get('/ui/csDomain.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'csDomain.js'));
});

app.get('/ui/sidebar.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'sidebar.js'));
});

app.get('/ui/addQuiz.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'addQuiz.js'));
});

app.get('/ui/addCSDomain.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'addCSDomain.js'));
});

app.get('/ui/addCompany.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'addCompany.js'));
});

app.get('/ui/addSoftSkill.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'addSoftSkill.js'));
});

app.get('/ui/softSkill.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'softSkill.js'));
});

app.get('/ui/companyDetails.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'companyDetails.js'));
});

app.get('/ui/1.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', '1.png'));
});

app.get('/scripts/js.cookie.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'scripts', 'js.cookie.js'));
});

app.get('/ui/navbar.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'navbar.css'));
});

app.get('/ui/homeStyle.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'homeStyle.css'));
});

app.get('/ui/indexstyle.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'indexstyle.css'));
});

app.get('/ui/LoginStyle.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'LoginStyle.css'));
});


app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});


