import React, { useState, useEffect } from 'react';
import { Flower } from '../../types';
import { useFlorist } from '../../context/FloristContext';
import { X, Sparkles, Check, Plus, Minus, BookOpen, HeartHandshake } from 'lucide-react';

interface FlowerDetailModalProps {
  flower: Flower | null;
  initialColor?: string;
  onClose: () => void;
}

export const FlowerDetailModal: React.FC<FlowerDetailModalProps> = ({ flower, initialColor, onClose }) => {
  const { addFlowerStem, setCurrentTab } = useFlorist();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(3);

  useEffect(() => {
    if (flower) {
      setSelectedColor(initialColor || flower.colors[0]?.name || '');
    }
  }, [flower, initialColor]);

  if (!flower) return null;

  const activeColorObj = flower.colors.find(c => c.name === (selectedColor || flower.colors[0]?.name)) || flower.colors[0];
  const activeColor = activeColorObj?.name || 'Standard';
  const displayImage = activeColorObj?.image || flower.image;

  const handleAddAndCustomize = () => {
    addFlowerStem(flower, activeColor, quantity);
    onClose();
    setCurrentTab('builder');
  };

  const handleAddOnly = () => {
    addFlowerStem(flower, activeColor, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deepBrown-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-cream-100 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-cream-300 shadow-elevated flex flex-col">
        {/* Header with Flower PNG Display */}
        <div className="relative h-60 sm:h-68 w-full bg-cream-50 border-b border-cream-200 flex items-center justify-center p-6 transition-colors">
          <img
            key={displayImage}
            src={displayImage}
            alt={`${flower.name} in ${activeColor}`}
            className="max-h-full max-w-full object-contain filter drop-shadow-lg transition-transform duration-300 hover:scale-105"
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-cream-200 hover:bg-cream-300 text-deepBrown-500 flex items-center justify-center transition-colors shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Current Variety Pill */}
          <div className="absolute top-4 left-6 bg-cream-50/95 backdrop-blur-md px-3 py-1 rounded-full border border-cream-300 text-xs font-semibold text-deepBrown-500 shadow-xs flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full border border-cream-300"
              style={{ backgroundColor: activeColorObj?.hex || '#EEC2CA' }}
            />
            <span>Variety: <strong className="text-dustyPink-600">{activeColor}</strong></span>
          </div>

          <div className="absolute bottom-3 left-6 right-6 flex items-baseline justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-dustyPink-600 font-semibold block mb-0.5">
                {flower.botanicalName}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-deepBrown-500">
                {flower.name}
              </h2>
            </div>
            <span className="font-serif text-2xl font-bold text-dustyPink-600">
              ${flower.pricePerStem.toFixed(2)} <span className="text-xs font-sans text-deepBrown-400">/ {flower.unit || 'stem'}</span>
            </span>
          </div>
        </div>

        {/* Content Body - Focused on Exact Meaning & Symbolism */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Exact Meaning Highlight */}
          <div className="bg-cream-50 rounded-2xl p-4 border border-dustyPink-300/80 space-y-1.5">
            <div className="flex items-center gap-2 text-dustyPink-600 font-serif font-bold text-base">
              <Sparkles className="w-4 h-4" />
              <span>Meaning & Symbolism:</span>
            </div>
            <p className="text-sm font-serif italic text-deepBrown-600 leading-snug">
              "{flower.primaryMeaning}"
            </p>
          </div>

          {/* Theoretical Philosophy Section */}
          <div className="bg-cream-50 rounded-2xl p-4 border border-cream-200 space-y-2">
            <div className="flex items-center gap-2 text-deepBrown-500 font-serif font-bold text-sm">
              <BookOpen className="w-4 h-4 text-sage-600" />
              <span>Theoretical & Historical Context</span>
            </div>
            <p className="text-xs text-deepBrown-500 leading-relaxed font-light">
              {flower.theoreticalPhilosophy}
            </p>
          </div>

          {/* Psychological & Emotional Resonance */}
          <div className="bg-cream-50 rounded-2xl p-4 border border-sage-200 space-y-1">
            <div className="flex items-center gap-2 text-sage-600 font-serif font-bold text-xs uppercase tracking-wider">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Subconscious Emotional Intent</span>
            </div>
            <p className="text-xs text-deepBrown-500 italic leading-relaxed">
              {flower.psychologicalResonance}
            </p>
          </div>

          {/* Color Variations with Photographic Switching */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs uppercase tracking-wider font-semibold text-deepBrown-400">
                Select Color Variety:
              </label>
              <span className="text-xs text-dustyPink-600 font-medium">
                Click to preview actual flower
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {flower.colors.map(col => {
                const isSelected = activeColor === col.name;
                return (
                  <button
                    key={col.name}
                    type="button"
                    onClick={() => setSelectedColor(col.name)}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-dustyPink-500 bg-cream-50 shadow-xs ring-1 ring-dustyPink-400'
                        : 'border-cream-300 bg-cream-50/50 hover:bg-cream-50'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full border border-cream-300 shadow-xs shrink-0"
                      style={{ backgroundColor: col.hex }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-deepBrown-500 flex items-center justify-between">
                        <span>{col.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-dustyPink-600" />}
                      </div>
                      {col.symbolism && (
                        <div className="text-[10px] text-deepBrown-400 truncate">
                          {col.symbolism}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="bg-cream-50 rounded-2xl p-4 border border-cream-200 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-deepBrown-500">Number of Flowers</div>
              <div className="text-[11px] text-deepBrown-400">
                Subtotal: ${(flower.pricePerStem * quantity).toFixed(2)}
              </div>
            </div>

            <div className="flex items-center gap-3 bg-cream-200 rounded-xl p-1 border border-cream-300">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-cream-100 hover:bg-cream-50 text-deepBrown-500 flex items-center justify-center transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-serif text-lg font-bold w-6 text-center text-deepBrown-500">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(50, quantity + 1))}
                className="w-8 h-8 rounded-lg bg-cream-100 hover:bg-cream-50 text-deepBrown-500 flex items-center justify-center transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-cream-50 border-t border-cream-300 flex flex-col sm:flex-row items-center gap-3 justify-end">
          <button
            onClick={handleAddOnly}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cream-200 hover:bg-cream-300 text-deepBrown-500 text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Add ({activeColor}) & Keep Exploring
          </button>
          <button
            onClick={handleAddAndCustomize}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-deepBrown-500 hover:bg-deepBrown-600 text-cream-100 text-xs font-semibold uppercase tracking-wider transition-colors shadow-soft flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-dustyPink-300" />
            <span>Add {activeColor} to Bouquet Builder</span>
          </button>
        </div>
      </div>
    </div>
  );
};
