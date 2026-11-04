import React from 'react';
import { useFlorist } from '../../context/FloristContext';
import { Flower2, Compass, Sparkles, Mail, ShoppingBag } from 'lucide-react';
import { PageTab } from '../../types';

export const Navbar: React.FC = () => {
  const { currentTab, setCurrentTab, totalStemsCount, totalBouquetCost } = useFlorist();

  const navItems: { tab: PageTab; label: string; icon: React.ReactNode }[] = [
    { tab: 'home', label: 'Home', icon: <Flower2 className="w-4 h-4" /> },
    { tab: 'catalog', label: 'Meaning', icon: <Compass className="w-4 h-4" /> }, // "Exclude stems"
    { tab: 'builder', label: 'Bouquet Builder', icon: <Sparkles className="w-4 h-4" /> },
    { tab: 'card', label: 'Greeting Card', icon: <Mail className="w-4 h-4" /> },
    { tab: 'review', label: 'Delivery & Review', icon: <ShoppingBag className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-cream-100/90 backdrop-blur-md border-b border-cream-300/60 shadow-sm transition-all">
      {/* Top subtle reassurance bar */}
      <div className="bg-deepBrown-500 text-cream-100 text-xs py-1.5 px-4 text-center tracking-wider font-light flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-dustyPink-300" />
        <span>Flora Note • Mindful Floriography & Custom Bouquets • Phnom Penh Delivery</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo: Flora Note */}
        <button
          onClick={() => setCurrentTab('home')}
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-11 h-11 rounded-full bg-dustyPink-100 border border-dustyPink-300 flex items-center justify-center text-dustyPink-600 shadow-sm group-hover:bg-dustyPink-200 transition-colors">
            <Flower2 className="w-6 h-6" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-deepBrown-500 block leading-tight">
              Flora Note
            </span>
            <span className="text-[11px] tracking-widest uppercase text-sage-600 font-medium block">
              Mindful Floriography Studio
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map(item => {
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => setCurrentTab(item.tab)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-deepBrown-500 text-cream-100 shadow-sm'
                    : 'text-deepBrown-500/80 hover:text-deepBrown-700 hover:bg-cream-300/40'
                }`}
              >
                <span className={isActive ? 'text-dustyPink-300' : 'text-sage-500'}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Cart Pill & Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentTab('builder')}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-cream-50 border border-dustyPink-300 text-deepBrown-500 hover:border-dustyPink-500 hover:shadow-soft transition-all"
            title="View your custom bouquet composition"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 text-deepBrown-500" />
              {totalStemsCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-dustyPink-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalStemsCount}
                </span>
              )}
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-[11px] text-deepBrown-400 leading-none">Bouquet</div>
              <div className="text-sm font-semibold text-deepBrown-500 leading-tight">
                ${totalBouquetCost.toFixed(2)}
              </div>
            </div>
          </button>

          <button
            onClick={() => setCurrentTab('builder')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-dustyPink-300 hover:bg-dustyPink-400 text-deepBrown-500 transition-colors shadow-sm"
          >
            Customizer
          </button>
        </div>
      </div>
    </header>
  );
};
