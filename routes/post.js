
var express = require('express');
var router = express.Router();
var Post     = require('../models/post');
var bodyParser = require('body-parser');

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});



// this section is for checking post id incase if I need particular post
  router.get('/check', function(req, res) {
          Post.find(function(err, bears) {
              if (err)
                  res.send(err);
                  res.json(bears);
          });
      });




router.route('/')

    // .post(function(req, res) {
    //
    //     var post = new Post();      // create a new instance of the Bear model
    //     post.title = req.body.title;  // set the bears name (comes from the request)
    //     post.description = req.body.description;
    //       // save the bear and check for errors
    //       post.save(function(err) {
    //           if (err)
    //               res.send(err);
    //               res.json({ message: 'posted on post page!' });
    //         var newPost = new post({
    //           		 title: title,
    //                description: description
    //           		});
    //     });
    // })

    .post(function(req, res){
    	var title = req.body.title;
    	var description = req.body.description;



    	var errors = req.validationErrors();

    	if(errors){
    		res.render('post',{
    			errors:errors
    		});
    	} else {
    		var newPost = new Post({
    			title: title,
    			description: description
    		});
        newPost.save(function(err) {
                 if (err)
                     res.send(err);
                     res.json({ message: 'posted on post page!' });
                   });
    };
  })

    .get(function(req, res) {

          Post.find({}, function (err, docs) {
            if(err) res.json(err);
            else res.render('post', {title: docs});  // throw all post display on post.handlebars
    });
});


router.route('/:posts_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Post.findById(req.params.posts_id, function(err, docs) {
            if (err) res.json(err);
               else res.render('post', {title: docs});

        });
    })

    .put(function(req, res) {

        // use our bear model to find the bear we want
        Post.findById(req.params.posts_id, function(err, post) {

            if (err)
                res.send(err);

                post.description = req.body.description;
                post.title = req.body.title;  // update the bears info

            // save the bear
                  post.save(function(err) {
                      if (err)
                          res.send(err);

                res.json({ message: 'Bear updated!' });
            });
          });
        })

        .delete(function(req, res) {
    Post.remove({
        _id: req.params.posts_id
    }, function(err, post) {
        if (err)
            res.send(err);

            res.json({ message: 'Successfully deleted' });
    });
});



module.exports = router;
