import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors text-xs font-semibold uppercase tracking-[0.15em] mb-6 group"
    >
      <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
      Go Back
    </button>
  );
}