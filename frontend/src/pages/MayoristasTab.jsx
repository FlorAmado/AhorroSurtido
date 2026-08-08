import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Plus, Check, Verified, ChevronRight, Loader2 } from 'lucide-react';
import { productosService } from '../services/productosService';

export default function MayoristasTab({ onAddProductToCart, currentNodeName }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [successItemName, setSuccessItemName] = useState(null);
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await productosService.obtenerProductos();
        
        // Mapeamos los datos de MongoDB a la estructura que usa tu UI
        const productosMapeados = data.map(dbProd => ({
          id: dbProd._id,
          name: dbProd.nombre,
          category: dbProd.categoria || 'General',
          provider: 'Socio Local', // Si luego agregás productor a la DB, lo reemplazás acá
          priceWholesale: dbProd.precioMayorista,
          priceRetail: dbProd.precioMinorista,
          progressTarget: dbProd.umbralMayorista,
          progressCurrent: 0, // Idealmente esto vendría del backend sumando los pedidos de la semana
          unit: 'unidades',
          // Imagen por defecto temporal hasta que le agregues el campo URL a la BD
          image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80', 
          status: 'activo',
          description: `Compra en cantidad y asegurá el mejor precio para ${dbProd.nombre}.`
        }));
        
        setProductos(productosMapeados);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

  // Filtro de búsqueda
  const filteredProducts = productos.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddClick = (p) => {
    onAddProductToCart(p);
    setSuccessItemName(p.name);
    setTimeout(() => {
      setSuccessItemName(null);
    }, 3000);
  };

  // Tomamos el primer producto del catálogo como oferta destacada (Hero)
  const heroProduct = productos.length > 0 ? productos[0] : null;

  if (cargando) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-brand-orange animate-spin" />
        <p className="text-[#6b5e52] font-medium text-sm animate-pulse">Cargando catálogo del nodo...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 animate-fade-in" id="mayoristas-tab-container">
      
      {/* Top Search Utilities */}
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8a7a6b] w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar productos por nombre, categoría o productor..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-[#eae8e4] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent shadow-xs transition-all"
            id="product-search-input"
          />
        </div>
        <div className="text-xs text-[#8a7a6b] font-medium self-end md:self-center">
          Mostrando {filteredProducts.length} productos disponibles
        </div>
      </div>

      {/* Hero Banner (Oferta del Día) */}
      {!searchQuery && heroProduct && (
        <div id="hero-offer-banner" className="mb-10 bg-white border border-[#eae8e4] rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Hero Left Info */}
            <div className="p-6 sm:p-10 lg:col-span-7 flex flex-col justify-center space-y-5">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center space-x-1 bg-amber-500/10 text-amber-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <span className="text-amber-500 font-bold">★</span>
                  <span>Oferta del Día</span>
                </span>
                <span className="inline-flex items-center space-x-1 bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-cyan-100">
                  <Verified className="w-3.5 h-3.5" />
                  <span>Socio Mayorista</span>
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#2c2520] tracking-tight leading-tight">
                {heroProduct.name}
              </h2>
              <p className="text-sm sm:text-base text-[#5c5044] leading-relaxed max-w-xl">
                {heroProduct.description}
              </p>

              {/* Price Details */}
              <div className="flex items-baseline space-x-4">
                <span className="text-3xl font-black text-brand-orange font-display">
                  ${heroProduct.priceWholesale.toLocaleString('es-AR')}
                </span>
                <span className="text-sm text-[#8a7a6b] line-through">
                  Minorista: ${heroProduct.priceRetail.toLocaleString('es-AR')}
                </span>
                <span className="text-xs text-green-700 font-bold bg-green-50 px-2 py-1 rounded-md">
                  Ahorras {Math.round((1 - heroProduct.priceWholesale / heroProduct.priceRetail) * 100)}%
                </span>
              </div>

              {/* Progress Tracker */}
              <div className="p-4 bg-brand-bg rounded-2xl border border-[#eae8e4] space-y-2">
                <div className="flex justify-between text-xs font-bold text-[#2c2520]">
                  <span>Progreso del bulto (Caja x {heroProduct.progressTarget})</span>
                  <span className="font-mono">{heroProduct.progressCurrent}/{heroProduct.progressTarget}</span>
                </div>
                
                {/* Visual Progress Bar */}
                <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-orange transition-all duration-500 ease-out"
                    style={{ width: `${(heroProduct.progressCurrent / heroProduct.progressTarget) * 100}%` }}
                  />
                </div>

                <p className="text-xs text-[#6b5e52]">
                  {heroProduct.progressCurrent >= heroProduct.progressTarget 
                    ? '🎉 ¡Bulto cerrado! Garantizado al mejor precio mayorista.'
                    : `Faltan ${heroProduct.progressTarget - heroProduct.progressCurrent} unidades para completar el bulto cerrado y asegurar el precio mayorista.`
                  }
                </p>
              </div>

              {/* Join action */}
              <div className="flex items-center space-x-3 pt-2">
                <button
                  id={`btnadd-hero-${heroProduct.id}`}
                  onClick={() => handleAddClick(heroProduct)}
                  disabled={heroProduct.status === 'agotado'}
                  className="bg-brand-orange hover:bg-brand-orange-hover text-white font-bold py-3 px-6 rounded-xl shadow-xs transition-all flex items-center space-x-2 shrink-0 cursor-pointer"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Sumarme al bulto</span>
                </button>
                {successItemName === heroProduct.name && (
                  <span className="text-sm text-green-700 font-medium flex items-center space-x-1 animate-fade-in bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                    <Check className="w-4 h-4 text-green-700" />
                    <span>¡Agregado al carrito!</span>
                  </span>
                )}
              </div>
            </div>

            {/* Hero Right Image */}
            <div className="lg:col-span-5 relative min-h-[250px] lg:min-h-0 bg-gray-100">
              <img
                src={heroProduct.image}
                alt={heroProduct.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      )}

      {/* Main Catalog Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-[#2c2520] tracking-tight">
            Comunidad: {currentNodeName || 'Abastos Norte'}
          </h3>
          <p className="text-xs sm:text-sm text-[#8a7a6b]">
            Productos disponibles para compra en grupo esta semana.
          </p>
        </div>
        <button className="text-brand-orange hover:text-brand-orange-hover text-sm font-semibold flex items-center space-x-1 cursor-pointer">
          <span>Ver todos</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Micro success notification */}
      {successItemName && (!heroProduct || successItemName !== heroProduct.name) && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2c2520] text-white py-3.5 px-5 rounded-xl shadow-2xl flex items-center space-x-3 border border-stone-700/80 animate-fade-in max-w-sm">
          <div className="bg-brand-orange p-1 rounded-md">
            <Check className="w-4 h-4 text-white" />
          </div>
          <p className="text-sm font-medium">
            Agregaste <strong className="text-brand-orange-light">{successItemName}</strong> al pedido grupal.
          </p>
        </div>
      )}

      {/* Main Grid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10" id="products-catalog-grid">
        {filteredProducts.filter(p => !heroProduct || p.id !== heroProduct.id).map((product) => {
          const isAgotado = product.status === 'agotado';
          const isFull = product.progressCurrent >= product.progressTarget;
          const isAlmostFull = !isAgotado && !isFull && (product.progressTarget - product.progressCurrent === 1);
          
          return (
            <div 
              key={product.id}
              className={`bg-white rounded-3xl border border-[#eae8e4] overflow-hidden flex flex-col justify-between shadow-xs transition-all duration-200 ${
                isAgotado ? 'opacity-70 bg-stone-50' : 'hover:-translate-y-1 hover:shadow-md'
              }`}
            >
              <div>
                {/* Image Section */}
                <div className="h-44 relative bg-gray-50 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-300 ${
                      isAgotado ? 'grayscale' : 'group-hover:scale-105'
                    }`}
                  />
                  
                  {/* Badge */}
                  <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-md shadow-xs ${
                    isAgotado 
                      ? 'bg-stone-500 text-white' 
                      : isFull
                      ? 'bg-teal-600/90 text-white'
                      : 'bg-stone-900/80 text-white'
                  }`}>
                    {isAgotado ? 'Bulto Cerrado' : `Bulto x ${product.progressTarget} ${product.unit}`}
                  </span>
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-3.5">
                  <div className="text-[10px] font-black tracking-widest text-[#a04a32] uppercase font-sans">
                    {product.category}
                  </div>
                  
                  <h4 className="font-display font-black text-base text-[#2c2520] tracking-tight leading-tight line-clamp-1 h-6">
                    {product.name}
                  </h4>

                  {/* Price display */}
                  <div className="flex flex-col">
                    <span className="text-xl font-bold text-[#e15a13] font-display">
                      ${product.priceWholesale.toLocaleString('es-AR')}
                      <span className="text-xs text-[#6b5e52] font-normal font-sans">
                        /{product.unit}
                      </span>
                    </span>
                    <span className="text-[11px] text-[#8a7a6b]">
                      Minorista: ${product.priceRetail.toLocaleString('es-AR')}/{product.unit}
                    </span>
                  </div>

                  {/* Progress segment if NOT agotado */}
                  {!isAgotado ? (
                    <div className="space-y-1 bg-[#f9f8f6] p-3 rounded-xl border border-[#f1efe9]">
                      <div className="flex justify-between items-center text-[11px] font-extrabold text-[#2c2520]">
                        <span>Progreso ({product.progressTarget}{product.unit})</span>
                        <span className="font-mono">{product.progressCurrent}/{product.progressTarget}</span>
                      </div>

                      {/* Visual bar */}
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-brand-orange rounded-full transition-all duration-300"
                          style={{ width: `${(product.progressCurrent / product.progressTarget) * 100}%` }}
                        />
                      </div>

                      <p className="text-[10px] h-3 text-[#6b5e52]">
                        {isFull 
                          ? '✅ Cerrado y en preparación' 
                          : isAlmostFull
                          ? `¡Falta 1 ${product.unit} para cerrar!`
                          : `Faltan ${product.progressTarget - product.progressCurrent} ${product.unit} para cerrar`
                        }
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 bg-stone-100 rounded-xl text-center space-y-1">
                      <p className="text-[11px] font-bold text-stone-600">Pedido en preparación</p>
                      <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-semibold bg-stone-200 text-stone-700 uppercase">
                        Agotado
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-5 pt-0">
                {isAgotado ? (
                  <button
                    disabled
                    className="w-full py-2.5 px-4 bg-stone-200 text-stone-500 font-semibold text-xs rounded-xl cursor-not-allowed text-center"
                  >
                    Agotado
                  </button>
                ) : isFull ? (
                  <button
                    onClick={() => handleAddClick(product)}
                    className="w-full py-2.5 px-4 bg-teal-50 border border-teal-200 text-teal-700 hover:bg-teal-100 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center space-x-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Sumar a pedido cerrado</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddClick(product)}
                    className="w-full py-2.5 px-4 bg-white border border-brand-orange text-brand-orange hover:bg-brand-orange/5 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>
                      {product.progressCurrent === 0 ? 'Iniciar bulto' : `Sumar ${product.unit}`}
                    </span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Wholesale Partner Promo Card (Socio Mayorista) */}
      <div id="partner-promo-card" className="bg-[#f5eeda] border border-[#e3d0bf] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap gap-2">
            <span className="bg-brand-orange text-white text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
              Nuevo Proveedor
            </span>
            <span className="bg-[#8c6b4f] text-[#f7eedc] text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wide">
              Socio Mayorista
            </span>
          </div>
          <h4 className="font-display font-black text-xl text-[#2c2520]">
            Lácteos La Pradera
          </h4>
          <p className="text-xs sm:text-sm text-[#5c4e40] leading-relaxed">
            Quesos artesanales, manteca casera y dulce de leche directo del campo lácteo bonaerense. Organiza compras al por mayor con tu nodo y ahorra hasta un 40% en consumo familiar.
          </p>
        </div>

        <button 
          onClick={() => {
            setSearchQuery('Lácteos');
            alert('¡Próximamente! Estamos cargando el catálogo de Lácteos la Pradera. Por ahora puedes comprar los excelentes productos activos.');
          }}
          className="bg-[#2c2520] hover:bg-[#1a1613] text-white text-xs font-bold py-3.5 px-6 rounded-xl transition-all shrink-0 cursor-pointer shadow-xs"
        >
          Ver catálogo del productor
        </button>
      </div>

    </div>
  );
}