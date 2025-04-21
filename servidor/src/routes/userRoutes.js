const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Ruta para usuario
router.post('/createUser', verifyToken,
    authorizeRoles('SuperAdmin'), userController.createUserController);

router.delete('/deleteUser/:id', verifyToken,
    authorizeRoles('SuperAdmin'), userController.deleteUserController);

router.get('/getAllUsers', verifyToken,
    authorizeRoles('SuperAdmin', 'Auditor'),userController.getUsersController);

router.get('/getRols', verifyToken,
    authorizeRoles('SuperAdmin'), userController.getRolePermissionsController);

router.get('/getUser/:id', verifyToken,
    authorizeRoles('SuperAdmin'), userController.getUserForUpdateController);

router.put('/updateUser/:id', verifyToken,
    authorizeRoles('SuperAdmin'), userController.modifyUserController);
//exportar modulas de rutas




module.exports = router;
