var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();
var port = process.env.PORT || 5000;

/*
var sql = require('mssql');

var config = {
    user: 'username',
    password: 'password',
    server: 'localhost.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'Books',
    options: {
        encrypt: true // Use this if you're on Windows Azure true
    }
};

sql.connect(config, function (err) {
    console.log(err);
});
*/


var nav = [
    {Link: '/Books', Text: 'Book'},
    { Link: '/Authors', Text:'Author'}
    ];

var authorRouter = express.Router();
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter= require('./src/routes/adminRoutes')(nav);
var authRouter= require('./src/routes/authRoutes')(nav);

//middleware section
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: 'library',
    resave: true,
    saveUninitialized: true
}));

require('./src/config/passport')(app);

app.set('views', './src/views');

app.set('view engine', 'ejs');

authorRouter.route('/')
    .get(function (req, res) {
        res.render('authors',
            {title: 'Authors',
                nav: nav});
    });

authorRouter.route('/single')
    .get(function (req, res) {
        res.send('Hello single author!');
    });

app.use('/Books', bookRouter);

app.use('/Authors', authorRouter);

app.use('/Admin', adminRouter);

app.use('/Auth', authRouter);

app.get('/', function (req, res) {
    res.render('index', {title: 'Index',
        nav: nav});
});

app.listen(port, function (err) {
    if(err){
        console.log('ERROR: '+err.message);
    }else {
        console.log('running server on port ' + port);
    }
});