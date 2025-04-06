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


module.exports = verifyToken;