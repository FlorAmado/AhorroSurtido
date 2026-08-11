import express from 'express';
import Nodo from '../models/Nodo.js';
import Usuario from '../models/Usuario.js';
import { codigoInvitacion } from '../utils/codeGenerator.js'; 
import { esDuenioDelNodo } from '../middlewares/authDuenio.js';
import { verificarToken } from '../middlewares/authMiddleware.js'

const router = express.Router();

/**
 * RUTA: GET /nodos/mis-nodos
 * DESCRIPCIÓN: Devuelve los nodos donde el usuario autenticado es el dueño.
 */
router.get('/mis-nodos', verificarToken, async (req, res) => {
    try {
        const duenioId = req.usuario?.id;
        const nodos = await Nodo.find({ duenioId })
            .populate('miembrosPendientes', 'nombre email')
            .populate('members', 'nombre email');

        return res.status(200).json({ success: true, nodos });
    } catch (error) {
        console.error('Error al obtener nodos del dueño:', error);
        return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
    }
});

/**
 * RUTA: GET /nodos/:id
 * DESCRIPCIÓN: Devuelve un nodo por su ID (solo si el usuario autenticado es el dueño).
 */
router.get('/:id', verificarToken, esDuenioDelNodo, async (req, res) => {
    try {
        const nodo = await Nodo.findById(req.params.id)
            .populate('miembrosPendientes', 'nombre email')
            .populate('members', 'nombre email');

        if (!nodo) {
            return res.status(404).json({ success: false, message: 'Nodo no encontrado.' });
        }

        return res.status(200).json({ success: true, nodo });
    } catch (error) {
        console.error('Error al obtener el nodo:', error);
        return res.status(500).json({ success: false, message: 'Error interno del servidor.' });
    }
});

/**
 * RUTA: POST /api/nodos
 * DESCRIPCIÓN: Crea un nuevo nodo vecinal, genera su código único y asigna al creador como admin.
 */
router.post('/', verificarToken, async (req, res) => {
    try { 
        // Se extrae por body los datos y el límite exigido por la épica
        const { nombre, location, limiteMiembros } = req.body;
        
        // El creador del nodo será el dueño (cualquier usuario logueado)
        const duenioId = req.usuario?.id;

        if (!nombre || !location || !limiteMiembros || !duenioId) {
            return res.status(400).json({ 
                success: false, 
                message: 'El nombre, la ubicación, el límite de miembros y estar logueado son obligatorios.' 
            });
        }

        // Validación de servidor min: 2, max: 50 exigido por la épica
        const limiteNum = Number(limiteMiembros);
        if (limiteNum < 2 || limiteNum > 50) {
            return res.status(400).json({
                success: false,
                message: 'El límite de miembros permitido por el servidor debe ser entre 2 y 50 personas.'
            });
        }

        // Setear automáticamente la fecha de expiración a 7 días exactos
        const fechaExpiracion = new Date();
        fechaExpiracion.setDate(fechaExpiracion.getDate() + 7);

        let codigoUnico = '';
        let codigoExiste = true;

        do {
            codigoUnico = codigoInvitacion();
            const nodoDuplicado = await Nodo.findOne({ invitation_code: codigoUnico });
            if (!nodoDuplicado) {
                codigoExiste = false;
            }
        } while (codigoExiste);

        // 1.5 REFACTOR: Guardamos usando la nueva arquitectura
        const nuevoNodo = new Nodo({
            name: nombre,
            location: location,
            invitation_code: codigoUnico,
            duenioId: duenioId,
            limiteMiembros: limiteNum,
            fechaExpiracion: fechaExpiracion,
            members: [duenioId], // El dueño se cuenta como miembro inicial activo
            miembrosPendientes: []
        });

        await nuevoNodo.save();

        // Enlazar al usuario administrador
        await Usuario.findByIdAndUpdate(duenioId, { 
            nodoId: nuevoNodo._id,
            rol: 'admin'
        });

        return res.status(201).json({
            success: true,
            message: '¡Nodo creado con éxito! Tu código expira en 7 días.',
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
 * DESCRIPCIÓN: Valida el código, la expiración, la capacidad e inserta al usuario en lista de espera.
 */
router.post('/join', verificarToken, async (req, res) => {
    try {
        const { invitation_code, userId } = req.body;
        const finalUserId = req.usuario?.id || userId;

        if (!finalUserId) {
            return res.status(401).json({
                success: false,
                message: 'Debe registrarse o iniciar sesión para unirse al nodo.'
            });
        }

        if (!invitation_code) {
            return res.status(400).json({
                success: false,
                message: 'El código de invitación es obligatorio.'
            });
        }

        const nodo = await Nodo.findOne({ invitation_code: invitation_code.toUpperCase() });

        if (!nodo) {
            return res.status(404).json({
                success: false,
                message: 'Código de invitación inválido o nodo no encontrado.'
            });
        }

        // Validación: Que la fecha actual no supere la de expiración
        if (new Date() > nodo.fechaExpiracion) {
            return res.status(400).json({
                success: false,
                message: 'Este código de invitación ya ha expirado debido a la rotación semanal.'
            });
        }

        // Validación: No estar ya adentro como miembro activo
        if (nodo.members.includes(finalUserId)) {
            return res.status(400).json({
                success: false,
                message: 'Ya eres un miembro activo de este nodo.'
            });
        }

        // Validación: No estar ya duplicado en la lista de espera
        if (nodo.miembrosPendientes.includes(finalUserId)) {
            return res.status(400).json({
                success: false,
                message: 'Tu solicitud ya fue enviada y está pendiente de aprobación por el Dueño.'
            });
        }
        
        // Validación: Que el nodo no haya alcanzado el límite fijado
        if (nodo.members.length >= nodo.limiteMiembros) {
            return res.status(400).json({
                success: false,
                message: 'El nodo ha alcanzado su límite de capacidad de miembros activos.'
            });
        }

        // Si todo es válido, insertar al usuario en el array de miembrosPendientes
        nodo.miembrosPendientes.push(finalUserId);
        await nodo.save();

        return res.status(200).json({
            success: true,
            message: 'Solicitud enviada con éxito. Quedaste en la lista de espera del administrador.',
            nodo
        });

    } catch (error) {
        console.error('Error al solicitar unirse al nodo:', error);
        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor al intentar unirse al nodo.'
        });
    }
});

/**
 * RUTA: PUT /api/nodos/:id/approve
 * DESCRIPCIÓN: Permite al Dueño aceptar o rechazar solicitudes de la lista de pendientes.
 */
router.put('/:id/approve', verificarToken, esDuenioDelNodo, async (req, res) => {
    try {
        const { candidatoId, action } = req.body; // action puede ser 'accept' o 'reject'
        const nodo = req.nodo; // El nodo ya viene adjuntado desde el middleware de dueño

        if (!candidatoId || !action) {
            return res.status(400).json({ success: false, message: 'El ID del candidato y la acción (accept/reject) son requeridos.' });
        }

        // Validar que realmente esté en la lista de espera
        if (!nodo.miembrosPendientes.includes(candidatoId)) {
            return res.status(400).json({ success: false, message: 'El usuario especificado no está en la lista de pendientes.' });
        }

        // Sacar de la lista de pendientes independientemente de la resolución
        nodo.miembrosPendientes = nodo.miembrosPendientes.filter(id => id.toString() !== candidatoId.toString());

        if (action === 'accept') {
            // Verificar capacidad límite una última vez antes de ingresar
            if (nodo.members.length >= nodo.limiteMiembros) {
                return res.status(400).json({ success: false, message: 'No es posible aceptar al usuario. El nodo alcanzó su capacidad máxima.' });
            }

            nodo.members.push(candidatoId);

            // Actualizar el perfil del usuario aprobado
            await Usuario.findByIdAndUpdate(candidatoId, {
                nodoId: nodo._id,
                rol: 'miembro'
            });
        }

        await nodo.save();

        return res.status(200).json({
            success: true,
            message: action === 'accept' ? 'Usuario aceptado como miembro oficial.' : 'Solicitud de usuario rechazada de forma exitosa.',
            nodo
        });

    } catch (error) {
        console.error('Error en endpoint de aprobación:', error);
        return res.status(500).json({ success: false, message: 'Error interno al procesar la aprobación.' });
    }
});

export default router;