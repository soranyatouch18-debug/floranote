import React from 'react';
import { BouquetVisualizer2D } from '../components/builder/BouquetVisualizer2D';
import { SizeSelector } from '../components/builder/SizeSelector';
import { FlowerStemSelector } from '../components/builder/FlowerStemSelector';
import { FillerSelector } from '../components/builder/FillerSelector';
import { WrapperSelector } from '../components/builder/WrapperSelector';
import { RibbonSelector } from '../components/builder/RibbonSelector';
import { PriceSummaryBar } from '../components/builder/PriceSummaryBar';
import { Sparkles, Palette, Undo2 } from 'lucide-react';
import { useFlorist } from '../context/FloristContext';

export const BuilderPage: React.FC = () => {
  const { clearBouquet, totalStemsCount } = useFlorist();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cream-300 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream-100 border border-dustyPink-300 text-deepBrown-500 text-xs font-medium mb-1.5">
            <Palette className="w-3.5 h-3.5 text-dustyPink-500" />
            <span>Interactive Floral Studio • Page 3</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-deepBrown-500">
            Customize Your Bouquet
          </h1>
          <p className="text-xs text-deepBrown-400 mt-1">
            Pick your favorite flowers, counts, Korean wrapping paper, and satin ribbons. See your creation come alive in real-time.
          </p>
        </div>

        {totalStemsCount > 0 && (
          <button
            onClick={clearBouquet}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cream-100 hover:bg-cream-200 border border-cream-300 text-deepBrown-400 hover:text-deepBrown-600 text-xs transition-colors"
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>Start Over</span>
          </button>
        )}
      </div>

      {/* Main Builder Layout: Sticky Preview on Left, Controls on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 2D Visualizer & Floriography Synthesis (Sticky on Desktop) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <BouquetVisualizer2D />
        </div>

        {/* Right Column: Customization Controls & Modules */}
        <div className="lg:col-span-7 space-y-6">
          <SizeSelector />
          <FlowerStemSelector />
          <FillerSelector />
          <WrapperSelector />
          <RibbonSelector />
          <PriceSummaryBar />
        </div>
      </div>
    </div>
  );
};
