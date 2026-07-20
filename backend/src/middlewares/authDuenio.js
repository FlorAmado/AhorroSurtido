import Nodo from '../models/Nodo.js';

export const esDuenioDelNodo = async (req, res, next) => {
  try {
    const nodoId = req.params.id;
    const usuarioId = req.usuario.id; // Extraído previamente por tu middleware de JWT

    const nodo = await Nodo.findById(nodoId);
    if (!nodo) {
      return res.status(404).json({ success: false, message: 'Nodo no encontrado.' });
    }

    // Validación estricta: ¿El que edita es el dueño?
    if (nodo.duenioId.toString() !== usuarioId.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: 'Acceso denegado. No eres el administrador (Dueño) de este nodo.' 
      });
    }

    // Si es el dueño, guardamos el nodo en el req para no tener que buscarlo de nuevo en la ruta
    req.nodo = nodo;
    next();
  } catch (error) {
    console.error('Error en middleware esDuenioDelNodo:', error);
    return res.status(500).json({ success: false, message: 'Error de autorización.' });
  }
};