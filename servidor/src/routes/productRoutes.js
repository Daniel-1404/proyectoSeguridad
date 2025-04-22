const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Rutas para productos
// Crear producto
router.post(
    '/createProduct',
    verifyToken,
    authorizeRoles('Registrador'),
    productController.createProductController
);

// Eliminar producto
router.delete(
    '/deleteProduct/:codigo',
    verifyToken,
    authorizeRoles('Registrador'),
    productController.deleteProductController
);

// Obtener todos los productos
router.get(
    '/getAllProducts',
    verifyToken,
    authorizeRoles('Registrador', 'Auditor'),
    productController.getProductsController
);

// Obtener producto por código
router.get(
    '/getProductByCode/:codigo',
    verifyToken,
    authorizeRoles('Registrador'),
    productController.getProductByCodeController
);

// Actualizar producto
router.put(
    '/updateProduct/:codigo',
    verifyToken,
    authorizeRoles('Registrador'),
    productController.updateProductController
);



module.exports = router;