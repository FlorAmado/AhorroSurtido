import React, { useState } from 'react';

const PanelCierreOwner = ({ isDuenio, nodoId, miembrosPendientes, onForzarCierre }) => {
    const [showModal, setShowModal] = useState(false);

    // Renderizado Condicional: Solo el Dueño ve este panel
    if (!isDuenio) return null;

    const handleConfirmarCierre = async () => {
        setShowModal(false);
        await onForzarCierre(nodoId);
    };

    return (
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <h4 className="text-lg font-bold text-yellow-800">Panel de Administración</h4>

            <button
                onClick={() => setShowModal(true)}
                className="mt-3 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-semibold"
            >
                Forzar Cierre
            </button>

            {/* Modal de Advertencia */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-md">
                        <h3 className="text-xl font-bold mb-4">⚠️ Alerta de Seguridad</h3>
                        <p className="mb-6">
                            Faltan confirmar {miembrosPendientes} personas. Si cerrás el pedido ahora,
                            sus productos quedarán afuera de esta compra y sus pedidos serán cancelados.
                            ¿Estás seguro de continuar?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-200 px-4 py-2 rounded text-gray-800 hover:bg-gray-300"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleConfirmarCierre}
                                className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
                            >
                                Sí, Forzar Cierre
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PanelCierreOwner;