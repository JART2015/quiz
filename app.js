//     importar paquetes con  middlewares
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');


// Importar enrutadores
var routes = require('./routes/index');
//var users = require('./routes/users');

//    Crear aplicacion
var app = express();

// instalar y configurar el generador de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());// instalar middelwares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(partials());// instalar la factoria express-partial en app

//Instalar enrutadores: Asociar rutas a sus gestores.

app.use('/', routes);

// resto de rutas: genera error 404 de HTTP
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Gestion de errores

// Gestion de errores en fase desarrollo

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err //print err
        });
    });
}
// Gestion de errores en fase produccion
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Exportar app para comando de arranque
module.exports = app;
