import Usuario from '../models/Usuario.js';

export const register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Validación básica
        if (!nombre || !email || !password) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        }

        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El email ya está registrado' });
        }

        const nuevoUsuario = await Usuario.create({
            nombre,
            email,
            passwordHash: password // El pre-save hook se encarga del hash
        });

        const token = nuevoUsuario.generarToken();

        res.status(201).json({
            mensaje: 'Usuario registrado con éxito',
            token,
            usuario: {
                id: nuevoUsuario._id,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email,
                rol: nuevoUsuario.rol
            }
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno del servidor', error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ mensaje: 'Email y contraseña son obligatorios' });
        }

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        const esPasswordValida = await usuario.compararPassword(password);
        if (!esPasswordValida) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        const token = usuario.generarToken();

        res.status(200).json({
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
                nodoId: usuario.nodoId
            }
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno del servidor', error: error.message });
    }
};