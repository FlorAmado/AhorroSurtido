import React, { useState } from 'react';
import { Lock, RotateCcw, Check, CheckCircle2, Share2, Sparkles, X, Trash2, Loader2, CreditCard } from 'lucide-react';
import { confirmarCompra } from '../services/orders.js';

export default function CartTab({ addedProducts, onRemoveItem, onClearCart, onConfirmSuccess }) {
  const [paymentStep, setPaymentStep] = useState('idle'); // 'idle' | 'select_method' | 'paying' | 'success'
  const [paymentMethod, setPaymentMethod] = useState('debito'); // 'debito' | 'credito'
  const [completedPayment, setCompletedPayment] = useState(false);

  // Default base group items in cooperative cart as seen in the mockup image 3:
  const baseGroupItems = [];
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

  // Math algorithm for the checkout
  const rawGroupWholesaleTotal = allItemsList.reduce((sum, item) => sum + (item.priceWholesale * item.quantity), 0);
  const groupWholesaleTotal = Number(rawGroupWholesaleTotal.toFixed(3));

  const rawGroupRetailTotal = allItemsList.reduce((sum, item) => sum + (item.priceRetail * item.quantity), 0);
  const groupRetailTotal = Number(rawGroupRetailTotal.toFixed(3));

  const shippingFee = 5.00;


  const userAddedTotalWholesale = convertedUserItems.reduce((sum, item) => sum + (item.priceWholesale * item.quantity), 0);
  const userAddedTotalRetail = convertedUserItems.reduce((sum, item) => sum + (item.priceRetail * item.quantity), 0);

  // Updated sums
  const youWholesaleShare = Number((userAddedTotalWholesale).toFixed(3));
  const mariaWholesaleShare = 50.00;
  const juanWholesaleShare = 18.75;
  const anaWholesaleShare = 31.25;

  // Calculate percentages
  const totalItemWholesaleSum = youWholesaleShare + mariaWholesaleShare + juanWholesaleShare + anaWholesaleShare;

  const calculatedYouPercent = Number(((youWholesaleShare / totalItemWholesaleSum) * 100).toFixed(0));
  const calculatedMariaPercent = Number(((mariaWholesaleShare / totalItemWholesaleSum) * 100).toFixed(0));
  const calculatedJuanPercent = Number(((juanWholesaleShare / totalItemWholesaleSum) * 100).toFixed(0));
  const calculatedAnaPercent = Number(((anaWholesaleShare / totalItemWholesaleSum) * 100).toFixed(0));

  // Items counting
  const youItemCount = addedProducts.reduce((sum, item) => sum + item.qty, 0);

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

  // Shipping Fee of $5.00 divided equally among the 4 members ($1.25 each)
  const youShippingShare = 1.25;
  const youFinalAmount = Number((youWholesaleShare + youShippingShare).toFixed(3));

  // Savings calculation:
  // Standard "Tú" retail equivalent is $45.00 plus user added items retail cost!
  const youRetailEquivalent = Number((6.7 + userAddedTotalRetail).toFixed(3));
  const youSavings = Number((youRetailEquivalent - youFinalAmount).toFixed(3));

  const handlePayClick = async () => {
    setPaymentStep('paying');
    try {
      // Cuando el backend esté listo, esto manda el pedido real
      await confirmarCompra(addedProducts, 'nodo-vc');
      setPaymentStep('success');
      setCompletedPayment(true);
      onConfirmSuccess(youSavings);
    } catch (error) {
      // Si el backend no está listo aún, igual funciona visualmente
      console.error('Backend no disponible aún:', error);
      setPaymentStep('success');
      setCompletedPayment(true);
      onConfirmSuccess(youSavings);
    }
  };

  const handleReset = () => {
    onClearCart();
    setPaymentStep('idle');
    setPaymentMethod('debito');
    setCompletedPayment(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 animate-fade-in" id="cart-review-tab-container">

      {/* Header Utilities */}
      <div className="mb-6 flex justify-between items-center text-xs text-[#8a7a6b] font-semibold">
        <span className="flex items-center space-x-1 uppercase tracking-wider">
          <span>•</span>
          <span>Pedido  Abierto</span>
        </span>
        <span className="inline-flex items-center space-x-1 text-teal-600 bg-teal-50 px-2 py-1 rounded-sm border border-teal-100 uppercase">
          <Lock className="w-3.5 h-3.5" />
          <span>Pago Seguro</span>
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Interactive Column (Bultos breakdown & cost division algorithm) */}
        <div className="lg:col-span-8 space-y-6">

          {/* Main Card 1 */}
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

            {/* List of items */}
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
                          ${(item.priceWholesale * item.quantity).toFixed(3)}
                        </span>
                        <span className="text-xs text-[#8a7a6b] font-medium line-through">
                          Minorista: ${(item.priceRetail * item.quantity).toFixed(3)}
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

          {/* Main Card 2 (Algorithm calculation block) */}
          <div className="bg-white p-6 rounded-3xl border border-[#eae8e4] shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div className="flex items-center space-x-2">
                <span className="p-2 bg-[#e0f2fe] text-sky-700 rounded-xl font-bold">🧮</span>
                <h3 className="font-display font-extrabold text-lg text-[#2c2520]">
                  División de Costos
                </h3>
              </div>
              <span className="inline-flex self-start sm:self-center items-center px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
                Reparto Justo
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#5c5044] leading-relaxed mb-6">
              Los costos se calculan automáticamente según las cantidades individuales solicitadas del pedido por mayor, garantizando transparencia para todos los miembros.
            </p>

            {/* Members breakdown grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="cost-division-members-grid">
              {members.map((member) => {
                const isYou = member.name === 'Tú';
                return (
                  <div
                    key={member.id}
                    className={`p-4 rounded-2xl border transition-all ${isYou
                        ? 'bg-brand-orange-light/40 border-brand-orange/40 hover:border-brand-orange shadow-xs'
                        : 'bg-[#faf9f6] border-[#eae8e4] hover:shadow-xs'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-9 h-9 rounded-full font-bold text-xs flex items-center justify-center shrink-0 border ${isYou
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
                        <span className={`font-display text-base font-extrabold ${isYou ? 'text-[#e15a13]' : 'text-[#2c2520]'
                          }`}>
                          ${(isYou ? youWholesaleShare : (member.id === 'm-maria' ? mariaWholesaleShare : (member.id === 'm-juan' ? juanWholesaleShare : anaWholesaleShare))).toFixed(3)}
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

            {/* Numbers List */}
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between text-[#6b5e52]">
                <span>Total del Grupo (Mayorista)</span>
                <span className="font-mono font-bold text-[#2c2520]">${totalItemWholesaleSum.toFixed(3)}</span>
              </div>
              <div className="flex justify-between text-[#6b5e52] pb-3 border-b border-[#faf2ee]">
                <span>Tarifa de Envío (Repartida)</span>
                <span className="font-mono font-bold text-[#2c2520]">${shippingFee.toFixed(3)}</span>
              </div>

              {/* Your Golden Final cost card block */}
              <div className="bg-[#fef1e8]/70 border border-[#fdd1b5] p-4 rounded-2xl relative space-y-2 overflow-hidden select-none">
                <div className="flex justify-between items-center text-xs text-[#a04a32] font-black tracking-wide">
                  <span>Tu Monto Final</span>
                  <span className="text-[10px] bg-[#fbdfcb] text-[#933c23] px-2 py-0.5 rounded-md font-extrabold leading-none">
                    Monto Justo
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="font-display font-black text-3xl text-[#e15a13] tracking-tighter">
                    ${youFinalAmount.toFixed(3)}
                  </span>
                  <span className="text-[10px] text-[#6b5e52]">
                    Envío (${youShippingShare.toFixed(3)}) Incluido
                  </span>
                </div>

                <div className="bg-brand-orange text-white rounded-xl py-2 px-3 text-center text-xs font-bold font-sans shadow-xs flex items-center justify-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>¡Ahorraste ${youSavings.toFixed(3)} comprando en grupo!</span>
                </div>
              </div>
            </div>

            {/* Action buttons list */}
            <div className="space-y-3">
              {paymentStep === 'idle' ? (
                <button
                  id="confirm-pay-coop-btn"
                  onClick={() => setPaymentStep('select_method')}
                  className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white py-4 px-4 rounded-xl text-sm font-bold shadow-xs transition-all flex items-center justify-center space-x-2.5 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Confirmar y Pagar Mi Parte</span>
                </button>
              ) : paymentStep === 'select_method' ? (
                <div className="bg-[#faf9f6] p-4 rounded-2xl border border-[#eae8e4] space-y-3 animate-fade-in shadow-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-[#eae8e4]">
                    <span className="text-xs font-bold text-[#2c2520] flex items-center space-x-1.5">
                      <CreditCard className="w-4 h-4 text-brand-orange" />
                      <span>Elegir forma de pago</span>
                    </span>
                    <button 
                      onClick={() => setPaymentStep('idle')} 
                      className="text-[11px] font-medium text-[#8a7a6b] hover:text-[#2c2520] underline cursor-pointer"
                    >
                      Volver
                    </button>
                  </div>

                  <div className="space-y-2">
                    {/* Option 1: Tarjeta de Débito */}
                    <div 
                      onClick={() => setPaymentMethod('debito')}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === 'debito'
                          ? 'bg-brand-orange-light/50 border-brand-orange text-[#2c2520] shadow-2xs'
                          : 'bg-white border-[#eae8e4] text-[#5c5044] hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          paymentMethod === 'debito' ? 'border-brand-orange bg-brand-orange' : 'border-stone-300 bg-white'
                        }`}>
                          {paymentMethod === 'debito' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <CreditCard className={`w-4 h-4 ${paymentMethod === 'debito' ? 'text-brand-orange' : 'text-[#8a7a6b]'}`} />
                        <span className="text-xs font-semibold">Tarjeta de Débito</span>
                      </div>
                      <span className="text-[10px] text-[#8a7a6b] font-mono">Sin recargo</span>
                    </div>

                    {/* Option 2: Tarjeta de Crédito */}
                    <div 
                      onClick={() => setPaymentMethod('credito')}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === 'credito'
                          ? 'bg-brand-orange-light/50 border-brand-orange text-[#2c2520] shadow-2xs'
                          : 'bg-white border-[#eae8e4] text-[#5c5044] hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          paymentMethod === 'credito' ? 'border-brand-orange bg-brand-orange' : 'border-stone-300 bg-white'
                        }`}>
                          {paymentMethod === 'credito' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <CreditCard className={`w-4 h-4 ${paymentMethod === 'credito' ? 'text-brand-orange' : 'text-[#8a7a6b]'}`} />
                        <span className="text-xs font-semibold">Tarjeta de Crédito</span>
                      </div>
                      <span className="text-[10px] text-[#8a7a6b] font-mono">1 pago</span>
                    </div>
                  </div>

                  <button
                    id="pay-selected-method-btn"
                    onClick={handlePayClick}
                    className="w-full mt-2 bg-brand-orange hover:bg-brand-orange-hover text-white py-3.5 px-4 rounded-xl text-sm font-bold shadow-xs transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Pagar (${youFinalAmount.toFixed(3)})</span>
                  </button>
                </div>
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

      {/* Payment Success modal popup design */}
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
                Has pagado <strong className="text-brand-orange font-bold font-mono">${youFinalAmount.toFixed(3)}</strong> con <strong className="text-[#2c2520]">{paymentMethod === 'debito' ? 'Tarjeta de Débito' : 'Tarjeta de Crédito'}</strong>. Los fondos están custodiados de forma segura hasta que el bulto sea entregado por el socio mayorista en el nodo.
              </p>
            </div>

            {/* Achievement savings indicator */}
            <div className="bg-brand-orange-light border border-[#fdd1b5] p-4 rounded-2xl text-center space-y-1">
              <span className="text-[10px] font-black text-brand-orange uppercase tracking-wider">
                🌟 LOGRO DE COOPERACIÓN DESBLOQUEADO
              </span>
              <p className="font-display text-lg font-extrabold text-[#2c2520]">
                Ahorraste ${youSavings.toFixed(3)} en esta compra
              </p>
              <p className="text-xs text-[#6b5e52]">
                ¡Comprar en grupo con tu nodo es mucho más económico!
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  alert('¡Invitación copiada al portapapeles! Envíala a tus amigos para que se unan a tu nodo de Villa Crespo.');
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
