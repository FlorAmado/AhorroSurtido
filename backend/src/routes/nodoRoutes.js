import express from 'express';
import Nodo from '../models/Nodo.js';
import Usuario from '../models/Usuario.js';
import { codigoInvitacion } from '../utils/codeGenerator.js';

const router = express.Router();

/**
 * RUTA: POST /api/nodos
 * DESCRIPCIÓN: Crea un nuevo nodo vecinal, genera su código único y asigna al creador como admin.
 */
router.post('/', async (req, res) => {
    try {

        const { nombre, location, adminId } = req.body;

        // 1. Validaciones básicas de que el frontend envíe los datos necesarios
        if (!nombre || !location || !adminId) {
            return res.status(400).json({
                success: false,
                message: 'El nombre, la ubicación y el ID del administrador son obligatorios.'
            });
        }

        let codigoUnico = '';
        let codigoExiste = true;

        // 2. Garantizar que el código generado sea único
        do {

            codigoUnico = codigoInvitacion();

            const nodoDuplicado = await Nodo.findOne({
                invitation_code: codigoUnico
            });

            if (!nodoDuplicado) {
                codigoExiste = false;
            }

        } while (codigoExiste);

        // 3. Crear el nodo
        const nuevoNodo = new Nodo({
            name: nombre,
            location: location,
            invitation_code: codigoUnico,
            admin: adminId,
            members: [adminId]
        });

        await nuevoNodo.save();

        // 4. Actualizar al usuario creador
        await Usuario.findByIdAndUpdate(adminId, {
            nodoId: nuevoNodo._id,
            rol: 'admin'
        });

        return res.status(201).json({
            success: true,
            message: '¡Nodo creado con éxito!',
            nodo: nuevoNodo
        });

    } catch (error) {

        console.error('Error al crear el nodo:', error);

        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor al procesar la creación del nodo.'
        });

    }
});

/**
 * RUTA: POST /api/nodos/join
 * DESCRIPCIÓN: Permite a un usuario unirse a un nodo existente mediante un código de invitación.
 */
router.post('/join', async (req, res) => {

    try {

        const { invitation_code, userId } = req.body;

        // Validar usuario
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Debe registrarse para unirse al nodo.'
            });
        }

        // Validar código
        if (!invitation_code) {
            return res.status(400).json({
                success: false,
                message: 'El código es incorrecto o no fue proporcionado. Intente nuevamente.'
            });
        }

        // Buscar usuario
        const usuario = await Usuario.findById(userId);

        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado.'
            });
        }

        // Buscar nodo mediante el código
        const nodo = await Nodo.findOne({
            invitation_code: invitation_code.trim().toUpperCase()
        });

        if (!nodo) {
            return res.status(404).json({
                success: false,
                message: 'Código de invitación inválido o nodo no encontrado.'
            });
        }

        // Si el usuario ya pertenece a otro nodo, quitarlo del nodo anterior
        if (
            usuario.nodoId &&
            usuario.nodoId.toString() !== nodo._id.toString()
        ) {

            await Nodo.findByIdAndUpdate(
                usuario.nodoId,
                {
                    $pull: {
                        members: userId
                    }
                }
            );

        }

        // Verificar si ya pertenece a este mismo nodo
        const yaEsMiembro = nodo.members.some(
            member => member.toString() === userId
        );

        if (yaEsMiembro) {
            return res.status(400).json({
                success: false,
                message: 'Ya eres miembro de este nodo.'
            });
        }

        // Agregar usuario al nuevo nodo
        nodo.members.push(userId);

        await nodo.save();

        // Actualizar el nodo del usuario
        await Usuario.findByIdAndUpdate(userId, {
            nodoId: nodo._id,
            rol: 'miembro'
        });

        return res.status(200).json({
            success: true,
            message: 'Te has unido al nodo exitosamente.',
            nodo
        });

    } catch (error) {

        console.error('Error al unirse al nodo:', error);

        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor al intentar unirse al nodo.'
        });

    }

});

export default router;