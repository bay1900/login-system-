
var express = require('express');
var router = express.Router();
var Post     = require('../models/post');
var bodyParser = require('body-parser');




router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});




// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
  router.get('/', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});


router.route('/posts')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var post = new Post();      // create a new instance of the Bear model
        post.title = req.body.title;  // set the bears name (comes from the request)

        // save the bear and check for errors
        post.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });

    })

    .get(function(req, res) {
    Post.find(function(err, bears) {
        if (err)
            res.send(err);

        res.json(bears);
    });
});


module.exports = router;
