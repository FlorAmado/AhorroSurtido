import express from 'express';
import { confirmarPedido } from '../controllers/pedidoController.js';
import { forzarCierre } from '../controllers/compraColectivaController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { authDuenio } from '../middlewares/authDuenio.js';

const router = express.Router();

// Rutas de Pedidos Individuales
router.put('/pedidos/:id/listo', verificarToken, confirmarPedido);

// Rutas de Compras Colectivas (Cierre)
router.post(
    '/compras-colectivas/forzar-cierre',
    verificarToken,
    authDuenio, // Middleware que evalúa req.usuario.id == nodo.duenioId
    forzarCierre
);

export default router;