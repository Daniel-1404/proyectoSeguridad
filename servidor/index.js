require("dotenv").config(); // Para manejar las variables de entorno
//instancias a usar
const express = require("express");
const cors = require('cors'); 
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
//llamar rutas
const userRoutes = require('./src/routes/userRoutes');
const sessionRoutes = require('./src/routes/sessionRoutes');
const productRoutes = require('./src/routes/productRoutes');
const loginRoutes = require('./src/routes/loginRoutes');

//conexion a la bd
const pool = require("./src/config/dbConnection");




const app = express();
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  credentials: true
})); 
// Middleware para parsear el cuerpo de las peticiones
app.use(bodyParser.json());
app.use(cookieParser());
//Verificar session
const { verifyToken, authorizeRoles } = require('./src/middlewares/authMiddleware');


// Rutas; 
app.use('/api/session',verifyToken, sessionRoutes);
app.use('/api/users',verifyToken,authorizeRoles('SuperAdmin'), userRoutes);
app.use('/api/autentication', loginRoutes);
app.use('/api/products',verifyToken,authorizeRoles('Registrador'), productRoutes);


// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
