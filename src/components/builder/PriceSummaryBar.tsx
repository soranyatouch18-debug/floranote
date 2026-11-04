import React from 'react';
import { useFlorist } from '../../context/FloristContext';
import { ArrowRight, AlertCircle, Layers } from 'lucide-react';

export const PriceSummaryBar: React.FC = () => {
  const {
    bouquetSize,
    stemsSubtotal,
    greenerySubtotal,
    wrappingStyle,
    selectedWrappings,
    wrappingSubtotal,
    selectedRibbon,
    totalBouquetCost,
    totalStemsCount,
    setCurrentTab
  } = useFlorist();

  const isBouquetEmpty = totalStemsCount === 0;

  return (
    <div className="bg-cream-50 rounded-2xl p-5 border border-cream-300 shadow-soft space-y-4">
      <div className="flex items-center justify-between border-b border-cream-200 pb-3">
        <h3 className="font-serif text-lg font-bold text-deepBrown-500">
          Bouquet Cost Breakdown
        </h3>
        <span className="text-xs text-sage-600 font-semibold bg-sage-50 px-2 py-0.5 rounded-full border border-sage-200">
          Flowers $0.50 - $2.00 (USD)
        </span>
      </div>

      <div className="space-y-2 text-xs text-deepBrown-400">
        <div className="flex justify-between">
          <span>Bouquet Size: <span className="font-semibold text-deepBrown-500">{bouquetSize.name}</span> ({bouquetSize.dimensions})</span>
          <span className="font-medium text-sage-600">Selected</span>
        </div>

        <div className="flex justify-between">
          <span>Flowers Selected ({totalStemsCount} flowers)</span>
          <span className="font-semibold text-deepBrown-500">${stemsSubtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Decorative Greenery</span>
          <span className="font-semibold text-deepBrown-500">${greenerySubtotal.toFixed(2)}</span>
        </div>
        
        {/* Wrapping breakdown */}
        <div className="flex justify-between">
          <span>
            Wrapping ({wrappingStyle.name} • {selectedWrappings.length} {selectedWrappings.length === 1 ? 'Paper' : 'Papers'})
          </span>
          <span className="font-semibold text-deepBrown-500">${wrappingSubtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Waist Ribbon ({selectedRibbon.name})</span>
          <span className="font-semibold text-deepBrown-500">${selectedRibbon.price.toFixed(2)}</span>
        </div>

        <div className="border-t border-cream-200 pt-2 flex justify-between items-baseline text-deepBrown-500">
          <span className="font-serif text-base font-bold">Bouquet Total:</span>
          <span className="font-serif text-2xl font-bold text-dustyPink-600">
            ${totalBouquetCost.toFixed(2)}
          </span>
        </div>
      </div>

      {isBouquetEmpty && (
        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Please add at least 1 flower to proceed.</span>
        </div>
      )}

      <button
        onClick={() => setCurrentTab('card')}
        disabled={isBouquetEmpty}
        className="w-full py-3.5 px-4 rounded-xl bg-deepBrown-500 hover:bg-deepBrown-600 disabled:opacity-50 text-cream-100 font-medium text-xs uppercase tracking-wider transition-all shadow-soft flex items-center justify-center gap-2"
      >
        <span>Proceed to Greeting Card (Step 4)</span>
        <ArrowRight className="w-4 h-4 text-dustyPink-300" />
      </button>
    </div>
  );
};
