'use strict';
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var Genre = require('./models/genre');
var Book = require('./models/book');

// to parse body for POST requests
app.use(bodyParser.json());

// Connect to Mongoose
mongoose.connect("mongodb://localhost/bookstore");
var db = mongoose.connection;

app.get('/', function (req , res){
    res.send("Please use /api/posts");
});

// ============= genres ================

app.get('/api/genres', function(req, res){
    Genre.getGenres(function(err, genres){
        if(err){
            throw err;
        }
        res.status(200).json(genres);
    });
});

app.get('/api/genres/:_id', function(req, res){
    Genre.getGenreById(req.params._id, function(err, genre){
        if(err){
            throw err;
        }
        res.status(200).json(genre);
    });
});

app.post('/api/genres', function(req, res){
    var genre = req.body;
    Genre.addGenre(genre, function(err, genre){
        if(err){
            throw err;
        }
        res.status(201).json(genre);
    });
});

app.put('/api/genres/:_id', function(req, res){
    var id = req.params._id;
    var genre = req.body;
    Genre.updateGenre(id, genre, {}, function(err, genre){
        if(err){
            throw err;
        }
        res.status(202).json(genre);
    });
});

app.delete('/api/genres/:_id', function(req, res){
    var id = req.params._id;
    Genre.removeGenre(id, function(err, genre){
        if(err){
            throw err;
        }
        res.status(204).json(genre);
    });
});

// ============= books ================

app.get('/api/books', function(req, res){
    Book.getBooks(function(err, books){
        if(err){
            throw err;
        }
        res.status(200).json(books);
    });
});

app.get('/api/books/:_id', function(req, res){
    Book.getBookById(req.params._id, function(err, book){
        if(err){
            throw err;
        }
        res.status(200).json(book);
    });
});

app.post('/api/books', function(req, res){
    var book = req.body;
    Book.addBook(book, function(err, book){
        if(err){
            throw err;
        }
        res.status(201).json(book);
    });
});

app.put('/api/books/:_id', function(req, res){
    var id = req.params._id;
    var book = req.body;
    Book.updateBook(id, book, {}, function(err, book){
        if(err){
            throw err;
        }
        res.status(202).json(book);
    });
});

app.delete('/api/books/:_id', function(req, res){
    var id = req.params._id;
    Book.removeBook(id, function(err, book){
        if(err){
            throw err;
        }
        res.status(204).json(book);
    });
});
// ===================================

app.listen(3000);
console.log("Running on port 3000...");
