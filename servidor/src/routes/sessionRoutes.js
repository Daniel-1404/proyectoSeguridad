const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');


// Ruta para sesion
router.get('/validation', sessionController.sessionValidation);

//Exportar modulas de rutas
module.exports = router;
