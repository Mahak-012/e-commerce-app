import React from 'react';
import { Truck, ShieldCheck, Tag, Headphones } from 'lucide-react';

export default function StoreServices() {

  const services = [
    {
      id: 1,
      icon: <Truck className="w-8 h-8 stroke-[1.25] text-neutral-800" />,
      title: "Worldwide Express Shipping",
      desc: "Free trackable premium delivery on all orders above $150. Handled with absolute couture care straight to your doorstep."
    },
    {
      id: 2,
      icon: <ShieldCheck className="w-8 h-8 stroke-[1.25] text-neutral-800" />,
      title: "100% Money-Back Guarantee",
      desc: "Not perfectly in love with your fit? Enjoy a hassle-free 30-day premium return policy with secure instant refunds."
    },
    {
      id: 3,
      icon: <Tag className="w-8 h-8 stroke-[1.25] text-neutral-800" />,
      title: "Exclusive Designer Discounts",
      desc: "Get access to seasonal capsule collection pricing, tier rewards, and insider-only premium loyalty vouchers."
    },
    {
      id: 4,
      icon: <Headphones className="w-8 h-8 stroke-[1.25] text-neutral-800" />,
      title: "24/7 Dedicated Support",
      desc: "Our expert luxury style consultants and care agents are available round-the-clock via live chat for sizing & order help."
    }
  ];

  return (
    <section className="w-full bg-white py-16 border-b border-neutral-100 select-none">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* Symmetric Grid Layout Track */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {services.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col items-center text-center group px-2"
            >
              {/* Minimal Circle Icon Frame Container with premium interaction */}
              <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mb-5 transition-all duration-500 group-hover:bg-[#111111] group-hover:text-white transform group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-neutral-200/50">
                <div className="transition-colors duration-500 group-hover:text-white [&>svg]:group-hover:text-white">
                  {item.icon}
                </div>
              </div>

              {/* Dynamic Service Meta Typography Texts */}
              <h3 className="text-xs font-bold text-neutral-900 tracking-[0.18em] uppercase mb-2.5 font-sans">
                {item.title}
              </h3>
              
              <p className="text-[12px] text-neutral-500 leading-relaxed font-light max-w-[260px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}