const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Ruta para login
router.post('/login', loginController.loginAutentication);

//Exportar modulas de rutas
module.exports = router;