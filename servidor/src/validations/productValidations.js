const { body, param } = require('express-validator');
const xss = require('xss');  // Usamos 'xss' para sanitizar campos individualmente

// Reglas de validación para productos
const productValidationRules = [
    body('codigo')
        .notEmpty().withMessage('El código es obligatorio')
        .isAlphanumeric().withMessage('El código debe contener solo letras y números')
        .isLength({ min: 3, max: 50 }).withMessage('El código debe tener entre 3 y 50 caracteres')
        .customSanitizer(value => xss(value))  // Sanitiza para evitar XSS
        .trim(),

    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3, max: 255 }).withMessage('El nombre debe tener entre 3 y 255 caracteres')
        .customSanitizer(value => xss(value))  // Sanitiza para evitar XSS
        .trim(),

    body('descripcion')
        .optional()
        .customSanitizer(value => xss(value))  // Sanitiza para evitar XSS
        .trim(),

    body('cantidad')
        .notEmpty().withMessage('La cantidad es obligatoria')
        .isInt({ min: 0 }).withMessage('La cantidad debe ser un número entero positivo'),

    body('precio')
        .notEmpty().withMessage('El precio es obligatorio')
        .isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo')
];

// Validación para parámetros de ruta (ej: :codigo)
const productParamValidation = [
    param('codigo')
        .isAlphanumeric().withMessage('El código debe ser alfanumérico')
        .isLength({ min: 3, max: 50 }).withMessage('El código debe tener entre 3 y 50 caracteres')
        .customSanitizer(value => xss(value))  // Sanitiza para evitar XSS
];

module.exports = { 
    productValidationRules,
    productParamValidation 
};