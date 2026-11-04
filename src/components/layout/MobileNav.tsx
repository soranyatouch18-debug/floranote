import React from 'react';
import { useFlorist } from '../../context/FloristContext';
import { Flower2, Compass, Sparkles, Mail, CheckCircle2 } from 'lucide-react';
import { PageTab } from '../../types';

export const MobileNav: React.FC = () => {
  const { currentTab, setCurrentTab, totalStemsCount } = useFlorist();

  const navItems: { tab: PageTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { tab: 'home', label: 'Home', icon: <Flower2 className="w-5 h-5" /> },
    { tab: 'catalog', label: 'Meaning', icon: <Compass className="w-5 h-5" /> }, // "Exclude stems"
    { tab: 'builder', label: 'Builder', icon: <Sparkles className="w-5 h-5" />, badge: totalStemsCount },
    { tab: 'card', label: 'Card', icon: <Mail className="w-5 h-5" /> },
    { tab: 'review', label: 'Delivery', icon: <CheckCircle2 className="w-5 h-5" /> },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-cream-50/95 backdrop-blur-lg border-t border-cream-300 py-2 px-3 shadow-elevated">
      <div className="flex items-center justify-around">
        {navItems.map(item => {
          const isActive = currentTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => setCurrentTab(item.tab)}
              className={`flex flex-col items-center justify-center flex-1 py-1 relative transition-colors ${
                isActive ? 'text-dustyPink-600 font-semibold' : 'text-deepBrown-400 hover:text-deepBrown-500'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-dustyPink-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-dustyPink-500 absolute -bottom-1" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
