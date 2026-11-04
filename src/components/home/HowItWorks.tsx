import React from 'react';
import { useFlorist } from '../../context/FloristContext';
import { BookOpen, Palette, Send, ArrowRight } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { setCurrentTab } = useFlorist();

  const steps = [
    {
      step: '01',
      title: 'Discover Theoretical Meanings',
      desc: 'Browse blooms, prices ($0.50 – $2.00), and floriography. Uncover philosophical symbolism and subconscious intent so your gift speaks the exact sentiment of your heart.',
      icon: <BookOpen className="w-6 h-6 text-sage-500" />,
      cta: 'Explore Meaning',
      tab: 'catalog' as const
    },
    {
      step: '02',
      title: 'Visually Customize Your Bouquet',
      desc: 'Choose your preferred stems, counts, Korean wrapping paper, satin or velvet ribbons, and foliage. Watch your bouquet assemble live with real-time price updates.',
      icon: <Palette className="w-6 h-6 text-dustyPink-500" />,
      cta: 'Start Building',
      tab: 'builder' as const
    },
    {
      step: '03',
      title: 'Add a Card & Quiet Delivery',
      desc: 'Select or write a heartfelt message from curated templates. Enter delivery details, schedule a preferred time slot, and check out without making a single phone call.',
      icon: <Send className="w-6 h-6 text-deepBrown-500" />,
      cta: 'Review Delivery',
      tab: 'review' as const
    }
  ];

  return (
    <section className="py-16 bg-cream-100/60 border-y border-cream-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-semibold text-dustyPink-600 block mb-2">
            The Mindful Flow
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-deepBrown-500">
            How It Works in 3 Gentle Steps
          </h2>
          <p className="text-sm text-deepBrown-400 mt-2">
            No pressure, no hurried decisions. Take all the time you need to craft something truly meaningful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="bg-cream-50 rounded-2xl p-7 border border-cream-300 shadow-soft hover:shadow-elevated transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-cream-200 border border-cream-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="font-serif text-2xl font-bold text-cream-400 group-hover:text-dustyPink-400 transition-colors">
                    {item.step}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-semibold text-deepBrown-500 mb-2.5">
                  {item.title}
                </h3>
                <p className="text-xs text-deepBrown-400 leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <button
                onClick={() => setCurrentTab(item.tab)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-deepBrown-500 group-hover:text-dustyPink-600 transition-colors mt-auto pt-4 border-t border-cream-200"
              >
                <span>{item.cta}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
