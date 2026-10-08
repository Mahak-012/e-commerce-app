import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Truck, ShieldCheck, Tag, Headphones } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

export default function StoreServices() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const services = [
    {
      id: 1,
      icon: Truck,
      title: 'Worldwide Express Shipping',
      desc: 'Free trackable premium delivery on all orders above $150. Handled with absolute couture care straight to your doorstep.',
    },
    {
      id: 2,
      icon: ShieldCheck,
      title: '100% Money-Back Guarantee',
      desc: 'Not perfectly in love with your fit? Enjoy a hassle-free 30-day premium return policy with secure instant refunds.',
    },
    {
      id: 3,
      icon: Tag,
      title: 'Exclusive Designer Discounts',
      desc: 'Get access to seasonal capsule collection pricing, tier rewards, and insider-only premium loyalty vouchers.',
    },
    {
      id: 4,
      icon: Headphones,
      title: '24/7 Dedicated Support',
      desc: 'Our expert luxury style consultants are available round-the-clock via live chat for sizing & order help.',
    },
  ];

  return (
    <section ref={ref} className="w-full bg-white relative overflow-hidden select-none border-b border-neutral-100">

      <style>{`
        .ss-ghost { font-family: 'Playfair Display', serif; font-style: italic; font-weight: 700;
          -webkit-text-stroke: 1px rgba(0,0,0,0.045); color: transparent;
          user-select: none; pointer-events: none; line-height: 1; white-space: nowrap; }

        .ss-ring { transition: transform .7s cubic-bezier(.22,1,.36,1), opacity .5s; }
        .ss-item:hover .ss-ring { transform: rotate(90deg); opacity: 1; }

        .ss-title-line { transform: scaleX(0); transform-origin: left; transition: transform .5s cubic-bezier(.22,1,.36,1); }
        .ss-item:hover .ss-title-line { transform: scaleX(1); }

        @media (prefers-reduced-motion: reduce) {
          .ss-ring { transition: none !important; }
        }
      `}</style>

      {/* Ambient corner glow */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-amber-50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-rose-50 rounded-full blur-[120px] pointer-events-none" />

      {/* Ghost word */}
      <span className="ss-ghost absolute top-8 left-1/2 -translate-x-1/2 text-[4rem] sm:text-[6.5rem] opacity-70 pointer-events-none">
        Services
      </span>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-16 lg:py-20">

        {/* ── Header line ── */}
        <div className="flex items-center gap-4 justify-center mb-14 lg:mb-16">
          <motion.span
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, ease: EASE }}
            className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-neutral-300 origin-right" />
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="text-[10px] tracking-[0.4em] text-neutral-400 uppercase font-semibold text-center">
            The Mahak Standard
          </motion.span>
          <motion.span
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, ease: EASE }}
            className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-neutral-300 origin-left" />
        </div>

        {/* ── Grid with connecting hairline (desktop) ── */}
        <div className="relative">
          {/* Horizontal connector behind items */}
          <motion.span
            initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
            className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-px bg-neutral-100 origin-left" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">

            {services.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 34 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.75, delay: 0.25 + i * 0.12, ease: EASE }}
                  className="ss-item group relative flex flex-col items-center text-center px-2 pt-2 pb-3 rounded-2xl transition-transform duration-500 hover:-translate-y-2"
                >

                  {/* Ghost number */}
                  <span className="absolute -top-1 right-0 sm:right-2 font-serif italic font-bold text-[2.6rem] leading-none text-neutral-100 group-hover:text-amber-100 transition-colors duration-500 select-none pointer-events-none">
                    0{i + 1}
                  </span>

                  {/* Icon — circle + rotating dashed ring */}
                  <div className="relative mb-6">
                    {/* Dashed ring */}
                    <span className="ss-ring absolute -inset-1.5 rounded-full border border-dashed border-neutral-300 opacity-0 pointer-events-none" />

                    {/* Circle */}
                    <div className="relative w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center transition-all duration-500 group-hover:bg-neutral-900 group-hover:shadow-xl group-hover:shadow-neutral-200/60 group-hover:scale-105">
                      <Icon className="w-7 h-7 stroke-[1.25] text-neutral-800 transition-all duration-500 group-hover:text-white group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Title with sweep line */}
                  <h3 className="relative text-xs font-bold text-neutral-900 tracking-[0.18em] uppercase mb-3 pb-2">
                    {item.title}
                    <span className="ss-title-line absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
                  </h3>

                  <p className="text-[12px] text-neutral-500 leading-[1.85] font-light max-w-[260px]">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}