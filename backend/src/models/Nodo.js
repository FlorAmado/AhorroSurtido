import mongoose from 'mongoose';

const NodoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del nodo es obligatorio'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'La ubicación del nodo es obligatoria'],
    trim: true
  },
  invitation_code: {
    type: String,
    required: true,
    unique: true,    // Evita duplicados en la base de datos
    index: true,     // Búsquedas ultra rápidas
    uppercase: true, // Siempre en mayúsculas
    trim: true
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', // Coincide con tu modelo de usuarios
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  }]
}, { 
  timestamps: true 
});

export default mongoose.model('Nodo', NodoSchema);