const { body } = require('express-validator');

const userValidationRules = [
  body('username')
    .notEmpty().withMessage('El nombre de usuario es obligatorio')
    .isLength({ min: 3, max: 20 }).withMessage('Debe tener entre 3 y 20 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Solo puede contener letras, números y guiones bajos')
    .trim(),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 8 }).withMessage('Debe tener al menos 8 caracteres')
    .matches(/[A-Z]/).withMessage('Debe contener al menos una mayúscula')
    .matches(/[a-z]/).withMessage('Debe contener al menos una minúscula')
    .matches(/[0-9]/).withMessage('Debe contener al menos un número')
    .matches(/^[a-zA-Z0-9]+$/).withMessage('La contraseña solo puede contener letras y números'), // Solo letras y números, sin caracteres especiales

  body('rol_id')
    .isInt().withMessage('El rol debe ser un número entero')
    .toInt()
];

module.exports = { userValidationRules };

