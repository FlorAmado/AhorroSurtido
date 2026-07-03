const Carrito = require('../models/Carrito');
const PedidoGrupal = require('../models/PedidoGrupal');

const consolidarCarritosDelNodo = async (req, res) => {
    try {
        const { nodoId } = req.params;

        // FASE 1: Traer carritos activos del nodo y "popular" los productos
        const carritos = await Carrito.find({ nodo: nodoId, estado: 'activo' })
            .populate('productos.producto');

        if (carritos.length === 0) {
            return res.status(404).json({ mensaje: 'No hay carritos activos en este nodo para consolidar.' });
        }

        // FASE 2: Consolidar cantidades totales por producto
        // Usamos un objeto como diccionario para sumar rápido por ID de producto
        const consolidado = {};

        for (const carrito of carritos) {
            for (const item of carrito.productos) {
                const prodId = item.producto._id.toString();

                if (!consolidado[prodId]) {
                    consolidado[prodId] = {
                        productoBase: item.producto, // Guardamos la info entera del producto
                        cantidadTotal: 0
                    };
                }
                consolidado[prodId].cantidadTotal += item.cantidad;
            }
        }

        // FASE 3: Determinar los precios finales según el umbral
        const productosConsolidados = [];
        const preciosAplicados = {}; // Diccionario para buscar rápido en la Fase 4

        for (const key in consolidado) {
            const item = consolidado[key];
            const prod = item.productoBase;

            let precioFinal = prod.precioMinorista; // Por defecto es minorista

            if (item.cantidadTotal >= prod.umbralMayorista) {
                precioFinal = prod.precioMayorista;
            }

            preciosAplicados[key] = precioFinal;

            productosConsolidados.push({
                producto: prod._id,
                cantidadTotal: item.cantidadTotal,
                precioAplicado: precioFinal
            });
        }

        // FASE 4: Calcular el desglose por usuario y el monto total
        const desglosePorUsuario = [];
        let montoTotalGrupal = 0;

        for (const carrito of carritos) {
            let montoAPagar = 0;
            let montoSinDescuento = 0; // Para calcular cuánto se ahorró

            for (const item of carrito.productos) {
                const prodId = item.producto._id.toString();
                const precioLogrado = preciosAplicados[prodId];
                const precioNormal = item.producto.precioMinorista;

                montoAPagar += (item.cantidad * precioLogrado);
                montoSinDescuento += (item.cantidad * precioNormal);
            }

            // Redondeamos para evitar los micro-decimales de JS (ej: 0.3000000004)
            montoAPagar = Math.round(montoAPagar * 100) / 100;
            const montoAhorrado = Math.round((montoSinDescuento - montoAPagar) * 100) / 100;

            montoTotalGrupal += montoAPagar;

            desglosePorUsuario.push({
                usuario: carrito.usuario,
                montoAPagar,
                montoAhorrado
            });
        }

        // FASE FINAL: Guardar el Pedido Grupal y actualizar los carritos
        const nuevoPedidoGrupal = new PedidoGrupal({
            nodo: nodoId,
            estado: 'pendiente',
            montoTotal: Math.round(montoTotalGrupal * 100) / 100,
            productosConsolidados,
            desglosePorUsuario
        });

        await nuevoPedidoGrupal.save();

        // Actualizamos todos los carritos que entraron en esta compra a "procesado"
        const carritosIds = carritos.map(c => c._id);
        await Carrito.updateMany(
            { _id: { $in: carritosIds } },
            { estado: 'procesado' }
        );

        return res.status(201).json({
            mensaje: 'Pedido grupal consolidado con éxito',
            pedido: nuevoPedidoGrupal
        });

    } catch (error) {
        console.error('Error en el algoritmo de consolidación:', error);
        return res.status(500).json({ mensaje: 'Error interno del servidor', error: error.message });
    }
};

module.exports = { consolidarCarritosDelNodo };