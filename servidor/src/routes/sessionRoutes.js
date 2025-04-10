const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');


// Ruta para sesion
router.get('/validation', sessionController.sessionValidation);
router.get('/logout', sessionController.closeSession);

//Exportar modulas de rutas
module.exports = router;
