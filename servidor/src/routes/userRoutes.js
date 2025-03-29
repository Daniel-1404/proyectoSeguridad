const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para crear un usuario
router.post('/createUser', userController.createUserController);

module.exports = router;
