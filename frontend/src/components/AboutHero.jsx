import React from 'react';

// Se ha añadido font-sans para la tipografía geométrica y tracking-tight para un look más moderno en los títulos.
export default function AboutHero({ title, subtitle }) {
  return (
    <section className="bg-neutral-50 py-15 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold font-sans text-[#EC721A] mb-6 tracking-tight">
          {title}
        </h1>
        <p className="text-lg md:text-xl font-sans text-neutral-600 leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}