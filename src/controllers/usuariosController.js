// usuariosController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../database/db');
const secretKey = process.env.JWT_SECRET;

// Función para registrar un nuevo usuario
async function registro(req, res) {
    try {
        const { nombre, email, contraseña, direccion, ciudad, pais, codigo_postal, rol } = req.body;

        // Verificar si el usuario ya existe en la base de datos
        const usuarioExistente = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (usuarioExistente.rows.length > 0) {
            return res.status(400).json({ msg: 'El usuario ya está registrado' });
        }

        // Hash de la contraseña
        const salt = await bcrypt.genSalt(10);
        const contraseñaHash = await bcrypt.hash(contraseña, salt);

        // Insertar nuevo usuario en la base de datos
        const nuevoUsuario = await pool.query(
            'INSERT INTO usuarios (nombre, email, contraseña, direccion, ciudad, pais, codigo_postal, rol) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
            [nombre, email, contraseñaHash, direccion, ciudad, pais, codigo_postal, rol]
        );

        res.status(201).json({ msg: 'Usuario registrado correctamente', usuario: nuevoUsuario.rows[0] });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
}

// Función para iniciar sesión de un usuario
async function login(req, res) {
    try {
        const { email, contraseña } = req.body;

        // Verificar si el usuario existe en la base de datos
        const usuario = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (usuario.rows.length === 0) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // Verificar la contraseña
        const contraseñaValida = await bcrypt.compare(contraseña, usuario.rows[0].contraseña);
        if (!contraseñaValida) {
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // Generar token de autenticación
        const payload = {
            usuario: {
                id: usuario.rows[0].id,
                nombre: usuario.rows[0].nombre,
                email: usuario.rows[0].email
            }
        };
        jwt.sign(payload, secretKey, { expiresIn: '1h' }, (error, token) => {
            if (error) throw error;
            res.json({ token });
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
}

// Función para obtener el perfil de un usuario autenticado
async function perfil(req, res) {
    try {
        // El perfil del usuario autenticado se encuentra en req.user (proporcionado por el middleware de autenticación)
        const { id, nombre, email } = req.user;
        res.json({ id, nombre, email });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Error del servidor');
    }
}

module.exports = {
    registro,
    login,
    perfil
};
