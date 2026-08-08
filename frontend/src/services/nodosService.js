const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5100/api';

export const nodosService = {
    obtenerNodos: async () => {
        const respuesta = await fetch(`${API_URL}/nodos`);

        if (!respuesta.ok) {
            throw new Error('Error al cargar los nodos');
        }

        return respuesta.json();
    },

    unirseANodo: async (codigo, token) => {
        const respuesta = await fetch(`${API_URL}/nodos/unirse`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ codigo }),
        });

        if (!respuesta.ok) {
            const error = await respuesta.json();
            throw new Error(error.mensaje || error.error || 'Error al unirse al nodo');
        }

        return respuesta.json();
    }
};