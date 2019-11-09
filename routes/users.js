var UserDAO = require('../model/user');
var express = require('express');
var router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

router.post('/create', function(req, res) {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  UserDAO.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: 'Email already exists'
      });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });
      const newUser = new UserDAO({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        date: req.body.doj,
        password: req.body.password,
        userType: req.body.userType,
        avatar
      });

      bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error('There was an error', err);
        else {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) console.error('There was an error', err);
            else {
              newUser.password = hash;
              newUser.save().then(user => {
                res.json(user);
              });
            }
          });
        }
      });
    }
  });
});

router.post('/fbLogin', (req, res) => {
  const avatar = req.body.picture;
  const doj = Date.now();
  const newUser = new UserDAO({
    firstName: req.body.name,
    email: req.body.email,
    date: doj,
    userType: 'participant',
    avatar
  });
  newUser.save().then(user => {
    console.log(user);
    res.json(user);
  });
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  UserDAO.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.firstName,
          type: user.userType,
          teams: user.teams,
          avatar: user.avatar
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

router.get('/', function(req, res) {
  console.log('getting all hosts... ');
  UserDAO.find({}, function(err, events) {
    if (err) res.send(err);
    else {
      console.log(events);
      res.json(events);
    }
  });
});

router.get('/edit/:id', function(req, res) {
  console.log('gettting event by _id... ');
  UserDAO.findOne({ _id: req.params.id }, function(err, event) {
    if (err) res.send(err);
    else {
      console.log(event);
      res.json(event);
    }
  });
});

router.put('/:id', function(req, res) {
  console.log('updating host by _id... ' + req.params.id);
  console.log('updating host by _id... ' + req.body.firstName);
  console.log('updating host by _id... ' + req.body.lastName);
  console.log('updating host by _id... ' + req.body.email);
  console.log('updating host by _id... ' + req.body.doj);
  UserDAO.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        firstname: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        doj: req.body.doj,
        userType: req.body.userType
      }
    },
    { new: true },
    function(err, event) {
      if (err) res.send(err);
      else {
        console.log(event);
        res.json(event);
      }
    }
  );
});

router.delete('/:id', function(req, res) {
  console.log('deleting issue by _id... ' + req.params.id);
  UserDAO.findOneAndRemove({ _id: req.params.id }, function(err, event) {
    if (err) res.send(err);
    else {
      console.log(event);
      res.json(event);
    }
  });
});

router.get('/getHosts', function(req, res) {
  console.log('getting all hosts... ');
  UserDAO.find({ userType: 'HH' }, function(err, hosts) {
    if (err) res.send(err);
    else {
      console.log(hosts);
      res.json(hosts);
    }
  });
});
router.get('/getEvaluators', function(req, res) {
  console.log('getting all Evaluators... ');
  UserDAO.find({ userType: 'HE' }, function(err, hosts) {
    if (err) res.send(err);
    else {
      console.log(hosts);
      res.json(hosts);
    }
  });
});
router.get('/getUser/:id', function(req, res) {
  UserDAO.findOne({ _id: req.params.id }, function(err, user) {
    if (err) res.send(err);
    else {
      res.json(user);
    }
  });
});

module.exports = router;
