var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;



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

    adminRouter.route('/addBooks')
        .get(function (req, res) {
            var url ='mongodb://localhost:27017/libraryApp';
            mongodb.connect(url,function (err, db) {
               var collection =  db.collection('books');
               collection.insertMany(books, function (err, results) {
                   res.send(results);
                   db.close();
               });
            });
        });

    return adminRouter;
};

module.exports = router;