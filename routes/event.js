var EventDAO = require('../model/eventModel');
var UserDAO = require('../model/user');
var TeamDAO = require('../model/teamModel');
var express = require('express');
var router = express.Router();

const validateAddEvent = require('../validation/addEvent');
const validateScore = require('../validation/score');

router.get('/', function(req, res) {
  console.log('getting all events... ');
  EventDAO.find({}, function(err, events) {
    if (err) res.send(err);
    else {
      res.json(events);
    }
  });
});

router.get('/edit/:id', function(req, res) {
  console.log('gettting event by _id... ' + req.params.id);
  EventDAO.findOne({ _id: req.params.id }, function(err, event) {
    if (err) res.send(err);
    else {
      res.json(event);
    }
  });
});

router.post('/create', function(req, res) {
  const { errors, isValid } = validateAddEvent(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    var newEvent = new EventDAO();
    newEvent.title = req.body.title;
    newEvent.description = req.body.description;
    newEvent.status = req.body.status;
    newEvent.startDate = req.body.startDate;
    newEvent.endDate = req.body.endDate;
    newEvent.location = req.body.location;
    newEvent.host = req.body.host;
    newEvent.evaluator = req.body.evaluator;
    newEvent.latLng = req.body.latLng;

    console.log('Adding New Event.....');
    newEvent.save(function(err, event) {
      if (err) res.send(err);
      else {
        res.json(event);
      }
    });
  }
});

router.put('/:id', function(req, res) {
  console.log(req.body);
  const { errors, isValid } = validateAddEvent(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    EventDAO.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          status: req.body.status,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          location: req.body.location,
          host: req.body.host,
          latLng: req.body.latLng,
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
  }
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

router.get('/:id/ideas', function(req, res) {
  EventDAO.findOne({ _id: req.params.id })
    .populate('teams')
    .exec((err, event) => {
      if (err) {
        console.log(err);
      } else {
        res.json(event);
      }
    });
});

router.get('/getEvents/:id', async function(req, res) {
  //console.log('gettting events by userid... ' + req.params.id);
  const eventsArr = await EventDAO.find({ _id: req.params.id });
  res.json(eventsArr);
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

router.get('/getEvaluatorsEvents/:id', function(req, res) {
  console.log('gettting get evaluators events by userid... ' + req.params.id);
  EventDAO.find({ evaluator: req.params.id }, function(err, events) {
    if (err) res.send(err);
    else {
      res.json(events);
    }
  });
});

router.post('/idea/evaluate/:id', async function(req, res) {
  const { errors, isValid } = validateScore(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    const idea = await TeamDAO.findOne({ _id: req.params.id });
    idea.score = req.body.score;
    idea.evaluated = true;
    idea.save();
    res.json(idea);
  }
});

module.exports = router;

// db.events.aggregate([
//      {
//      "$lookup":{
//      "from":"users",
//      "localField":"host",
//      "foreignField":"userid",
//     "as":"userdetails"
//      }
//      },{ $match: { "host": 184 }}])
