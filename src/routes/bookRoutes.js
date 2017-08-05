var express = require('express');
var bookRouter = express.Router();
var sql = require('mssql');

var router = function (nav) {
    var books =[
        {
            title: 'The Undoing Project: A Friendship That Changed Our Minds',
            genre: 'non-fiction',
            author: 'Micheal Lewis',
            read: true
        },
        {
            title: 'Flash Boys: A Wall Street Revolt',
            genre: 'non-fiction',
            author: 'Micheal Lewis',
            read: true
        },
        {
            title: 'Boomerang: Travels in the New Third World',
            genre: 'non-fiction',
            author: 'Micheal Lewis',
            read: false
        },
        {
            title: 'The Big Short: Inside the Doomsday Machine',
            genre: 'non-fiction',
            author: 'Micheal Lewis',
            read: true
        },
        {
            title: 'Liar\'s Poker',
            genre: 'non-fiction',
            author: 'Micheal Lewis',
            read: true
        },
        {
            title: 'When Genius Failed: The Rise and Fall of Long-Term Capital Management',
            genre: 'non-fiction',
            author: 'Roger Lowenstein',
            read: true
        },
        {
            title: 'Home Game: An Accidental Guide to Fatherhood',
            genre: 'non-fiction',
            author: 'Micheal Lewis',
            read: true
        }
    ];

    bookRouter.route('/')
        .get(function (req, res) {
            var request = new sql.Request();
            request.query('select * from dbo.books',
                function (err, recordset) {
                 if(err){
                     console.log('ERROR: '+ err.message);
                 }else{
                     console.dir(recordset);
                     res.render('bookListView',
                         { title: 'Books',
                             nav: nav,
                             books: recordset
                         });
                 }
            });


        });

    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = req.params.id;
            res.render('bookView',
                {
                    title: 'Books',
                    nav: nav,
                    book: books[id]
                });
        });
    return bookRouter;
};

module.exports = router;