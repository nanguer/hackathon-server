var Admin = require('../model/admin');
var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateAdminLogin = require('../validation/admin');

//Create admin account if none present

router.post('/login', (req, res) => {
  const { errors, isValid } = validateAdminLogin(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const userName = req.body.userName;
  const password = req.body.password;

  Admin.findOne({ userName }).then(admin => {
    if (!admin) {
      errors.userName = 'Admin username not found';
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, admin.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: admin.id,
          userName: admin.userName
        };
        jwt.sign(
          payload,
          'secret',
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) console.error('There is some error in token', err);
            else {
              res.json({
                success: true,
                token: `Bearer ${token}`
              });
            }
          }
        );
      } else {
        errors.password = 'Incorrect Password';
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;
