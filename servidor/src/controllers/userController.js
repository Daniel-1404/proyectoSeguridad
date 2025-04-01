const { body, validationResult,param } = require('express-validator');
const { userValidationRules } = require('../validations/userValidations');
const userModel = require('../models/userModel');


//crear usuario
const createUserController = [

  //validacion campos
  ...userValidationRules,
 
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

//borrar usuario
const deleteUserController = [
    // Validar y sanitizar el parámetro userId
    param('id')
        .isInt().withMessage('El ID debe ser un número entero')
        .toInt(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const userId = req.params.id;

        try {
            const deletedUser = await userModel.deleteUser(userId);
            res.status(200).json({ message: 'Usuario eliminado exitosamente', user: deletedUser });
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    }
];


// Obtener la lista de usuarios con roles y permisos
const getUsersController = async (req, res) => {
  try {
    const users = await userModel.getUsersWithRolesAndPermissions();
    res.status(200).json(users);  // Devuelve la lista de usuarios con roles y permisos
  } catch (err) {
    res.status(500).json({ error: 'Hubo un error al obtener los usuarios: ' + err.message });
  }
};

// Controlador para obtener el rol y los permisos asociados
const getRolePermissionsController = async (req, res) => {
  
  try {
    const roleWithPermissions = await userModel.getRoleWithPermissions();

    if (!roleWithPermissions) {
      return res.status(404).json({ error: 'Rol no encontrado o sin permisos' });
    }

    res.status(200).json(roleWithPermissions);  // Devuelve el rol y sus permisos
  } catch (err) {
    res.status(500).json({ error: 'Hubo un error al obtener el rol con permisos: ' + err.message });
  }
};

// obtener el usuario con su rol y permisos
const getUserForUpdateController = async (req, res) => {
  const userId = req.params.id;  // Obtener el ID 

  try {
    const userData = await userModel.getUserWithRoleAndPermissions(userId);

    if (!userData) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(userData);  // Devuelve los datos del usuario, rol y permisos
  } catch (err) {
    res.status(500).json({ error: 'Hubo un error al obtener los datos del usuario: ' + err.message });
  }
};


const modifyUserController = [
 
  body('username')
    .notEmpty().withMessage('El nombre de usuario es obligatorio')
    .isLength({ min: 3, max: 20 }).withMessage('Debe tener entre 3 y 20 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Solo puede contener letras, números y guiones bajos')
    .trim(),

  // Lógica para modificar el usuario
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params; // El ID del usuario que vamos a modificar
    const { username, rol_id } = req.body; // Los nuevos datos

    try {
      const updatedUser = await userModel.updateUser(id, username, rol_id);

      if (!updatedUser) {
        return res.status(404).json({
          message: 'Usuario no encontrado',
        });
      }

      res.status(200).json({
        message: 'Usuario actualizado con éxito',
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Hubo un error al modificar el usuario',
        error: error.message,
      });
    }
  },
];

//exportar modulos
module.exports = { createUserController,deleteUserController,getUsersController,getRolePermissionsController,getUserForUpdateController,modifyUserController };
