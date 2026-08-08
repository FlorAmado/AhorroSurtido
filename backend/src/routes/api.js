import express from 'express';
import { confirmarPedido } from '../controllers/pedidoController.js';
import { forzarCierre } from '../controllers/compraColectivaController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { esDuenioDelNodo } from '../middlewares/authDuenio.js'; // <-- Importamos el nombre real

const router = express.Router();

// Rutas de Pedidos Individuales
router.put('/pedidos/:id/listo', verificarToken, confirmarPedido);

// Rutas de Compras Colectivas (Cierre)
// Agregamos :id a la URL para que el middleware pueda leer req.params.id
router.post(
    '/compras-colectivas/:id/forzar-cierre',
    verificarToken,
    esDuenioDelNodo, // <-- Usamos el middleware correcto
    forzarCierre
);

export default router;