var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'events'
  },
  teamName: String,
  teamSize: String,
  ideaSubject: String,
  ideaSummary: String,
  participant: String,
  evaluated: {
    type: Boolean,
    default: false
  },
  score: String
});

var TeamDAO = mongoose.model('teams', teamSchema);

module.exports = TeamDAO;
