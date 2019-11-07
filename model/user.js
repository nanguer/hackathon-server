var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  userType: {
    type: String
  },
  date: {
    type: Date
    //default: Date.now
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'teams'
    }
  ]
});

var User = mongoose.model('users', UserSchema);

module.exports = User;
