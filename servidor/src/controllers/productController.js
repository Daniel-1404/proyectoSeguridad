const { body, validationResult, param } = require('express-validator');
const { productValidationRules } = require('../validations/productValidations');
const xss = require('xss');  // Importar el sanitizador XSS
const productModel = require('../models/productModel');


// Crear producto
const createProductController = [
    ...productValidationRules,
    
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { codigo, nombre, descripcion, cantidad, precio } = req.body;

        try {
            const newProduct = await productModel.createProduct(codigo, nombre, descripcion, cantidad, precio);
            res.status(201).json({ 
                message: 'Producto creado exitosamente', 
                product: newProduct 
            });
        } catch (err) {
            res.status(500).json({ 
                error: 'Hubo un error al crear el producto: ' + err.message 
            });
        }
    }
];

// Eliminar producto
const deleteProductController = [
    param('codigo')
        .isAlphanumeric().withMessage('El código debe ser alfanumérico'),
    
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { codigo } = req.params;

        try {
            const deletedProduct = await productModel.deleteProduct(codigo);
            res.status(200).json({ 
                message: 'Producto eliminado exitosamente', 
                product: deletedProduct 
            });
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
];

// Obtener todos los productos
const getProductsController = async (req, res) => {
    try {
        const products = await productModel.getAllProducts();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ 
            error: 'Hubo un error al obtener los productos: ' + err.message 
        });
    }
};

// Obtener producto por código
const getProductByCodeController = [
    param('codigo')
        .isAlphanumeric().withMessage('El código debe ser alfanumérico'),
    
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { codigo } = req.params;

        try {
            const product = await productModel.getProductByCode(codigo);
            if (!product) {
                return res.status(404).json({ 
                    message: 'Producto no encontrado' 
                });
            }
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json({ 
                error: 'Hubo un error al obtener el producto: ' + err.message 
            });
        }
    }
];

// Actualizar producto
const updateProductController = [
    param('codigo').isAlphanumeric().withMessage('El código debe ser alfanumérico'),
    body('nombre')
        .isLength({ min: 3 }).withMessage('Nombre debe tener al menos 3 caracteres')
        .customSanitizer(value => xss(value))  // Sanitiza para evitar XSS
        .trim(),
    body('cantidad').isInt({ min: 0 }).withMessage('Cantidad debe ser entero positivo'),
    body('precio').isFloat({ min: 0 }).withMessage('Precio debe ser número positivo'),
    body('descripcion')
        .optional()
        .customSanitizer(value => xss(value))  // Sanitiza para evitar XSS
        .trim(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { codigo } = req.params;
            const { nombre, descripcion, cantidad, precio } = req.body;

            // Cambiar la forma en que se pasan los datos, asegurándonos de que estén sanitizados
            const updatedProduct = await productModel.updateProduct(codigo, {
                nombre,
                descripcion: descripcion || null,
                cantidad: parseInt(cantidad),
                precio: parseFloat(precio)
            });

            if (!updatedProduct) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            res.json({ 
                success: true,
                product: updatedProduct 
            });

        } catch (err) {
            console.error('Error en updateProductController:', err);
            res.status(500).json({ 
                success: false,
                error: err.message 
            });
        }
    }
];

module.exports = { 
    createProductController, 
    deleteProductController, 
    getProductsController, 
    getProductByCodeController,
    updateProductController 
};