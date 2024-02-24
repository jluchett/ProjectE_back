//index.js -> server
const express = require('express');
const dotenv = require('dotenv');
const usuariosRouter = require('./src/routes/usuarios');

dotenv.config();

const app = express();

// Middleware para procesar cuerpos de solicitud JSON
app.use(express.json());

// Rutas
app.use('/usuarios', usuariosRouter);

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error del servidor');
});

// Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
