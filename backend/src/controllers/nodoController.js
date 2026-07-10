
import mongoose from 'mongoose';
import CompraColectiva from '../models/CompraColectiva.js';

/**
 * Calcula el impacto financiero acumulado de un Nodo de compras comunitarias.
 * Cumple con la subtarea ES-59 de forma tradicional, permitiendo que la ES-58 optimice con Aggregation.
 * 
 * @route GET /api/nodes/:id/impact
 */
export const getNodoImpact = async (req, res) => {
  try {
    const { id } = req.params;

    // Comprobamos si el ID de la URL es un ObjectId válido de MongoDB.
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        mensaje: "El ID del nodo proporcionado no tiene un formato válido para MongoDB."
      });
    }

    // Traemos todos los documentos de compras colectivas de este nodo.
    // Esto deja el camino libre para que la tarea ES-58 reemplace este flujo por un Pipeline.
    const compras = await CompraColectiva.find({ nodoId: id });

    // Si no hay compras registradas para este nodo aún.
    if (compras.length === 0) {
      return res.status(200).json({
        success: true,
        nodoId: id,
        ciclosCerrados: 0,
        impacto: {
          ahorroTotal: 0,
          totalInvertidoMayorista: 0,
          valorEquivalenteMinorista: 0
        }
      });
    }

    // Realizamos los cálculos matemáticos en la memoria de Node.js usando reduce.
    const ahorroTotalAcumulado = compras.reduce((sum, c) => sum + (c.ahorroTotal || 0), 0);
    const totalGastadoMayorista = compras.reduce((sum, c) => sum + (c.totalMayorista || 0), 0);
    const totalEquivalenteMinorista = compras.reduce((sum, c) => sum + (c.totalMinorista || 0), 0);
    const cantidadCiclosCerrados = compras.length;

    // Respondemos con status 200 OK enviando los totales con precisión de 2 decimales.
    return res.status(200).json({
      success: true,
      nodoId: id,
      ciclosCerrados: cantidadCiclosCerrados,
      impacto: {
        ahorroTotal: Number(ahorroTotalAcumulado.toFixed(2)),
        totalInvertidoMayorista: Number(totalGastadoMayorista.toFixed(2)),
        valorEquivalenteMinorista: Number(totalEquivalenteMinorista.toFixed(2))
      }
    });

  } catch (error) {
    console.error("Error en getNodoImpact:", error);
    return res.status(500).json({
      success: false,
      mensaje: "Ocurrió un error interno en el servidor al calcular el impacto del nodo.",
      error: error.message
    });
  }
};