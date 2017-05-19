var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
var database = require('./config.js')
//Need to enter username and password for your database
var connString = database ;

var app = module.exports = express();

app.use(bodyParser.json());
app.use(cors());

var db = massive.connectSync({connectionString : connString});
//create tables
db.user_create_seed(()=>{});
db.vehicle_create_seed(()=>{});
app.set('db',db);
var controller = require('./controller');

app.get('/api/users', function(req,res){
  controller.getUsers(req,res);
});
app.get('/api/vehicles', function(req,res){
  controller.getVehicles(req,res);
});

app.post('/api/users', function(req,res){
  controller.postNewUser(req,res);
})
app.post('/api/vehicles', function(req,res){
  controller.postNewVehicle(req,res);
})

app.get('/api/user/:userId/vehiclecount', function(req,res){
  controller.getCountofUsersVehicles(req,res);
});
app.get('/api/user/:userId/vehicle', function(req,res){
  controller.getUserByIDVehicleCount(req,res);
});
app.get('/api/vehicle', function(req,res){
  controller.getVehicleByUserEmail(req,res);
});
app.get('/api/newervehiclesbyyear', function(req,res){
  controller.getNewVehicles(req,res);
});

app.put('/api/vehicle/:vehicleId/user/:userId', function(req,res){
  controller.updateOwner(req,res);
});

app.delete('/api/user/:userId/vehicle/:vehicleId', function(req,res){
  controller.removeOwner(req,res);
});
app.delete('/api/vehicle/:vehicleId', function(req,res){
  controller.removeVehicle(req,res);
});


app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})
