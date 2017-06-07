const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const index = require('./routes/index');
const users = require('./routes/users');
const config = require('./config/database');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const MongoStore = connectMongo(session);
//connect to database
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected', ()=> {
  console.log('connected to database '+ config.database);
});

mongoose.connection.on('error', (err)=> {
    console.log('Database error '+ err);
});

const app = express();

app.use(session({
    secret: 'talzaid cat',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
    }
}))

/* https://en.wikipedia.org/wiki/Cross-origin_resource_sharing */
app.use(cors());

//Body Parser Middleware
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);



// catch 404 and forward to error handler
app.use((req, res, next)=>{
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
