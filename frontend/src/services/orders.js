const API_URL = import.meta.env.VITE_API_URL;

export const confirmarCompra = async (cartItems, nodoId) => {
  const payload = {
    nodoId,
    productos: cartItems.map(item => ({
      productoId: item.id,
      cantidad: item.qty
    }))
  };

  const response = await fetch(`${API_URL}/api/orders/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  return response.json();
};