import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ label = 'Go Back', onClick, floating = false, className = '' }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) onClick();
    else navigate(-1);
  };

  /* Floating variant — fixed top-left, glassy */
  if (floating) {
    return (
      <button
        onClick={handleClick}
        aria-label={label}
        className={`fixed top-24 left-5 z-30 w-11 h-11 rounded-full bg-white/85 backdrop-blur-md border border-neutral-200 shadow-lg flex items-center justify-center text-neutral-700 hover:bg-neutral-900 hover:text-white hover:border-neutral-900 transition-all duration-300 active:scale-90 ${className}`}
      >
        <ArrowLeft size={17} />
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors text-xs font-semibold uppercase tracking-[0.15em] mb-6 group ${className}`}
    >
      <span className="w-7 h-7 rounded-full border border-neutral-200 group-hover:border-neutral-900 group-hover:bg-neutral-900 group-hover:text-white flex items-center justify-center transition-all duration-300">
        <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
      </span>
      {label}
    </button>
  );
}