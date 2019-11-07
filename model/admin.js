var mongoose = require('mongoose');

var AdminSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }
});

var Admin = mongoose.model('admins', AdminSchema);

module.exports = Admin;
