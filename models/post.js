var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bodyParser = require('body-parser');


var PostSchema   = new Schema({
    title: String,
    description: String,
    photoName: String,
    photoUrl: String

});

module.exports = mongoose.model('Post', PostSchema);
