const mongoose = require('mongoose');
const { Schema } = mongoose;

const pedidoGrupalSchema = new Schema({
    nodo: {
        type: Schema.Types.ObjectId,
        ref: 'Nodo',
        required: true
    },
    estado: {
        type: String,
        enum: ['pendiente', 'pagado', 'completado'],
        default: 'pendiente'
    },
    montoTotal: {
        type: Number,
        required: true
    },
    productosConsolidados: [{
        producto: {
            type: Schema.Types.ObjectId,
            ref: 'Producto',
            required: true
        },
        cantidadTotal: {
            type: Number,
            required: true
        },
        precioAplicado: {
            type: Number,
            required: true
        }
    }],
    desglosePorUsuario: [{
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true
        },
        montoAPagar: {
            type: Number,
            required: true
        },
        montoAhorrado: {
            type: Number,
            required: true,
            default: 0
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('PedidoGrupal', pedidoGrupalSchema);