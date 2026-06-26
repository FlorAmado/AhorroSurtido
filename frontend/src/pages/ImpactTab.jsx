import React from 'react';
import { Leaf, Truck, Users, Share2, Award, ShoppingBag } from 'lucide-react';

export default function ImpactTab({ userSavings, onShareAlert }) {
  // Initial saving is $15,000, and userSavings gets appended if they completed checkout!
  const totalSavings = 15000 + userSavings;
  
  // Calculate equivalent basic food baskets (Canastas básicas)
  // Let's assume 1 basket is approximately $3,000 in this currency model. So $15,000 / 3000 = 5 baskets!
  const dynamicCanastas = Math.floor(totalSavings / 3000);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 animate-fade-in" id="impact-tab-container">
      
      {/* Title Header Section */}
      <div className="mb-8">
        <h2 className="font-display text-2xl sm:text-3xl font-black text-[#2c2520] tracking-tight">
          Tu Impacto
        </h2>
        <p className="text-xs sm:text-sm text-[#8a7a6b]">
          Resumen de ahorros y contribución ambiental.
        </p>
      </div>

      {/* Grid of Main Dashboard Indicators */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-stretch mb-8">
        
        {/* Left Side Large Donut Saver Card */}
        <div className="col-span-1 lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-[#eae8e4] shadow-xs flex flex-col justify-between">
          <div className="text-[11px] font-extrabold tracking-wider text-[#8a7a6b] uppercase mb-4 sm:mb-2">
            Ahorro Mensual Acumulado
          </div>
          
          {/* Centered Donut Progress Segment */}
          <div className="my-6 flex items-center justify-center">
            <div className="relative w-52 h-52 flex items-center justify-center">
              {/* Outer circle progress track border */}
              <svg className="absolute w-full h-full transform -rotate-90">
                <circle
                  cx="104"
                  cy="104"
                  r="85"
                  className="stroke-[#f4ece1]"
                  strokeWidth="12"
                  fill="transparent"
                />
                <circle
                  cx="104"
                  cy="104"
                  r="85"
                  className="stroke-brand-orange"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray="534"
                  strokeDashoffset="120"
                  strokeLinecap="round"
                />
              </svg>

              {/* Inside typography */}
              <div className="text-center space-y-0.5 z-10 select-none">
                <span className="font-display text-3xl sm:text-4xl font-black text-[#2c2520] tracking-tight block">
                  ${totalSavings.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </span>
                <span className="text-xs font-semibold text-[#8a7a6b] block">
                  Ahorrado este mes
                </span>
              </div>
            </div>
          </div>

          <div className="text-center text-xs text-[#8a7a6b] flex items-center justify-center space-x-1 pt-1 border-t border-stone-50">
            <span>Actualizado en tiempo real según el avance de bultos del nodo.</span>
          </div>
        </div>

        {/* Right Side Solid Orange Equivalence Card */}
        <div className="col-span-1 lg:col-span-4 bg-[#e15a13] text-white p-6 sm:p-8 rounded-3xl shadow-xs flex flex-col justify-between relative overflow-hidden select-none">
          {/* Abstract background highlight */}
          <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-white/5 rounded-full blur-2xl" />
          
          <div className="flex justify-between items-start mb-6">
            <span className="text-xs font-bold bg-[#cb4f0d] px-3.5 py-1.5 rounded-full uppercase tracking-wide">
              Equivalencia
            </span>
            <div className="bg-white/10 p-2 rounded-xl text-white">
              <ShoppingBag className="w-5.5 h-5.5" />
            </div>
          </div>

          <div className="space-y-3.5">
            <h3 className="font-display font-black text-2xl sm:text-3xl leading-tight">
              Ahorraste el equivalente a <span className="underline decoration-white/50">{dynamicCanastas} canastas básicas</span>
            </h3>
            <p className="text-xs sm:text-sm text-brand-orange-light/80 leading-relaxed font-normal">
              Comparado con precios de lista y góndola en supermercados tradicionales de tu zona residencial.
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-white/20 text-[11px] font-bold text-brand-orange-light/85 flex items-center space-x-1.5">
            <Award className="w-4 h-4 text-amber-300" />
            <span>Excelente rendimiento de compra</span>
          </div>
        </div>

      </div>

      {/* Row of Three Stats Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8" id="impact-stats-boxes-grid">
        
        {/* Box 1 (Impacto Ecológico) */}
        <div className="bg-white p-5 rounded-2xl border border-[#eae8e4] flex items-center space-x-4">
          <div className="bg-[#fef0e6] p-3 rounded-xl text-brand-orange shrink-0">
            <Leaf className="w-6 h-6 text-brand-orange" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-[#8a7a6b]">
              Impacto Ecológico
            </div>
            <p className="font-display font-black text-lg text-[#2c2520] mt-0.5">
              12kg <span className="text-xs font-semibold text-[#8a7a6b] font-sans">CO₂ evitado</span>
            </p>
          </div>
        </div>

        {/* Box 2 (Entrega Eficiente) */}
        <div className="bg-white p-5 rounded-2xl border border-[#eae8e4] flex items-center space-x-4">
          <div className="bg-sky-50 p-3 rounded-xl text-sky-600 shrink-0 border border-sky-100/50">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-[#8a7a6b]">
              Entrega Eficiente
            </div>
            <p className="font-display font-black text-lg text-[#2c2520] mt-0.5">
              4 <span className="text-xs font-semibold text-[#8a7a6b] font-sans">rutas consolidadas</span>
            </p>
          </div>
        </div>

        {/* Box 3 (Comunidad Nodos) */}
        <div className="bg-white p-5 rounded-2xl border border-[#eae8e4] flex items-center space-x-4">
          <div className="bg-[#f0eefc] p-3 rounded-xl text-indigo-600 shrink-0 border border-[#eae5fa]">
            <Users className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-[#8a7a6b]">
              Comunidad Nodos
            </div>
            <p className="font-display font-black text-lg text-[#2c2520] mt-0.5">
              3er <span className="text-xs font-semibold text-[#8a7a6b] font-sans">lugar en tu zona</span>
            </p>
          </div>
        </div>

      </div>

      {/* Footer Container - Share Impact Banner */}
      <div id="share-impact-banner" className="bg-[#faf9f6] border border-[#eae8e4] p-6 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="space-y-1">
          <h4 className="font-display font-black text-[#2c2520] text-lg">
            Comparte tu impacto
          </h4>
          <p className="text-xs sm:text-sm text-[#6b5e52]">
            Invita a tus vecinos al nodo y aumenta el ahorro colectivo de tu comunidad. ¡Cuantos más seamos, más rápido se cierran los bultos!
          </p>
        </div>

        <button
          onClick={onShareAlert}
          className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold py-3.5 px-6 rounded-xl flex items-center space-x-2 transition-all cursor-pointer shadow-xs whitespace-nowrap"
        >
          <Share2 className="w-4 h-4" />
          <span>Compartir Logro</span>
        </button>
      </div>

    </div>
  );
}
