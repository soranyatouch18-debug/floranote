import React from 'react';
import { useFlorist } from '../../context/FloristContext';
import { Sparkles, Compass, ArrowRight, Flower2, Heart } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setCurrentTab } = useFlorist();

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:py-20">
      {/* Background soft ambient orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-dustyPink-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sage-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-100 border border-dustyPink-300 text-deepBrown-500 text-xs font-medium shadow-xs">
              <Flower2 className="w-3.5 h-3.5 text-dustyPink-500" />
              <span>Flora Note • Mindful Floriography & Custom Bouquets</span>
            </div>

            {/* Headline with " —without the florist small talk." removed */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-deepBrown-500 leading-[1.15]">
              Choose, customize & order <span className="italic font-normal text-dustyPink-500">meaningful flowers</span>.
            </h1>

            <p className="text-base sm:text-lg text-deepBrown-400 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Explore theoretical floriography, customize every stem, paper, and ribbon with live visual feedback, and deliver straight to any doorstep in Phnom Penh.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setCurrentTab('builder')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-deepBrown-500 hover:bg-deepBrown-600 text-cream-100 font-medium text-sm transition-all shadow-soft hover:shadow-elevated transform hover:-translate-y-0.5"
              >
                <Sparkles className="w-4 h-4 text-dustyPink-300" />
                <span>Customize Your Bouquet</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentTab('catalog')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-cream-50 hover:bg-cream-100 border border-cream-300 text-deepBrown-500 font-medium text-sm transition-all shadow-xs"
              >
                <Compass className="w-4 h-4 text-sage-600" />
                <span>Explore Meaning</span>
              </button>
            </div>

            {/* Minimal Subtext Indicators */}
            <div className="pt-6 border-t border-cream-300/70 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-deepBrown-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sage-500" />
                Theoretical & Deep Floriography
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-dustyPink-400" />
                Real Botanical Visualizer
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-deepBrown-400" />
                Hand-tied Phnom Penh Delivery
              </span>
            </div>
          </div>

          {/* Right Column: Minimal, Elegant Flora Note Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <div className="bg-cream-50 rounded-3xl p-8 border border-cream-300 shadow-soft relative overflow-hidden flex flex-col justify-between aspect-[4/4.5]">
                {/* Subtle top stamp */}
                <div className="flex items-center justify-between border-b border-cream-200 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-dustyPink-400" />
                    <span className="font-serif text-xs font-bold uppercase tracking-widest text-deepBrown-400">
                      Flora Note Studio
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-sage-600 bg-sage-50 px-2 py-0.5 rounded-md border border-sage-200">
                    Phnom Penh
                  </span>
                </div>

                {/* Minimal Center Poem / Thought */}
                <div className="my-auto py-6 space-y-3">
                  <span className="text-[11px] uppercase tracking-widest text-dustyPink-600 font-semibold block">
                    The Language of Flowers
                  </span>
                  <p className="font-serif text-2xl font-light italic text-deepBrown-500 leading-snug">
                    “A message written in petals, composed with intention, and received in quiet contemplation.”
                  </p>
                  <p className="text-xs text-deepBrown-400 leading-relaxed font-light">
                    Every botanical stem carries a theoretical essence—representing courage, forgiveness, gentle gratitude, or eternal remembrance.
                  </p>
                </div>

                {/* Minimal Bottom Footer */}
                <div className="pt-4 border-t border-cream-200 flex items-center justify-between text-xs text-deepBrown-400">
                  <span className="flex items-center gap-1 text-[11px] text-sage-600 font-medium">
                    <Heart className="w-3.5 h-3.5 text-dustyPink-500" />
                    <span>Mindfully Arranged</span>
                  </span>
                  <button
                    onClick={() => setCurrentTab('builder')}
                    className="text-xs font-semibold text-deepBrown-500 hover:text-dustyPink-600 transition-colors flex items-center gap-1"
                  >
                    <span>Begin Creating</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
