var app = require('./index');
const db = app.get('db')
module.exports = {

  getUsers: function(req, res){
    db.getAllUsers(function(err, users){
        res.status(200).json(users);
    })
  },
  getVehicles: function(req, res) {
    db.getAllVehicles(function(err,vehicles){
      res.status(200).json(vehicles);
    })
  },

  postNewUser: function(req, res){
    const newUser = req.body,
    firstname =newUser.firstname,
    lastname =newUser.lastname,
    email =newUser.email;

    db.createNewUser([firstname, lastname, email],function(err,userAdded){
      res.status(200).json(newUser);
    })
  },
  postNewVehicle: function(req, res){
    const newVehicle = req.body,
    make = newVehicle.make,
    model = newVehicle.model,
    year = newVehicle.year,
    ownerId = newVehicle.ownerId;
    db.createNewVehicle([make, model, year, ownerId],function(err,vehicleAdded){
      res.status(200).json(newVehicle);
    })
  },
  getCountofUsersVehicles: function(req,res){
    const userId = req.params.userId;
    db.countUserVehicles([userId], function(err,count){
      res.status(200).json(count);
    })
  },
  getUserByIDVehicleCount: function(req,res) {
    const userId = req.params.userId;
    db.getVehiclesByUserId([userId], function(err,results){
      res.status(200).json(results);
    })
  },
  getVehicleByUserEmail: function(req, res){
    const email = req.query.UserEmail;
    let userFirstLetters = req.query.userFirstStart;

    if(email){
      db.getVehiclesByEmail([email], function(err,results){
        return res.status(200).json(results);
      })
    } else if (userFirstLetters){
      userFirstLetters = userFirstLetters+'%'
      db.getVehiclesBySomeFirst([userFirstLetters], function(err,results){
        return res.status(200).json(results);
      })
    }
  },
  getNewVehicles: function(req,res){
    db.getNewVehicles(function(err,results){
      res.status(200).json(results);
    })
  },
  updateOwner: function(req,res){
    const newUserId = req.params.userId;
    const vehicleId = req.params.vehicleId;
    db.updateOwner([newUserId,vehicleId], function(err,results){
      res.status(200).json(results);
    })
  },
  removeOwner: function(req,res){
    const newUserId = req.params.userId;
    const vehicleId = req.params.vehicleId;
    db.removeOwner([newUserId,vehicleId], function(err,results){
      res.status(200).json(results);
    })
  },
  removeVehicle: function(req,res){
    const vehicleId = req.params.vehicleId;
    db.removeVehicle([vehicleId], function(err,results){
      res.status(200).json(results);
    })
  }
}
