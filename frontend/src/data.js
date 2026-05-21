export const INITIAL_PRODUCTS = [
  {
    id: 'p-olive-oil',
    name: 'Aceite de Oliva Extra Virgen Ecológico 5L',
    description: 'Productor Local: Finca Los Olivos. Cosecha temprana, extracción en frío. Ideal para compras comunitarias.',
    unit: 'bidón',
    priceWholesale: 18500,
    priceRetail: 24000,
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
    category: 'Aceites',
    progressCurrent: 2,
    progressTarget: 4,
    progressUnit: 'unidades',
    provider: 'Finca Los Olivos',
    status: 'activo'
  },
  {
    id: 'p-rice',
    name: 'Arroz Blanco Largo Fino Orgánico',
    description: 'Granos de origen sostenible, sin pesticidas químicos, directo de cooperativa arrocera entrerriana.',
    unit: 'kg',
    priceWholesale: 1200,
    priceRetail: 1800,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
    category: 'Granos & Cereales',
    progressCurrent: 7,
    progressTarget: 10,
    progressUnit: 'kg',
    provider: 'Cooperativa Granos',
    status: 'activo'
  },
  {
    id: 'p-tomato',
    name: 'Tomate Triturado Finca Sur 900g',
    description: 'Tomates seleccionados premium para salsas, envasados en origen con sello orgánico.',
    unit: 'unidades',
    priceWholesale: 1500,
    priceRetail: 2200,
    image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?w=600&auto=format&fit=crop&q=80',
    category: 'Conservas',
    progressCurrent: 11,
    progressTarget: 12,
    progressUnit: 'unidades',
    provider: 'Finca Sur',
    status: 'activo'
  },
  {
    id: 'p-flour',
    name: 'Harina Integral Orgánica 000',
    description: 'Molienda fina en piedra. 100% integral y orgánica sin conservantes ni blanqueadores.',
    unit: 'kg',
    priceWholesale: 850,
    priceRetail: 1200,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
    category: 'Despensa',
    progressCurrent: 15,
    progressTarget: 15,
    progressUnit: 'kg',
    provider: 'Molino Pampeano',
    status: 'agotado'
  },
  {
    id: 'p-soap',
    name: 'Jabón Líquido Ropa Eco-Friendly',
    description: 'Fórmula biodegradable con aroma a lavanda campestre. Rinde 50 lavados, bote retornable.',
    unit: 'bidón 5L',
    priceWholesale: 6500,
    priceRetail: 9000,
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600&auto=format&fit=crop&q=80',
    category: 'Limpieza',
    progressCurrent: 0,
    progressTarget: 4,
    progressUnit: 'bidones',
    provider: 'BioLimpio',
    status: 'activo'
  }
];

export const COLLABORATIVE_CART_ITEMS = [
  {
    id: 'c-avocado',
    name: 'Organic Hass Avocados - 10kg Box',
    description: 'Precio mayorista asegurado.',
    priceWholesale: 45.00,
    priceRetail: 85.00,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&auto=format&fit=crop&q=80',
    addedBy: 'Tú (y otros)',
    participants: ['Tú', 'Maria L.']
  },
  {
    id: 'c-sourdough',
    name: 'Sourdough Loaves - Pack of 5',
    description: 'Panadería de origen local.',
    priceWholesale: 20.00,
    priceRetail: 35.00,
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=500&auto=format&fit=crop&q=80',
    addedBy: 'Juan P. y Ana R.',
    participants: ['Juan P.', 'Ana R.', 'Tú']
  },
  {
    id: 'c-coffee',
    name: 'Fairtrade Coffee Beans - 5kg',
    description: 'Directo de cooperativa.',
    priceWholesale: 60.00,
    priceRetail: 110.00,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80',
    addedBy: 'Maria L. y Ana R.',
    participants: ['Maria L.', 'Ana R.']
  }
];

export const INITIAL_MEMBERS = [
  {
    id: 'm-you',
    name: 'Tú',
    avatar: '',
    initials: 'Tú',
    percentage: 20,
    itemCount: 3
  },
  {
    id: 'm-maria',
    name: 'Maria L.',
    avatar: 'ML',
    initials: 'ML',
    percentage: 40,
    itemCount: 5
  },
  {
    id: 'm-juan',
    name: 'Juan P.',
    avatar: 'JP',
    initials: 'JP',
    percentage: 15,
    itemCount: 2
  },
  {
    id: 'm-ana',
    name: 'Ana R.',
    avatar: 'AR',
    initials: 'AR',
    percentage: 25,
    itemCount: 3
  }
];

export const INITIAL_NODES = [
  { id: 'node-vc', name: 'Villa Crespo', membersCount: 142, zone: 'CABA' },
  { id: 'node-ch', name: 'Chacarita', membersCount: 98, zone: 'CABA' },
  { id: 'node-p', name: 'Palermo Soho', membersCount: 210, zone: 'CABA' },
  { id: 'node-al', name: 'Almagro', membersCount: 115, zone: 'CABA' }
];

export const PARTNERS_LIST = [
  {
    name: 'Lácteos La Pradera',
    description: 'Quesos artesanales y dulce de leche directo de campo. Organiza compras al por mayor con tu nodo y ahorra hasta un 40%.',
    badge: 'NUEVO PROVEEDOR',
    buttonText: 'Ver catálogo del productor'
  }
];
