import axios from "axios";

// Configuración base del endpoint Productos
const API_URL = "http://localhost:5100/productos";


// Obtener catálogo completo de productos
export const getProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};


// Crear un nuevo producto (Backend listo)
// Implementar cuando se conecte el formulario

// export const createProduct = async (productData) => {
//     const response = await axios.post(API_URL, productData);
//     return response.data;
// };


// Actualizar un producto existente
// Implementar cuando exista edición

// export const updateProduct = async (id, productData) => {
//     const response = await axios.put(`${API_URL}/${id}`, productData);
//     return response.data;
// };


// Eliminar un producto
// Implementar cuando exista panel administrador

// export const deleteProduct = async (id) => {
//     const response = await axios.delete(`${API_URL}/${id}`);
//     return response.data;
// };