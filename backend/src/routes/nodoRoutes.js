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

        // 2. BUCLE DO-WHILE: Garantiza la unicidad estricta del código en la Base de Datos
        do {
            codigoUnico = codigoInvitacion(); // Llama a tu función (ej: BX-937K)
            
            // Buscamos si ya existe algún nodo con ese código exacto
            const nodoDuplicado = await Nodo.findOne({ invitation_code: codigoUnico });
            
            if (!nodoDuplicado) {
                codigoExiste = false;
            }
        } while (codigoExiste);

        // 3. Crear el documento del nuevo Nodo
        const nuevoNodo = new Nodo({
            name: nombre,
            location: location,
            invitation_code: codigoUnico,
            admin: adminId,
            members: [adminId] 
        });

        await nuevoNodo.save();

        // 5. ENLAZAR AL USUARIO:  Al crear un nodo, pasa a ser el administrador del mismo
        await Usuario.findByIdAndUpdate(adminId, { 
            nodoId: nuevoNodo._id,
            rol: 'admin'
        });

        // 6. RESPUESTA AL FRONTEND: Devolvemos el éxito y el nodo completo con su código alfanumérico
        return res.status(201).json({
            success: true,
            message: '¡Nodo creado con éxito!',
            nodo: nuevoNodo // El front tomará de acá el invitation_code para mostrárselo al usuario
        });

    } catch (error) {
        console.error('Error al crear el nodo:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'Error interno del servidor al procesar la creación del nodo.' 
        });
    }
});

export default router;