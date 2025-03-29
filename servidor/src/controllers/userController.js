const { body, validationResult } = require('express-validator');
const userModel = require('../models/userModel');

const createUserController = [
  // Validaciones
  body('username').notEmpty().withMessage('El nombre de usuario es obligatorio'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
  body('rol_id').isInt().withMessage('El rol debe ser un número entero'),

  // Lógica para crear el usuario
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, rol_id } = req.body;

    try {
      const newUser = await userModel.createUser(username, password, rol_id);
      res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
    } catch (err) {
      res.status(500).json({ error: 'Hubo un error al crear el usuario ' + err.message });
    }
  }
];

module.exports = { createUserController };
