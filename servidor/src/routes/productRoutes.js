const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, authorizeRoles } = require('../middlewares/authMiddleware');

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
    authorizeRoles('SuperAdmin', 'Registrador', 'Auditor'), 
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
    productController.updateProductController
);



module.exports = router;