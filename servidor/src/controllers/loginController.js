const UserRepository = require('../repository/userRepository');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const loginAutentication = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserRepository.login({username, password});
        const token = jwt.sign(
            { username: user.username, name: user.nombre }, 
            process.env.JWT_SECRET, 
            { 
                expiresIn: '1h' 
            });

        res
            .cookie('access_token', token, {
                httpOnly: true, // Solo accesible desde el servidor
                secure: process.env.NODE_ENV === 'production', // Solo enviar en HTTPS en producción
                sameSite: 'strict', // Protege contra ataques CSRF
                maxAge: 1000 * 60 * 60 // 1 hora de validez
            })
            .status(200).json({user, token}); 
    } catch (err) {
        res.status(401).json({ error: 'Hubo un error al iniciar sesion' });
    }
};

module.exports = {
    loginAutentication
};


