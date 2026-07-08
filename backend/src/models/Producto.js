import mongoose from 'mongoose';

// Estructura del diagrama de clases
const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        trim: true
    },
    categoria: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        trim: true
    },
    precioMinorista: {
        type: Number,
        required: [true, 'El precio minorista es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    precioMayorista: {
        type: Number,
        required: [true, 'El precio mayorista es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    umbralMayorista: {
        type: Number,
        required: [true, 'El umbral mayorista es obligatorio'],
        min: [1, 'El umbral debe ser de al menos 1 unidad']
    }
}, { timestamps: true });

export default mongoose.model('Producto', productoSchema);