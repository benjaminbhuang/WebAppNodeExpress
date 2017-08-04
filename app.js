var express = require('express');
var bookRouter = require('./src/routes/bookRoutes');

var app = express();

var port = process.env.PORT || 5000;
var authorRouter = express.Router();

var nav = [{Link: '/Books', Text: 'Books'}, { Link: '/Authors', Text:'Authors'}];

app.use(express.static('public'));
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