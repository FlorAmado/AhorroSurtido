const mongoose = require('mongoose');
const { Schema } = mongoose;

const carritoSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    nodo: {
        type: Schema.Types.ObjectId,
        ref: 'Nodo',
        required: true
    },
    productos: [{
        producto: {
            type: Schema.Types.ObjectId,
            ref: 'Producto',
            required: true
        },
        cantidad: {
            type: Number,
            required: true,
            min: [1, 'La cantidad mínima es 1']
        }
    }],
    estado: {
        type: String,
        enum: ['activo', 'procesado'],
        default: 'activo'
    }
}, {
    timestamps: true // Agrega automáticamente createdAt y updatedAt
});

module.exports = mongoose.model('Carrito', carritoSchema);