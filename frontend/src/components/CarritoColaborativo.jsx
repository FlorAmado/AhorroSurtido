import React, { useState } from 'react';

const CarritoColaborativo = ({ pedido, onConfirmarListo }) => {
    const [loading, setLoading] = useState(false);
    const isBloqueado = pedido.estado !== 'Abierto';

    const handleListo = async () => {
        setLoading(true);
        try {
            await onConfirmarListo(pedido._id);
            // Mostrar Toast de éxito
        } catch (error) {
            // Mostrar Toast de error (ej: Error 400 o 500)
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="carrito-container p-4 border rounded shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Mi Pedido</h3>

            {/* Mapeo de items omitido por brevedad. 
          Se asume que los inputs y botones de borrar usan la prop `disabled={isBloqueado}` */}

            <div className="mt-6">
                <button
                    onClick={handleListo}
                    disabled={isBloqueado || loading}
                    className={`w-full py-2 px-4 rounded font-bold text-white ${isBloqueado ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                        }`}
                >
                    {isBloqueado ? 'Pedido Confirmado 🔒' : 'Listo para cerrar ✅'}
                </button>
            </div>
        </div>
    );
};

export default CarritoColaborativo;