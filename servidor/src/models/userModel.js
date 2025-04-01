const bcrypt = require('bcrypt');
const pool = require('../config/dbConnection');  

//crear usuario
const createUser = async (username, password, rol_id) => {  
    try {
      // Cifrado de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Consultas parametrizadas
      const query = 'INSERT INTO usuarios (username, password, rol_id) VALUES ($1, $2, $3)';
      const values = [username, hashedPassword, rol_id];
  
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (err) {
      throw new Error('Error al crear usuario: ' + err.message);
    }
  };

 //borrar usuario
const deleteUser = async (userId) => {
    try {
        const query = 'DELETE FROM usuarios WHERE id = $1 RETURNING *';
        const values = [userId];

        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
            throw new Error('Usuario no encontrado');
        }

        return result.rows[0]; // Devuelve el usuario eliminado
    } catch (err) {
        throw new Error('Error al eliminar usuario: ' + err.message);
    }
};

// Función para obtener la lista de usuarios con sus roles y permisos
const getUsersWithRolesAndPermissions = async () => {
  try {
    const query = `
      SELECT 
      u.id AS usuario_id, 
      u.username AS nombre_usuario, 
      r.nombre AS rol,
      ARRAY_AGG(p.nombre) AS permisos
    FROM 
        Usuarios u
    JOIN 
        Roles r ON u.rol_id = r.id
    JOIN 
        Roles_Permisos rp ON r.id = rp.rol_id
    JOIN 
        Permisos p ON rp.permiso_id = p.id
    GROUP BY 
        u.id, u.username, r.nombre;`
    ;

    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    throw new Error('Error al obtener usuarios con roles y permisos: ' + err.message);
  }
};

// obtener el rol y los permisos asociados a ese rol
const getRoleWithPermissions = async () => {
  try {
    const query = `
      SELECT
      r.id as rol_id,
        r.nombre AS rol,
        ARRAY_AGG(p.nombre) AS permisos
      FROM 
        Roles r
      LEFT JOIN 
        Roles_Permisos rp ON r.id = rp.rol_id
      LEFT JOIN 
        Permisos p ON rp.permiso_id = p.id
      GROUP BY 
        r.id;
    `;
    const result = await pool.query(query);
    return result.rows;  
  } catch (err) {
    throw new Error('Error al obtener rol con permisos: ' + err.message);
  }
};


// obtener los datos de un usuario por su ID, incluyendo rol y permisos
const getUserWithRoleAndPermissions = async (userId) => {
  try {
    const query = `
      SELECT 
        u.username,
        r.nombre AS rol,
        ARRAY_AGG(p.nombre) AS permisos
      FROM 
        Usuarios u
      JOIN 
        Roles r ON u.rol_id = r.id
      LEFT JOIN 
        Roles_Permisos rp ON r.id = rp.rol_id
      LEFT JOIN 
        Permisos p ON rp.permiso_id = p.id
      WHERE 
        u.id = $1
      GROUP BY 
        u.id, r.id;
    `;
    const result = await pool.query(query, [userId]);
    return result.rows[0];  // Devolver los datos del usuario
  } catch (err) {
    throw new Error('Error al obtener usuario con rol y permisos: ' + err.message);
  }
};

const updateUser = async (id, username, rol_id) => {
  try {
    const result = await pool.query(
      'UPDATE usuarios SET username = $1, rol_id = $2 WHERE id = $3 RETURNING *',
      [username, rol_id, id]
    );

    // Verificar si no se encontró el usuario
    if (result.rows.length === 0) {
      return null; // No se encontró el usuario
    }

    return result.rows[0]; // Devuelve el usuario actualizado
  } catch (error) {
    throw new Error('Error al actualizar el usuario: ' + error.message);
  }
};

//exportar modulos
module.exports = { createUser,deleteUser,getUsersWithRolesAndPermissions,getRoleWithPermissions,getUserWithRoleAndPermissions,updateUser }; 


