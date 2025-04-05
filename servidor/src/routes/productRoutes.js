const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
// const { checkPermission } = require('../middlewares/authMiddleware'); 

// Rutas para productos (cumpliendo UTN-03 y UTN-07)
router.post(
    '/createProduct',
    productController.createProductController
);

router.delete(
    '/deleteProduct/:codigo',
    productController.deleteProductController
);

router.get(
    '/getAllProducts',
    productController.getProductsController
);

router.get(
    '/getProductByCode/:codigo', 
    productController.getProductByCodeController
);

router.put(
    '/updateProduct/:codigo', 
    // checkPermission('Editar Productos'), // Solo rol "Registrador"
    productController.updateProductController
);

module.exports = router;