var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var app = express();
var config = require('./config/config.json');

// Engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.use(logger(config.serverConfig[process.argv[2]].log));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(session({
  key: 'user_sid',
	secret: 'po$eid0n',
	resave: true,
	saveUninitialized: true,
  cookie: {
      maxAge: 900000
  }
}));
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');        
  }
  next();
});

// ==================== Routes ==================== //

var rotaPrincipal = require('./routes/principal'); 
var rotaSobre = require('./routes/sobre'); 
var rotaLogin = require('./routes/login'); 
var rotaPainel = require('./routes/painel'); 
var rotaAvaliar = require('./routes/avaliar'); 
//var rotaBusca = require('./routes/busca'); 
//var rotaFormulario = require('./routes/formulario'); 
//var rotaEdicao = require('./routes/formularioEdicao'); 

app.use('/', rotaPrincipal);
app.use('/sobre', rotaSobre);
app.use('/login', rotaLogin);
app.use('/painel', rotaPainel);
app.use('/avaliar', rotaAvaliar);
//app.use('/form', rotaFormulario);
//app.use('/editform', rotaEdicao);

// ================================================= //

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
