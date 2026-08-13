import React from 'react';

export default function ImpactItem({ icon: Icon, title, text }) {
  return (
    <div className="text-center p-4">
      <div className="w-12 h-12 bg-[#EC721A]/10 text-[#EC721A] rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-semibold font-sans text-neutral-800 mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-neutral-600 font-sans text-sm leading-relaxed">
        {text}
      </p>
    </div>
  );
}