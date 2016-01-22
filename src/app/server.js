'use strict'
const express = require('express');
const swig = require('swig');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('./utils/logger');
//models
const model = require('./models');
//routers 
const jobRouter = require('./routers/jobRoute');
const sampleRouter = require('./routers/sampleRoute');
const logRouter = require('./routers/logRoute');
//Constants
const PORT = 8080;
//App
const app = express();
app.use(require('morgan')("combined", {
    "stream": logger.stream
}));
app.set('logger', logger);
//View template
app.set('views', path.join(__dirname, 'views'))
var swigTemplate = new swig.Swig();
app.engine('html', swigTemplate.renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use('/', jobRouter);
app.use('/sample', sampleRouter);
app.use('/log', logRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	//if (err.statusCode === 404) {
		var err = new Error('Not found');
		err.stats = 404;
		next(err);	
	//}
});
//development error handler
if ('development' === app.get('env')) {
    app.use(function(err, req, res, next) {
        logger.error(err.stack);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
    //production error handler
} else {
    app.use(function(err, req, res, next) {
        logger.error(err.stack);
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}
model.sequelize.sync().then(function() {
    app.listen(PORT);
    console.log('Running jp on http://localhost:' + PORT);
});