import Pedido from '../models/Pedido.js';
import CompraColectiva from '../models/CompraColectiva.js';
import Producto from '../models/Producto.js';

// POST /api/compras-colectivas/:id/forzar-cierre
export const forzarCierre = async (req, res) => {
    try {
        // Extraemos el nodoId de los parámetros de la URL, igual que el middleware
        const nodoId = req.params.id; 
        
        // Nota: El middleware esDuenioDelNodo ya validó que req.usuario.id == nodo.duenioId

        // FASE 1: Recolección y Cancelación
        await Pedido.updateMany(
            { nodoId, estado: 'Abierto' },
            { estado: 'Cancelado' }
        );

        // Obtenemos solo los pedidos que entraron al cierre, populando los datos del producto
        const pedidosListos = await Pedido.find({ nodoId, estado: 'Listo' })
            .populate('items.productoId');

        if (pedidosListos.length === 0) {
            return res.status(400).json({ error: 'No hay pedidos confirmados para consolidar.' });
        }

        // FASE 2: Consolidación de Volumen
        const mapaConsolidacion = {}; // { productoId: { unidadesTotales, productoDB } }

        pedidosListos.forEach(pedido => {
            pedido.items.forEach(item => {
                const prod = item.productoId;
                const pId = prod._id.toString();

                if (!mapaConsolidacion[pId]) {
                    mapaConsolidacion[pId] = { unidadesTotales: 0, dbRef: prod };
                }
                mapaConsolidacion[pId].unidadesTotales += item.cantidad;
            });
        });

        // FASE 3: Desglose y Asignación de Precios
        let totalGeneralMinorista = 0;
        let totalGeneralMayorista = 0;
        const pedidosIdsConsolidados = [];

        for (const pedido of pedidosListos) {
            for (const item of pedido.items) {
                const pId = item.productoId._id.toString();
                const infoGlobal = mapaConsolidacion[pId];

                // Algoritmo de decisión de precio
                if (infoGlobal.unidadesTotales >= infoGlobal.dbRef.umbralMayorista) {
                    item.precioAplicado = infoGlobal.dbRef.precioMayorista;
                } else {
                    item.precioAplicado = infoGlobal.dbRef.precioMinorista;
                }

                // Cálculos financieros globales
                totalGeneralMinorista += (infoGlobal.dbRef.precioMinorista * item.cantidad);
                totalGeneralMayorista += (item.precioAplicado * item.cantidad);
            }

            pedido.estado = 'Consolidado';
            await pedido.save(); // Se guarda la actualización de precios y estado
            pedidosIdsConsolidados.push(pedido._id);
        }

        // Generar el registro inmutable de la compra
        const ahorroTotal = totalGeneralMinorista - totalGeneralMayorista;

        const nuevaCompra = new CompraColectiva({
            nodoId,
            pedidosIds: pedidosIdsConsolidados,
            totalMinorista: totalGeneralMinorista,
            totalMayorista: totalGeneralMayorista,
            ahorroTotal
        });

        await nuevaCompra.save();

        return res.status(200).json({
            mensaje: 'Compra comunitaria cerrada exitosamente.',
            data: nuevaCompra
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error crítico en el algoritmo de cierre.' });
    }
};