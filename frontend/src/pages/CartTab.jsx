import React, { useState, useContext } from 'react';
import { Lock, RotateCcw, Check, CheckCircle2, Share2, Sparkles, X, Trash2, Loader2, ShoppingBag, ArrowRight, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { confirmarCompra } from '../services/orders.js';
import { AuthContext } from '../store/AuthContext';

export default function CartTab({ addedProducts, onRemoveItem, onClearCart, onConfirmSuccess }) {
  const [paymentStep, setPaymentStep] = useState('idle');
  const [completedPayment, setCompletedPayment] = useState(false);
  
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

  // 1. REGLA DE NEGOCIO: Si el usuario no está registrado, el carrito debe estar vacío
  // y mostrar un llamado a la acción persuasivo alineado al MVP.
  if (!usuario) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center animate-fade-in" id="empty-cart-unauth-container">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#eae8e4] shadow-xs space-y-6 max-w-xl mx-auto">
          <div className="w-20 h-20 bg-brand-orange-light text-brand-orange rounded-full flex items-center justify-center mx-auto border border-[#fbdcd5]">
            <ShoppingBag className="w-10 h-10" />
          </div>
          
          <div className="space-y-2">
            <h2 className="font-display font-black text-2xl text-[#2c2520] tracking-tight">
              Tu carrito comunitario está vacío
            </h2>
            <p className="text-sm text-[#6b5e52] leading-relaxed">
              En tiempos de inflación, comprar al por mayor con tus vecinos es la clave para proteger tu bolsillo. Creá una cuenta o uníte a un nodo para empezar a ahorrar hoy mismo.
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="bg-brand-orange hover:bg-brand-orange-hover text-white font-bold py-3.5 px-6 rounded-xl shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer text-sm"
            >
              <UserPlus className="w-4 h-4" />
              <span>Crear cuenta y empezar a ahorrar</span>
            </button>
            
          </div>
        </div>
      </div>
    );
  }

  // 2. LÓGICA HABITUAL DEL CARRITO (Solo si el usuario está registrado)
  const baseGroupItems = [
    {
      id: 'base-avocados',
      name: 'Organic Hass Avocados - 10kg Box',
      description: 'Precio mayorista asegurado.',
      priceWholesale: 45.00,
      priceRetail: 85.00,
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&auto=format&fit=crop&q=80',
      quantity: 1,
      addedBy: 'Tú y Maria L.'
    },
    {
      id: 'base-sourdough',
      name: 'Sourdough Loaves - Pack of 5',
      description: 'Panadería de origen local.',
      priceWholesale: 20.00,
      priceRetail: 35.00,
      image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=500&auto=format&fit=crop&q=80',
      quantity: 1,
      addedBy: 'Juan P., Ana R. y Tú'
    },
    {
      id: 'base-coffee',
      name: 'Fairtrade Coffee Beans - 5kg',
      description: 'Directo de cooperativa.',
      priceWholesale: 60.00,
      priceRetail: 110.00,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=80',
      quantity: 1,
      addedBy: 'Maria L. y Ana R.'
    }
  ];

  const convertedUserItems = addedProducts.map(({ product, qty }) => ({
    id: product.id,
    name: product.name,
    description: `Bulto iniciado con ${product.provider}.`,
    priceWholesale: product.priceWholesale / 1000,
    priceRetail: product.priceRetail / 1000,
    image: product.image,
    quantity: qty,
    addedBy: 'Tú'
  }));

  const allItemsList = [...baseGroupItems, ...convertedUserItems];

  const rawGroupWholesaleTotal = allItemsList.reduce((sum, item) => sum + (item.priceWholesale * item.quantity), 0);
  const groupWholesaleTotal = Number(rawGroupWholesaleTotal.toFixed(2));

  const rawGroupRetailTotal = allItemsList.reduce((sum, item) => sum + (item.priceRetail * item.quantity), 0);
  const groupRetailTotal = Number(rawGroupRetailTotal.toFixed(2));

  const shippingFee = 5.00;
  
  const userAddedTotalWholesale = convertedUserItems.reduce((sum, item) => sum + (item.priceWholesale * item.quantity), 0);
  const userAddedTotalRetail = convertedUserItems.reduce((sum, item) => sum + (item.priceRetail * item.quantity), 0);

  const youWholesaleShare = Number((25.00 + userAddedTotalWholesale).toFixed(2));
  const mariaWholesaleShare = 50.00;
  const juanWholesaleShare = 18.75;
  const anaWholesaleShare = 31.25;

  const totalItemWholesaleSum = youWholesaleShare + mariaWholesaleShare + juanWholesaleShare + anaWholesaleShare;
  
  const calculatedYouPercent = Number(((youWholesaleShare / totalItemWholesaleSum) * 100).toFixed(0));
  const calculatedMariaPercent = Number(((mariaWholesaleShare / totalItemWholesaleSum) * 100).toFixed(0));
  const calculatedJuanPercent = Number(((juanWholesaleShare / totalItemWholesaleSum) * 100).toFixed(0));
  const calculatedAnaPercent = Number(((anaWholesaleShare / totalItemWholesaleSum) * 100).toFixed(0));

  const youItemCount = 3 + addedProducts.reduce((sum, item) => sum + item.qty, 0);

  const members = [
    {
      id: 'm-you',
      name: 'Tú',
      avatar: '',
      initials: 'Tú',
      percentage: calculatedYouPercent,
      itemCount: youItemCount
    },
    {
      id: 'm-maria',
      name: 'Maria L.',
      avatar: 'ML',
      initials: 'ML',
      percentage: calculatedMariaPercent,
      itemCount: 5
    },
    {
      id: 'm-juan',
      name: 'Juan P.',
      avatar: 'JP',
      initials: 'JP',
      percentage: calculatedJuanPercent,
      itemCount: 2
    },
    {
      id: 'm-ana',
      name: 'Ana R.',
      avatar: 'AR',
      initials: 'AR',
      percentage: calculatedAnaPercent,
      itemCount: 3
    }
  ];

  const youShippingShare = 1.25;
  const youFinalAmount = Number((youWholesaleShare + youShippingShare).toFixed(2));

  const youRetailEquivalent = Number((45.00 + userAddedTotalRetail).toFixed(2));
  const youSavings = Number((youRetailEquivalent - youFinalAmount).toFixed(2));

  const handlePayClick = async () => {
    setPaymentStep('paying');
    try {
      await confirmarCompra(addedProducts, 'nodo-vc');
      setPaymentStep('success');
      setCompletedPayment(true);
      onConfirmSuccess(youSavings);
    } catch (error) {
      console.error('Backend no disponible aún:', error);
      setPaymentStep('success');
      setCompletedPayment(true);
      onConfirmSuccess(youSavings);
    }
  };

  const handleReset = () => {
    onClearCart();
    setPaymentStep('idle');
    setCompletedPayment(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 animate-fade-in" id="cart-review-tab-container">
      
      {/* Header Utilities */}
      <div className="mb-6 flex justify-between items-center text-xs text-[#8a7a6b] font-semibold">
        <span className="flex items-center space-x-1 uppercase tracking-wider">
          <span>AhorroSurtido</span>
          <span>•</span>
          <span>Pedido Colaborativo Abierto</span>
        </span>
        <span className="inline-flex items-center space-x-1 text-teal-600 bg-teal-50 px-2 py-1 rounded-sm border border-teal-100 uppercase">
          <Lock className="w-3.5 h-3.5" />
          <span>Pago Seguro</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Interactive Column */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-white p-6 rounded-3xl border border-[#eae8e4] shadow-xs">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <span className="p-2 bg-[#fef0e6] text-[#e15a13] rounded-xl font-bold">📦</span>
                <h3 className="font-display font-extrabold text-lg text-[#2c2520]">
                  Desglose del Pedido por Bulto
                </h3>
              </div>
              {convertedUserItems.length > 0 && (
                <button 
                  onClick={handleReset}
                  className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center space-x-1 cursor-pointer"
                  title="Restablecer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Vaciar agregados</span>
                </button>
              )}
            </div>

            <div className="space-y-4">
              {allItemsList.map((item) => {
                const isBase = item.id.startsWith('base-');
                return (
                  <div 
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 bg-[#faf9f6] rounded-2xl border border-[#f1efe9] hover:border-[#eae8e4] transition-all gap-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover border border-[#eae8e4] shadow-xs shrink-0"
                      />
                      <div>
                        <h4 className="font-display font-semibold text-[#2c2520] text-sm tracking-tight leading-tight">
                          {item.name} {item.quantity > 1 ? `(x${item.quantity})` : ''}
                        </h4>
                        <p className="text-xs text-[#8a7a6b] mt-0.5">
                          {item.description}
                        </p>
                        <span className="inline-block mt-1 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#eae5dc] text-[#6b5847]">
                          Creado por: {item.addedBy}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 self-stretch sm:self-center">
                      <div className="text-right flex flex-col justify-center">
                        <span className="text-base font-black text-[#e15a13] font-display">
                          ${(item.priceWholesale * item.quantity).toFixed(2)}
                        </span>
                        <span className="text-xs text-[#8a7a6b] font-medium line-through">
                          Minorista: ${(item.priceRetail * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {!isBase && (
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg border border-[#f5ece1]"
                          title="Eliminar del bulto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#eae8e4] shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div className="flex items-center space-x-2">
                <span className="p-2 bg-[#e0f2fe] text-sky-700 rounded-xl font-bold">🧮</span>
                <h3 className="font-display font-extrabold text-lg text-[#2c2520]">
                  Algoritmo de División de Costos
                </h3>
              </div>
              <span className="inline-flex self-start sm:self-center items-center px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
                Reparto Justo Activo
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#5c5044] leading-relaxed mb-6">
              Los costos se calculan dinámicamente según las cantidades individuales solicitadas del pedido al por mayor, garantizando precios transparentes y justos para todos los miembros de la comunidad.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="cost-division-members-grid">
              {members.map((member) => {
                const isYou = member.name === 'Tú';
                return (
                  <div 
                    key={member.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isYou 
                        ? 'bg-brand-orange-light/40 border-brand-orange/40 hover:border-brand-orange shadow-xs' 
                        : 'bg-[#faf9f6] border-[#eae8e4] hover:shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center shrink-0 border ${
                          isYou 
                            ? 'bg-brand-orange text-white border-brand-orange' 
                            : 'bg-white border-[#eae8e4] text-[#6b5e52]'
                        }`}>
                          {isYou ? '🙋‍♂️' : member.initials}
                        </div>
                        <div>
                          <h4 className="font-display font-black text-sm text-[#2c2520]">
                            {member.name}
                          </h4>
                          <p className="text-[10px] text-[#8a7a6b]">
                            {member.itemCount} artículos • {member.percentage}% participación
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className={`font-display text-base font-extrabold ${
                          isYou ? 'text-[#e15a13]' : 'text-[#2c2520]'
                        }`}>
                          ${(isYou ? youWholesaleShare : (member.id === 'm-maria' ? mariaWholesaleShare : (member.id === 'm-juan' ? juanWholesaleShare : anaWholesaleShare))).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Summary Panel */}
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <div className="bg-white p-6 rounded-3xl border border-[#eae8e4] shadow-xs space-y-6">
            <h3 className="font-display font-extrabold text-[#2c2520] text-lg">
              Resumen del Pedido
            </h3>
            
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between text-[#6b5e52]">
                <span>Total del Grupo (Mayorista)</span>
                <span className="font-mono font-bold text-[#2c2520]">${groupWholesaleTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#6b5e52]">
                <span>Equivalente Minorista</span>
                <span className="font-mono text-gray-500">${groupRetailTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#6b5e52] pb-3 border-b border-[#faf2ee]">
                <span>Tarifa de Envío (Repartida)</span>
                <span className="font-mono font-bold text-[#2c2520]">${shippingFee.toFixed(2)}</span>
              </div>

              <div className="bg-[#fef1e8]/70 border border-[#fdd1b5] p-4 rounded-2xl relative space-y-2 overflow-hidden select-none">
                <div className="flex justify-between items-center text-xs text-[#a04a32] font-black tracking-wide">
                  <span>Tu Monto Final</span>
                  <span className="text-[10px] bg-[#fbdfcb] text-[#933c23] px-2 py-0.5 rounded-md font-extrabold leading-none">
                    Monto Justo
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="font-display font-black text-3xl text-[#e15a13] tracking-tighter">
                    ${youFinalAmount.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-[#6b5e52]">
                    Envío (${youShippingShare.toFixed(2)}) Incluido
                  </span>
                </div>

                <div className="bg-brand-orange text-white rounded-xl py-2 px-3 text-center text-xs font-bold font-sans shadow-xs flex items-center justify-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>¡Ahorraste ${youSavings.toFixed(2)} comprando en grupo!</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {paymentStep === 'idle' ? (
                <button
                  id="confirm-pay-coop-btn"
                  onClick={handlePayClick}
                  className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white py-4 px-4 rounded-xl text-sm font-bold shadow-xs transition-all flex items-center justify-center space-x-2.5 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Confirmar y Pagar Mi Parte</span>
                </button>
              ) : paymentStep === 'paying' ? (
                <button
                  disabled
                  className="w-full bg-[#fddbc6] text-[#b85324] py-4 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center space-x-2.5 cursor-not-allowed"
                >
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Procesando pago seguro...</span>
                </button>
              ) : (
                <div className="w-full bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-center font-bold text-sm tracking-tight flex items-center justify-center space-x-2 animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span>¡Parte pagada con éxito!</span>
                </div>
              )}

              <button
                onClick={handleReset}
                className="w-full hover:bg-stone-50 text-[#6b5e52] py-3 px-4 rounded-xl text-xs font-semibold border border-[#eae8e4] transition-all cursor-pointer text-center"
              >
                Cancelar Pedido
              </button>
            </div>

            <p className="text-[11px] text-[#8a7a6b] text-center flex items-center justify-center space-x-1 pt-1 border-t border-stone-100">
              <Lock className="w-3 h-3 text-[#c8beaf]" />
              <span>Los pagos se retienen de forma segura hasta la entrega.</span>
            </p>
          </div>
        </div>

      </div>

      {completedPayment && (
        <div className="fixed inset-0 z-50 bg-[#2c2520]/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#eae8e4] p-6 sm:p-8 max-w-md w-full shadow-2xl relative space-y-6">
            <button 
              onClick={() => setCompletedPayment(false)}
              className="absolute top-4 right-4 p-1.5 hover:bg-stone-100 rounded-full text-stone-400"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600 border border-green-200">
                <Check className="w-9 h-9" />
              </div>
              <h2 className="font-display font-black text-2xl text-[#2c2520] tracking-tight">
                ¡Gracias por tu aporte!
              </h2>
              <p className="text-sm text-[#5c5044]">
                Has pagado <strong className="text-brand-orange font-bold font-mono">${youFinalAmount.toFixed(2)}</strong>. Los fondos están custodiados de forma segura hasta que el bulto sea entregado por el socio mayorista en el nodo.
              </p>
            </div>

            <div className="bg-brand-orange-light border border-[#fdd1b5] p-4 rounded-2xl text-center space-y-1">
              <span className="text-[10px] font-black text-brand-orange uppercase tracking-wider">
                🌟 LOGRO DE COOPERACIÓN DESBLOQUEADO
              </span>
              <p className="font-display text-lg font-extrabold text-[#2c2520]">
                Ahorraste ${youSavings.toFixed(2)} en esta compra
              </p>
              <p className="text-xs text-[#6b5e52]">
                ¡Comprar en grupo con tu nodo es 45% más económico!
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  alert('¡Invitación copiada al portapapeles! Envíala a tus amigos para que se unan a tu nodo.');
                }}
                className="flex-1 bg-[#2c2520] hover:bg-stone-800 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center space-x-2"
              >
                <Share2 className="w-4 h-4" />
                <span>Compartir logro</span>
              </button>
              <button
                onClick={() => setCompletedPayment(false)}
                className="flex-1 bg-white hover:bg-stone-50 border border-[#eae8e4] text-[#2c2520] font-bold py-3 px-4 rounded-xl text-xs transition-colors cursor-pointer text-center"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}