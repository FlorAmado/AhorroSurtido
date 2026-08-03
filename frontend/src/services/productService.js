const API_URL = "http://localhost:5100/products";

export async function getProducts() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("No fue posible obtener los productos.");
    }

    const productos = await response.json();

    // Adaptamos el backend al formato esperado por el frontend
    return productos.map(producto => ({
        id: producto._id,

        name: producto.nombre,

        category: producto.categoria,

        priceWholesale: producto.precioMayorista,

        priceRetail: producto.precioMinorista,

        progressTarget: producto.umbralMayorista,

        progressCurrent: 0,

        provider: "Productor Local",

        description: "Producto disponible para compra comunitaria.",

        image: "https://images.unsplash.com/photo-1506617564039-2f3b650b7010?w=600",

        unit: "unidades",

        status: "activo"
    }));
}