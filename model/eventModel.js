var mongoose = require('mongoose');
var team = require('./teamModel');

var eventSchema = new mongoose.Schema({
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'teams'
    }
  ],
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  ],
  title: String,
  description: String,
  status: String,
  startDate: Date,
  endDate: Date,
  location: String,
  latLng: Object,
  host: String,
  evaluator: String
});

var EventDAO = mongoose.model('events', eventSchema);

module.exports = EventDAO;
