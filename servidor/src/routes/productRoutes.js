const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');
// const { checkPermission } = require('../middlewares/authMiddleware'); 

// Rutas para productos (cumpliendo UTN-03 y UTN-07)
router.post(
    '/createProduct',
    verifyToken,
    authorizeRoles('Registrador'),
    productController.createProductController
);

router.delete(
    '/deleteProduct/:codigo',
    verifyToken,
    authorizeRoles('Registrador'),
    productController.deleteProductController
);

router.get(
    '/getAllProducts',
    verifyToken,
    authorizeRoles('Registrador', 'Auditor'), // Permitir a Auditor ver productos
    productController.getProductsController
);

router.get(
    '/getProductByCode/:codigo',
    verifyToken,
    authorizeRoles('Registrador'),
    productController.getProductByCodeController
);

router.put(
    '/updateProduct/:codigo',
    verifyToken,
    authorizeRoles('Registrador'),
    // checkPermission('Editar Productos'), // Solo rol "Registrador"
    productController.updateProductController
);



module.exports = router;