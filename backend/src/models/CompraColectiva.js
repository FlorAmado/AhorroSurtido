import mongoose from 'mongoose';

// Definición del esquema de Compra Colectiva para el impacto financiero
const compraColectivaSchema = new mongoose.Schema({
  nodoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nodo', // Referencia al modelo de Nodo
    required: true
  },
  pedidosIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pedido' // Referencia a los pedidos individuales de los vecinos que integraron este ciclo
  }],
  totalMinorista: { 
    type: Number, 
    required: true // Lo que salía en el supermercado
  },
  totalMayorista: { 
    type: Number, 
    required: true // Lo que realmente pagaron al productor mayorista
  },
  ahorroTotal: { 
    type: Number, 
    required: true // La ganancia o beneficio (totalMinorista - totalMayorista)
  },
  fechaCierre: { 
    type: Date, 
    default: Date.now // Fecha automática al cerrar la compra
  }
}, { timestamps: true }); // Agrega createdAt y updatedAt automáticamente

const CompraColectiva = mongoose.model('CompraColectiva', compraColectivaSchema);
export default CompraColectiva;