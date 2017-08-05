var express = require('express');
var bookRouter = express.Router();
var sql = require('mssql');

var router = function (nav) {
    bookRouter.route('/')
        .get(function (req, res) {
            var request = new sql.Request();
            request.query('select * from dbo.books',
                function (err, recordset) {
                 if(err){
                     console.log('ERROR: '+ err.message);
                 }else{
                     res.render('bookListView',
                         { title: 'Books',
                             nav: nav,
                             books: recordset['recordset'] //solution: https://stackoverflow.com/questions/43644456/node-query-mssql-and-the-recordset-looks-to-be-nested-and-the-output-is-odd
                         });
                 }
            });


        });

    bookRouter.route('/:id')
        .all(function (req, res, next) {
            var id = req.params.id;
            var ps = new sql.PreparedStatement();
            ps.input('id', sql.Int);
            ps.prepare('select * from dbo.books where id =@id',
                function (err) {
                    if(err){
                        console.log('ERROR: '+err.message);
                    }else {
                        ps.execute({id: req.params.id},
                            function (err, recordset) {
                                if(recordset['recordset'].length === 0){
                                    res.status(404).send('Not Found');
                                }else {
                                    req.book = recordset['recordset'][0];
                                    next();
                                }
                            });
                    }
                });

        })
        .get(function (req, res) {
            res.render('bookView',
                {
                    title: 'Books',
                    nav: nav,
                    book: req.book
                });
        });
    return bookRouter;
};

module.exports = router;