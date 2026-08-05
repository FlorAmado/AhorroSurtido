
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5100';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

export const nodoService = {
    obtenerNodos: async () => {
        const respuesta = await fetch(`${API_URL}/nodos`, {
            method: 'GET',
            headers: getAuthHeaders()
        });
        
        if (!respuesta.ok) {
            const error = await respuesta.json();
            throw new Error(error.message || 'Error al obtener nodos');
        }
        
        return respuesta.json();
    },

    getMisNodos: async () => {
        const respuesta = await fetch(`${API_URL}/nodos/mis-nodos`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        const data = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(data.message || 'Error al obtener tus nodos');
        }

        return data; // { success, nodos: [...] }
    },

    crearNodo: async (nodoData) => {
        const respuesta = await fetch(`${API_URL}/nodos`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(nodoData)
        });

        const data = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(data.message || 'Error al crear nodo');
        }

        return data;
    },

    unirseNodo: async (invitation_code) => {
        const respuesta = await fetch(`${API_URL}/nodos/join`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ invitation_code })
        });

        const data = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(data.message || 'Error al unirse al nodo');
        }

        return data;
    },

    aprobarMiembro: async (nodoId, candidatoId, action) => {
        const respuesta = await fetch(`${API_URL}/nodos/${nodoId}/approve`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ candidatoId, action })
        });

        const data = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(data.message || 'Error al aprobar miembro');
        }

        return data;
    }
};
