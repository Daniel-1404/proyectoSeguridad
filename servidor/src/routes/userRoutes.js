const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Ruta para usuario
router.post('/createUser', userController.createUserController);
router.delete('/deleteUser/:id', userController.deleteUserController);
router.get('/getAllUsers',
    verifyToken,
    authorizeRoles('SuperAdmin', 'Auditor'), // Permitir a Auditor ver usuarios
    userController.getUsersController
);
router.get('/getRols', userController.getRolePermissionsController);
router.get('/getUser/:id', userController.getUserForUpdateController);
router.put('/updateUser/:id', userController.modifyUserController);
//exportar modulas de rutas




module.exports = router;
