var TeamDAO = require('../model/teamModel');
const EventDAO = require('../model/eventModel');
var TeamDetailDAO = require('../model/teamDetailsModel');
var UserDAO = require('../model/user');
var express = require('express');
var router = express.Router();

const validateEventRegister = require('../validation/eventRegister');

router.get('/', function(req, res) {
  console.log('getting all events... ');
  EventDAO.find({}, function(err, events) {
    if (err) res.send(err);
    else {
      res.json(events);
    }
  });
});

router.get('/getEventsByParticipantId/:id', function(req, res) {
  console.log('gettting event by _id... ' + req.params.id);
  // getEventsbyUserId(req.params.id);
  TeamDAO.find({ participant: req.params.id }, (err, event) => {
    if (err) {
      res.send(err);
    }
  })
    .populate('event')
    .exec((err, event) => {
      if (err) {
        res.send(err);
      } else {
        res.json(event);
      }
    });
});

router.post('/register', async function(req, res) {
  const { errors, isValid } = validateEventRegister(req.body);
  if (!isValid) {
    console.log(errors);
    return res.status(400).json(errors);
  } else {
    let team = await TeamDAO.findOne({ teamName: req.body.teamName });
    if (team) {
      return res.status(400).json({
        teamName: 'A team with that name already exists'
      });
    }

    try {
      let event = await EventDAO.findOne({ _id: req.body.event });
      let user = await UserDAO.findOne({ _id: req.body.participant });
      var newTeam = new TeamDAO();
      newTeam.event = req.body.event;
      newTeam.teamName = req.body.teamName;
      newTeam.teamSize = req.body.teamSize;
      newTeam.ideaSubject = req.body.ideaSubject;
      newTeam.ideaSummary = req.body.ideaSummary;
      newTeam.participant = req.body.participant;

      newTeam.save(function(err, team) {
        event.teams.push(team._id);
        event.participants.push(user._id);
        event.save();
        user.teams.push(team._id);
        user.save();
        res.status(200).json(team);
      });
    } catch (e) {
      console.log('Error: ' + e);
    }
  }
});

// router.post('/register', function(req, res) {
//   const { errors, isValid } = validateEventRegister(req.body);

//   if (!isValid) {
//     return res.status(400).json(errors);
//   }
//   try {
//     TeamDAO.findOne({ teamName: req.body.teamName }).then(team => {
//       if (team) {
//         return res.status(400).json({
//           teamName: 'A team with that name already exists'
//         });
//       } else {
//         var newTeam = new TeamDAO();
//         newTeam.event = req.body.event;
//         newTeam.teamName = req.body.teamName;
//         newTeam.teamSize = req.body.teamSize;
//         newTeam.ideaSubject = req.body.ideaSubject;
//         newTeam.ideaSummary = req.body.ideaSummary;
//         newTeam.participant = req.body.participant;

//         newTeam.save(async function(err, team) {
//           if (err) res.send(err);
//           else {
//             try {
//               const event = await EventDAO.findOne({ _id: req.body.event });
//               event.teams.push(team._id);
//               event.save();
//             } catch (e) {
//               console.log(e);
//             } finally {
//               res.json(team);
//             }
//           }
//         });
//       }
//     });
//   } catch (e) {
//     console.log(e);
//   } finally {
//     UserDAO.findOne({ _id: req.body.participant }, (err, user) => {
//       if (err) {
//         console.log(err);
//       } else {
//         user.teams.push(team._id);
//         console.log('user saved: ' + user);
//       }
//     });
//   }
// });

router.put('/:id', function(req, res) {
  console.log('updating issue by _id... ' + req.params.id);
  console.log('updating issue by _id... ' + req.body.description);
  console.log('updating issue by _id... ' + req.body.status);
  console.log('updating issue by _id... ' + req.body.startDate);
  console.log('updating issue by _id... ' + req.body.enddDate);
  console.log('updating issue by _id... ' + req.body.host);
  console.log('updating issue by _id... ' + req.body.evaluator);
  EventDAO.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        description: req.body.description,
        status: req.body.status,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        location: req.body.location,
        host: req.body.host,
        evaluator: req.body.evaluator
      }
    },
    { new: true },
    function(err, event) {
      if (err) res.send(err);
      else {
        res.json(event);
      }
    }
  );
});

router.delete('/:id', function(req, res) {
  console.log('deleting issue by _id... ' + req.params.id);
  EventDAO.findOneAndRemove({ _id: req.params.id }, function(err, event) {
    if (err) res.send(err);
    else {
      res.json(event);
    }
  });
});
router.get('/getHosts/:host', function(req, res) {
  console.log('getting all hosts... ');
  UserDAO.find({ host: req.params.host }, function(err, hosts) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(hosts);
    }
  });
});
router.get('/getEvaluators/:evaluator', function(req, res) {
  console.log('getting all Evaluators... ');
  UserDAO.find({ evaluator: req.params.evaluator }, function(err, evaluators) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(evaluators);
    }
  });
});

router.get('/userdeatils/:id', function(req, res) {
  console.log('updating issue by _id... ' + req.params.id);
  console.log('updating issue by _id... ' + UserDAO.collection.name);

  EventDAO.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'host',
        foreignField: '_id',
        as: 'user'
      }
    },
    {
      $match: {
        host: req.params.id
      }
    }
    //   ,
    //   {
    //    $project:{
    //       host_name:"$user.firstname"
    //    }
    //   }
  ]).exec(function(err, event) {
    if (err) res.send(err);
    else {
      res.json(event);
    }
  });
});
router.get('/eventDetails/:id', async function(req, res) {
  console.log('Getting Event Details _id... ' + req.params.id);
  let eventDetails = await EventDAO.findById({ _id: req.params.id });
  let hostDetails = await UserDAO.findOne({ _id: eventDetails.host });
  let evaluatorDetails = await UserDAO.findOne({ _id: eventDetails.evaluator });
  const event1 = {
    ...eventDetails._doc,
    hostDetails: hostDetails,
    evaluatorDetails: evaluatorDetails
  };
  res.json(event1);
});

router.get('/getEvents/:id', function(req, res) {
  console.log('gettting events by userid... ' + req.params.id);
  EventDAO.find({ userid: req.params.id }, function(err, events) {
    if (err) res.send(err);
    else {
      res.json(events);
    }
  });
});
router.get('/getHostEvents/:id', function(req, res) {
  console.log('gettting get host events by userid... ' + req.params.id);
  EventDAO.find({ host: req.params.id }, function(err, events) {
    if (err) res.send(err);
    else {
      res.json(events);
    }
  });
});

module.exports = router;
