import React from 'react';

export default function MissionCard({ title, text }) {
  return (
    <div className="p-6 border border-neutral-100 rounded-xl bg-white shadow-sm">
      <h2 className="text-2xl font-semibold font-sans text-neutral-800 mb-4 tracking-tight">
        {title}
      </h2>
      <p className="text-neutral-600 font-sans leading-relaxed ">
        {text}
      </p>
    </div>
  );
}