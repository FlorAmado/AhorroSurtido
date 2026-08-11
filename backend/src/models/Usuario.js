import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true
    },
    passwordHash: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    nodoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nodo',
        default: null
    },
    rol: {
        type: String,
        enum: ['admin', 'miembro'],
        default: 'miembro'
    }
}, { timestamps: true });

// Middleware pre-save para hashear la contraseña antes de guardar
usuarioSchema.pre('save', async function () {
    // Si la contraseña no se modificó, cortamos la ejecución acá
    if (!this.isModified('passwordHash')) return;
    
    // Generamos el salt y encriptamos
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});

usuarioSchema.methods.compararPassword = async function (passwordIngresada) {
    return await bcrypt.compare(passwordIngresada, this.passwordHash);
};

usuarioSchema.methods.generarToken = function () {
    return jwt.sign(
        { id: this._id, rol: this.rol, nodoId: this.nodoId },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

export default mongoose.model('Usuario', usuarioSchema);

