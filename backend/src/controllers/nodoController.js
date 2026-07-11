import mongoose from 'mongoose';
import CompraColectiva from '../models/CompraColectiva.js';

/**
 * Calcula el impacto financiero acumulado de un Nodo de compras comunitarias.
 *
 * ES-59 → Endpoint GET /api/nodes/:id/impact (Elkin)
 * ES-58 → Optimización mediante Aggregation Pipeline (Mati)
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

        // Fechas del mes actual
        const hoy = new Date();

        const inicioMes = new Date(
            hoy.getFullYear(),
            hoy.getMonth(),
            1
        );

        const finMes = new Date(
            hoy.getFullYear(),
            hoy.getMonth() + 1,
            1
        );

        
        // IMPLEMENTACIÓN ES-58 
        // Aggregation Pipeline

        const resultado = await CompraColectiva.aggregate([

            {
                $match: {
                    nodoId: new mongoose.Types.ObjectId(id),
                    fechaCierre: {
                        $gte: inicioMes,
                        $lt: finMes
                    }
                }
            },

            {
                $group: {
                    _id: "$nodoId",
                    ahorroTotal: {
                        $sum: "$ahorroTotal"
                    },
                    ciclosCerrados: {
                        $sum: 1
                    }
                }
            }
        ]);

  
        // IMPLEMENTACIÓN ORIGINAL ES-59 
        
        /*
        // Traemos todos los documentos de compras colectivas de este nodo.
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
        const ahorroTotalAcumulado = compras.reduce(
            (sum, c) => sum + (c.ahorroTotal || 0),
            0
        );

        const totalGastadoMayorista = compras.reduce(
            (sum, c) => sum + (c.totalMayorista || 0),
            0
        );

        const totalEquivalenteMinorista = compras.reduce(
            (sum, c) => sum + (c.totalMinorista || 0),
            0
        );

        const cantidadCiclosCerrados = compras.length;
        */

        
        // RESPUESTA DEL AGGREGATION PIPELINE
      
        if (resultado.length === 0) {
            return res.status(200).json({
                success: true,
                nodoId: id,
                ciclosCerrados: 0,
                impacto: {
                    ahorroTotal: 0
                }
            });
        }

        return res.status(200).json({
            success: true,
            nodoId: id,
            ciclosCerrados: resultado[0].ciclosCerrados,
            impacto: {
                ahorroTotal: Number(
                    resultado[0].ahorroTotal.toFixed(2)
                )
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