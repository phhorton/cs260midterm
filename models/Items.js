var mongoose = require('mongoose');
var ItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  ordered: {type: Number, default: 0},
  pict: String
});
ItemSchema.methods.order = function(cb) {
  this.ordered += 1;
  this.save(cb);
};

mongoose.model('Items', ItemSchema);

