const express = require('express');
const app = express();
const dotenv = require('dotenv');

// Configuración del puerto
dotenv.config();
const PORT = process.env.PORT || 3000;

// Rutas
app.get('/', (req, res) => {
    res.send('¡Servidor de backend en funcionamiento cvzxvvc!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
