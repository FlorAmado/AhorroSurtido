const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5100/api';

export const productosService = {
    obtenerProductos: async () => {
        const respuesta = await fetch(`${API_URL}/productos`);

        if (!respuesta.ok) {
            throw new Error('Error al cargar el catálogo de productos');
        }

        return respuesta.json();
    }
};