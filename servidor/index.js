require("dotenv").config(); // Para manejar las variables de entorno
//instancias a usar
const express = require("express");
const cors = require('cors'); 
const bodyParser = require("body-parser");
//llamar rutas
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
const loginRoutes = require('./src/routes/loginRoutes');

//conexion a la bd
const pool = require("./src/config/dbConnection");

const app = express();
app.use(cors()); 
// Middleware para parsear el cuerpo de las peticiones
app.use(bodyParser.json());


// Rutas; 
app.use('/api/users', userRoutes);
app.use('/api/autentication', loginRoutes);
app.use('/api/products', productRoutes);


// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
