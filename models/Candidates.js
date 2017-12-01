var mongoose = require('mongoose');
var CandidatesSchema = new mongoose.Schema({
  name: String,
  votes: {type: Number, default: 0},
});
CandidatesSchema.methods.vote = function(cb) {
  this.votes += 1;
  this.save(cb);
};

mongoose.model('Candidates', CandidatesSchema);

