var TeamDetailDAO = require('../model/teamDetailsModel');
const TeamDAO = require('../model/teamModel');
var express = require('express');
var router = express.Router();

const validateTeamDetail = require('../validation/teamDetail');

router.post('/create', function(req, res) {
  const { errors, isValid } = validateTeamDetail(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    var newTeam = new TeamDetailDAO();
    newTeam.firstName = req.body.firstName;
    newTeam.lastName = req.body.lastName;
    newTeam.email = req.body.email;
    newTeam.mobile = req.body.mobile;
    newTeam.participant = req.body.participant;

    newTeam.save(function(err, team) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json(team);
      }
    });
  }
});
router.get('/getTeamMembers/:id', function(req, res) {
  TeamDetailDAO.find({ participant: req.params.id }, function(err, event) {
    if (err) res.send(err);
    else {
      console.log(event);
      res.json(event);
    }
  });
});

router.get('/:id', function(req, res) {
  TeamDAO.find({ _id: req.params.id }, function(err, team) {
    if (err) {
      console.log(err);
    } else {
      res.json(team);
    }
  });
});

module.exports = router;
