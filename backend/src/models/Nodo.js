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
  duenioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', // Coincide con tu modelo de usuarios
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario' 
  }],
  limiteMiembros: {
    type: Number,
    required: [true, 'El límite de miembros es obligatorio'],
    min: [2, 'El límite mínimo es de 2 miembros'],
    max: [50, 'El límite máximo es de 50 miembros']
  },
  // NUEVO: Fecha en la que caduca el código de invitación
  fechaExpiracion: {
    type: Date,
    required: true
  },
  // NUEVO: Lista de espera de usuarios que solicitaron unirse
  miembrosPendientes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  }]
}, {  
  timestamps: true 
});

export default mongoose.model('Nodo', NodoSchema);