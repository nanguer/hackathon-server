var mongoose = require('mongoose');
var Admin = require('./model/admin');
const bcrypt = require('bcryptjs');

module.exports = generateAdmin = () => {
  Admin.findOne({
    userName: 'admin'
  }).then(admin => {
    if (!admin) {
      const newAdmin = new Admin({
        userName: 'admin',
        password: 'hackathonadmin'
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error('There was an error', err);
        else {
          bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) console.error('There was an error', err);
            else {
              newAdmin.password = hash;
              newAdmin.save().then(admin => {
                console.log(admin);
              });
            }
          });
        }
      });
    }
  });
};
