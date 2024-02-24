// middleware/auth.js

const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; 

function auth(req, res, next) {
  // Obtener el token del encabezado de autorización
  const token = req.header('Authorization');
  
  // Verificar si no hay token
  if (!token) {
    return res.status(401).json({ msg: 'No hay token, autorización denegada' });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, secretKey);

    // Añadir el usuario desde el token decodificado
    req.user = decoded.usuario;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token no válido' });
  }
}

module.exports = auth;
