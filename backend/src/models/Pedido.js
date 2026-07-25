const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    nodoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Nodo', required: true },
    items: [{
        productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
        cantidad: { type: Number, required: true, min: 1 },
        precioAplicado: { type: Number, default: 0 } // Se actualiza en el cierre
    }],
    estado: {
        type: String,
        enum: ['Abierto', 'Listo', 'Consolidado', 'Cancelado'],
        default: 'Abierto'
    }
}, { timestamps: true });

module.exports = mongoose.model('Pedido', pedidoSchema);