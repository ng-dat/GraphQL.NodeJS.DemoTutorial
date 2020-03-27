var express = require('express');

var models = require("./models/models.js");
var userController = require("./controllers/userController.js");
var roleController = require("./controllers/roleController.js");

const startServer = async () => {  
	//Create app
	const app = express();

	//Create router
	const router = require('express').Router();

	//Register apis
	registerAPIs(app, router);		
	
	app.use('/api/v1', router);

	app.listen({ port: 4000 }, () =>
		console.log(`🚀 Server ready`)
	);
};

var registerAPIs = (app, router) => {
	app.get('/', function(req, res) {
		res.status(200).send('Hello world');
	});

	router.route('/users')
		.post(userController.createUser)
		.get(userController.getAllUsers);
	router.route('/users/:userId')
		.get(userController.getOneUser)
		.put(userController.updateUser)
		.delete(userController.deleteUser);
	router.param('userId', userController.getByIdUser);

	router.route('/roles')
		.get(roleController.getAllRoles);
	router.route('/roles/:roleId')
		.get(roleController.getOneRole);
	router.param('roleId', roleController.getByIdRole);
}
startServer();