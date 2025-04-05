const pool = require('../config/dbConnection');
const bcrypt = require('bcrypt');

class UserRepository{

    static async login ({username, password}){
        Validation.username(username)
        Validation.password(password)

        const result = await pool.query('SELECT username,password,nombre FROM usuarios u INNER JOIN roles r ON r.id = u.rol_id WHERE username = $1 LIMIT 1', [username]);
        const user = result.rows[0];
        if(!user) throw new Error('Usuario no encontrado')

        const isValid = await bcrypt.compare(password, user.password)
        if(!isValid) throw new Error('Contraseña incorrecta')

        const {password: _, ...publicUser} = user

        return user    
    }
}

class Validation {
    static username(username) {
        if (typeof username !== 'string') throw new Error('El nombre de usuario debe contener texto válido.')
        if (username.length < 3) throw new Error('El nombre de usuario debe tener al menos 3 caracteres.')
        
    }

    static password(password) {
        if (typeof password !== 'string')  throw new Error('La contraseña debe contener texto válido.');
        if (password.length < 3) throw new Error('La contraseña debe tener al menos 3 caracteres.')
    }
}

module.exports = UserRepository;