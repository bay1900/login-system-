var express = require('express');
var router = express.Router();
var Post     = require('../models/post');
var bodyParser = require('body-parser');
var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'duwfymg9e',
  api_key: '817171557419776',
  api_secret: '8CiFGmeNrSyCWJU6iPU92dHjCZc'
});

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

var photo = "http://images.fonearena.com/blog/wp-content/uploads/2013/11/lenovo-p780-photo-gallery-2.jpg";
    router.route('/')
    .post( function(req, res){

      var img_url = '';
      var img_id = '';
      var img_name = '';

      var title = req.body.title;
      var description = req.body.description;
      var photo = req.file;
      var errors = req.validationErrors();


      cloudinary.uploader.upload("http://images.fonearena.com/blog/wp-content/uploads/2013/11/lenovo-p780-photo-gallery-2.jpg", function(result) {
        console.log("Cloudinary after upload");
        // if (err){ console.log(err);}
        console.log(result);
        // console.log(result.public_id + result.url);
        img_url = result.url;
        img_id = result.public_id;
        img_name = result.original_filename;

        console.log("Cloudinary worked: " + img_url);

        if(errors){
          res.render('post',{
            errors:errors
          });
        } else {
          var newPost = new Post({
            title: title,
            description: description,
            photoName: img_name,
            photoUrl: img_url
          });

          newPost.save(function(err) {
           if (err)
               res.send(err);
               res.json({ message: 'posted on post page!' });

            });
          };


      });
    	// var title = req.body.title;
    	// var description = req.body.description;
      // var photo = req.file;
    	// var errors = req.validationErrors();

      // console.log(img_url);

    	// if(errors){
    	// 	res.render('post',{
    	// 		errors:errors
    	// 	});
    	// } else {
    	// 	var newPost = new Post({
    	// 		title: title,
    	// 		description: description
      //     // photoName: req.files.originalname,
      //     // photoUrl: req.files.path
    	// 	});
      //
      //   newPost.save(function(err) {
      //    if (err)
      //        res.send(err);
      //        res.json({ message: 'posted on post page!' });
      //
      //     });
      //   };
    })
    .get(function(req, res) {

          Post.find({}, function (err, docs) {
            if(err) res.json(err);
            else res.render('post', {title: docs});  // throw all post display on post.handlebars
    });
});


router.route('/:posts_id')

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
                              res.redirect("post");
                            });
                        });



module.exports = router;


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
