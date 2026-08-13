import React from 'react';
import { Users, ShieldCheck, TrendingUp } from 'lucide-react';
import AboutHero from '../components/AboutHero';
import MissionCard from '../components/MisionCards';
import ImpactItem from '../components/ImpactItem';

export default function AboutUs({ currentNodeName }) {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between font-sans">
      
      <main>
        <AboutHero 
          title="Conocé AhorroSurtido" 
          subtitle="Hacemos que comprar sea más barato, juntándonos entre todos. Cuidamos el bolsillo de la comunidad facilitando las compras colectivas." 
        />

        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <MissionCard 
              title="Nuestra Misión" 
              text="Facilitar el acceso a precios mayoristas para cualquier persona. Queremos que organizarse para comprar en cantidad sea un proceso simple, transparente y sin vueltas." 
            />
            <MissionCard 
              title="Nuestra Visión" 
              text="Convertirnos en el punto de encuentro de los barrios para potenciar el ahorro real. Creemos que la unión hace la fuerza, y también hace a los mejores descuentos." 
            />
          </div>
        </section>

        <section className="py-16 px-4 bg-neutral-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold font-sans text-center text-neutral-800 mb-12 tracking-tight">
              Cómo lo hacemos
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ImpactItem 
                icon={Users} 
                title="Ahorro en conjunto" 
                text="Compramos en bloque para conseguir precios que solos no podríamos alcanzar." 
              />
              <ImpactItem 
                icon={ShieldCheck} 
                title="Transparencia total" 
                text="Cuentas claras siempre. Sabés exactamente qué estás pagando y con quién lo compartís." 
              />
              <ImpactItem 
                icon={TrendingUp} 
                title="Crecimiento local" 
                text="Fomentamos la organización entre vecinos para que la plata rinda más en cada casa." 
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 text-center bg-white border-t border-neutral-100">
        <button className="px-6 py-2.5 bg-[#EC721A] hover:bg-[#d66212] text-white font-medium font-sans rounded-lg transition-colors duration-200 text-sm shadow-sm">
          Volver al inicio
        </button>
      </footer>

    </div>
  );
}