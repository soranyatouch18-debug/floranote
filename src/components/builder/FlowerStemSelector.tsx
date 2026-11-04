import React, { useState } from 'react';
import { useFlorist } from '../../context/FloristContext';
import { FLOWERS_DATA } from '../../data/flowers';
import { Plus, Minus, Trash2, Sparkles, ChevronDown, Check } from 'lucide-react';
import { Flower } from '../../types';

export const FlowerStemSelector: React.FC = () => {
  const { selectedStems, updateStemQuantity, removeStem, addFlowerStem, updateStemColor } = useFlorist();
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <div className="bg-cream-50 rounded-2xl p-5 border border-cream-300 shadow-soft space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif text-lg font-bold text-deepBrown-500">
            2. Flowers & Quantities
          </h3>
          <p className="text-xs text-deepBrown-400">
            Pick your flower varieties, color variations, and quantities ($0.50 – $10.00).
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(!isAddOpen)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dustyPink-100 hover:bg-dustyPink-200 border border-dustyPink-300 text-deepBrown-500 text-xs font-semibold transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-dustyPink-600" />
          <span>Add Flower</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isAddOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Quick Add Dropdown Grid with Color Selection */}
      {isAddOpen && (
        <div className="p-4 bg-cream-100 rounded-xl border border-cream-300 space-y-3 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-deepBrown-500">
              Choose a flower and color to add to your bouquet:
            </span>
            <span className="text-[10px] text-deepBrown-400">
              Click a color dot to add that specific variety
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
            {FLOWERS_DATA.map(f => {
              const [previewColor, setPreviewColor] = [f.colors[0]?.name, f.colors[0]?.image];
              return (
                <div
                  key={f.id}
                  className="p-2.5 rounded-xl bg-cream-50 hover:bg-cream-100/80 border border-cream-200 text-left transition-all flex flex-col justify-between gap-2 shadow-2xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={f.colors[0]?.image || f.image}
                      alt={f.name}
                      className="w-10 h-10 rounded-lg object-contain bg-white/70 p-0.5 border border-cream-200 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-deepBrown-500 truncate">{f.name}</div>
                      <div className="text-[10px] text-dustyPink-600 font-medium">
                        ${f.pricePerStem.toFixed(2)}/{f.unit || 'stem'}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        addFlowerStem(f, f.colors[0]?.name, 2);
                        setIsAddOpen(false);
                      }}
                      className="px-2 py-1 rounded-lg bg-dustyPink-100 hover:bg-dustyPink-200 text-deepBrown-500 text-[10px] font-semibold transition-colors shrink-0 flex items-center gap-0.5"
                      title={`Add 2 stems of ${f.name} (${f.colors[0]?.name})`}
                    >
                      <Plus className="w-3 h-3 text-dustyPink-600" />
                      <span>Add</span>
                    </button>
                  </div>

                  {/* Color Swatches Grid */}
                  <div className="pt-1.5 border-t border-cream-200/60 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[9px] text-deepBrown-400">Colors:</span>
                    {f.colors.map(col => {
                      const isInBouquet = selectedStems.some(s => s.flower.id === f.id && s.color === col.name);
                      return (
                        <button
                          key={col.name}
                          type="button"
                          onClick={() => {
                            addFlowerStem(f, col.name, 2);
                            setIsAddOpen(false);
                          }}
                          className={`w-4 h-4 rounded-full border relative transition-transform hover:scale-125 ${
                            isInBouquet
                              ? 'ring-2 ring-dustyPink-400 border-white'
                              : 'border-cream-300 hover:border-deepBrown-400'
                          }`}
                          style={{ backgroundColor: col.hex }}
                          title={`Add ${col.name} (${f.name})`}
                        >
                          {isInBouquet && (
                            <span className="absolute inset-0 flex items-center justify-center text-[7px] text-white drop-shadow-xs">
                              •
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Current Stems List */}
      {selectedStems.length === 0 ? (
        <div className="text-center py-8 px-4 bg-cream-100 rounded-xl border border-dashed border-cream-300 text-deepBrown-400">
          <Sparkles className="w-6 h-6 text-dustyPink-400 mx-auto mb-2" />
          <p className="text-xs">Your bouquet currently has no flowers.</p>
          <button
            onClick={() => setIsAddOpen(true)}
            className="mt-2 text-xs font-semibold text-dustyPink-600 hover:underline"
          >
            Click here to choose your first bloom
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {selectedStems.map(stem => {
            const colorObj = stem.flower.colors.find(c => c.name === stem.color) || stem.flower.colors[0];
            const hexColor = colorObj?.hex || '#E8B7BD';
            const stemImage = colorObj?.image || stem.flower.image;

            return (
              <div
                key={`${stem.flower.id}-${stem.color}`}
                className="p-3.5 rounded-xl bg-cream-100 border border-cream-200 flex flex-col gap-3 transition-colors shadow-2xs"
              >
                {/* Main Stem Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {/* Flower Info & Color Switcher */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <img
                      src={stemImage}
                      alt={`${stem.flower.name} (${stem.color})`}
                      className="w-12 h-12 rounded-xl object-contain bg-white/80 p-1 border border-cream-200 shrink-0 shadow-xs"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-serif text-sm font-bold text-deepBrown-500 truncate">
                          {stem.flower.name}
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-cream-200 text-deepBrown-500 font-medium">
                          {stem.color}
                        </span>
                      </div>

                      {/* Switch Active Color Swatches */}
                      <div className="flex items-center gap-2 text-xs text-deepBrown-400 mt-1 flex-wrap">
                        <div className="flex items-center gap-1">
                          {stem.flower.colors.map(col => {
                            const isCur = stem.color === col.name;
                            return (
                              <button
                                key={col.name}
                                type="button"
                                onClick={() => updateStemColor(stem.flower.id, stem.color, col.name)}
                                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                                  isCur
                                    ? 'ring-2 ring-dustyPink-500 scale-125 border-cream-50 z-10'
                                    : 'border-cream-300 opacity-60 hover:opacity-100 hover:scale-110'
                                }`}
                                style={{ backgroundColor: col.hex }}
                                title={`Switch this line to ${col.name}`}
                              />
                            );
                          })}
                        </div>
                        <span className="text-[11px] text-dustyPink-600 font-medium">
                          ${stem.flower.pricePerStem.toFixed(2)}/{stem.flower.unit || 'stem'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Counter & Subtotal & Remove */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-cream-200">
                    <div className="flex items-center gap-2 bg-cream-50 rounded-xl p-1 border border-cream-300">
                      <button
                        onClick={() => updateStemQuantity(stem.flower.id, -1, stem.color)}
                        className="w-7 h-7 rounded-lg bg-cream-200 hover:bg-cream-300 text-deepBrown-500 flex items-center justify-center transition-colors"
                        title="Decrease"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-serif font-bold text-sm w-5 text-center text-deepBrown-500">
                        {stem.quantity}
                      </span>
                      <button
                        onClick={() => updateStemQuantity(stem.flower.id, 1, stem.color)}
                        className="w-7 h-7 rounded-lg bg-cream-200 hover:bg-cream-300 text-deepBrown-500 flex items-center justify-center transition-colors"
                        title="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right w-16">
                      <div className="text-xs font-bold text-deepBrown-500">
                        ${(stem.flower.pricePerStem * stem.quantity).toFixed(2)}
                      </div>
                    </div>

                    <button
                      onClick={() => removeStem(stem.flower.id, stem.color)}
                      className="text-deepBrown-300 hover:text-red-500 transition-colors p-1"
                      title="Remove stem"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Multi-Color Addition Section: Add the same flower in other available colors */}
                {stem.flower.colors.length > 1 && (
                  <div className="pt-2 border-t border-cream-200/70 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] text-deepBrown-400 font-medium">
                      + Add another color of {stem.flower.name}:
                    </span>
                    {stem.flower.colors.map(col => {
                      const isSameAsThis = col.name === stem.color;
                      const isAlreadyInBouquet = selectedStems.some(
                        s => s.flower.id === stem.flower.id && s.color === col.name
                      );

                      return (
                        <button
                          key={col.name}
                          type="button"
                          onClick={() => addFlowerStem(stem.flower, col.name, 2)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] transition-all border ${
                            isSameAsThis
                              ? 'bg-cream-200/50 border-cream-300 text-deepBrown-400 opacity-60'
                              : isAlreadyInBouquet
                              ? 'bg-dustyPink-50/70 border-dustyPink-200 text-deepBrown-600 hover:bg-dustyPink-100'
                              : 'bg-white hover:bg-dustyPink-50 border-cream-300 text-deepBrown-600 hover:border-dustyPink-400 shadow-2xs'
                          }`}
                          title={
                            isSameAsThis
                              ? `Current variety (${col.name}) - click to add +2 stems`
                              : isAlreadyInBouquet
                              ? `${col.name} is in bouquet - click to add +2 stems`
                              : `Add 2 stems of ${col.name}`
                          }
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: col.hex }}
                          />
                          <span className="font-medium">{col.name}</span>
                          <span className="text-[9px] text-dustyPink-600 font-bold">
                            {isSameAsThis || isAlreadyInBouquet ? '+2' : '+ Add'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
