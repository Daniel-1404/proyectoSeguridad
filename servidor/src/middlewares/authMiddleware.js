require('dotenv').config();
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    req.session = {user : null}

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.session.user = data
    }catch {
        return res.status(401).json({ error: 'No hay sesión activa' });
    }
    next();   
}


// Middleware para verificar el rol del usuario
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const user = req.session.user;
        const rol = user.name;
        if (rol != user.name || !user || !allowedRoles.includes(user.name)) {
            return res.status(403).json({ error: 'No tienes permiso para acceder a esta ruta' });
        }
        next();
    };
};

module.exports = {
    verifyToken,
    authorizeRoles
};