const bcrypt = require('bcrypt');
const pool = require('../config/dbConnection');  

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
  
module.exports = { createUser }; 


