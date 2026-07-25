const Pedido = require('../models/Pedido');

// PUT /api/pedidos/:id/listo
const confirmarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioId = req.usuario.id;

        const pedido = await Pedido.findOne({ _id: id, usuarioId });

        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        if (pedido.estado !== 'Abierto') {
            return res.status(400).json({ error: 'El pedido ya fue confirmado o cerrado.' });
        }

        pedido.estado = 'Listo';
        await pedido.save();

        return res.status(200).json({ mensaje: 'Pedido confirmado exitosamente', pedido });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor al confirmar pedido.' });
    }
};

module.exports = { confirmarPedido };