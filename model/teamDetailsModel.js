var mongoose = require('mongoose');

var teamDetailsSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  mobile: Number,
  participant: String
});

var TeamDAO = mongoose.model('teamdetail', teamDetailsSchema);

module.exports = TeamDAO;
