import React from 'react';
import { useFlorist } from '../../context/FloristContext';
import { CardStyle } from '../../types';
import { Palette, EyeOff, PenTool, Check } from 'lucide-react';

export const CardStyleSelector: React.FC = () => {
  const { cardData, updateCardData } = useFlorist();

  const cardStyles: { id: CardStyle; name: string; bg: string; border: string; desc: string }[] = [
    {
      id: 'dusty-pink-blush',
      name: 'Dusty Pink Romance',
      bg: 'bg-dustyPink-100',
      border: 'border-dustyPink-300',
      desc: 'Soft blush tones with romantic warmth'
    },
    {
      id: 'cream-minimal',
      name: 'Warm Cream Editorial',
      bg: 'bg-cream-100',
      border: 'border-cream-300',
      desc: 'Clean, elegant, and timeless minimalism'
    },
    {
      id: 'botanical-sage',
      name: 'Botanical Sage Garden',
      bg: 'bg-sage-100',
      border: 'border-sage-300',
      desc: 'Natural greenery with serene poise'
    },
    {
      id: 'vintage-kraft',
      name: 'Rustic Artisan Kraft',
      bg: 'bg-amber-100/60',
      border: 'border-amber-300/80',
      desc: 'Earthy recycled fiber aesthetic'
    }
  ];

  return (
    <div className="bg-cream-50 rounded-2xl p-5 border border-cream-300 shadow-soft space-y-4">
      <div>
        <h3 className="font-serif text-lg font-bold text-deepBrown-500 flex items-center gap-2">
          <Palette className="w-4 h-4 text-dustyPink-500" />
          <span>Card Aesthetics & Privacy</span>
        </h3>
        <p className="text-xs text-deepBrown-400">
          Personalize the paper aesthetic and choose whether to include your name.
        </p>
      </div>

      {/* Style Choices */}
      <div className="grid grid-cols-2 gap-2.5">
        {cardStyles.map(st => {
          const isSelected = cardData.style === st.id;
          return (
            <button
              key={st.id}
              onClick={() => updateCardData({ style: st.id })}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'border-dustyPink-500 bg-cream-100 shadow-xs ring-1 ring-dustyPink-400'
                  : 'border-cream-200 bg-cream-50 hover:bg-cream-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`w-4 h-4 rounded-full ${st.bg} border ${st.border}`} />
                {isSelected && <Check className="w-3.5 h-3.5 text-dustyPink-600" />}
              </div>
              <div className="text-xs font-semibold text-deepBrown-500">{st.name}</div>
              <div className="text-[10px] text-deepBrown-400">{st.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Toggles */}
      <div className="pt-3 border-t border-cream-200 space-y-3">
        {/* Handwriting Toggle */}
        <label className="flex items-center justify-between p-3 rounded-xl bg-cream-100 border border-cream-200 cursor-pointer">
          <div className="flex items-center gap-2.5">
            <PenTool className="w-4 h-4 text-deepBrown-500" />
            <div>
              <div className="text-xs font-semibold text-deepBrown-500">Handwritten Calligraphy Style</div>
              <div className="text-[10px] text-deepBrown-400">Simulate pen-written ink inside the physical greeting card</div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={cardData.useHandwriting}
            onChange={(e) => updateCardData({ useHandwriting: e.target.checked })}
            className="w-4 h-4 rounded text-dustyPink-500 focus:ring-dustyPink-400 accent-dustyPink-500"
          />
        </label>

        {/* Anonymity / Introvert Toggle */}
        <label className="flex items-center justify-between p-3 rounded-xl bg-cream-100 border border-cream-200 cursor-pointer">
          <div className="flex items-center gap-2.5">
            <EyeOff className="w-4 h-4 text-dustyPink-600" />
            <div>
              <div className="text-xs font-semibold text-deepBrown-500">Secret Admirer / Anonymous Mode</div>
              <div className="text-[10px] text-deepBrown-400">Hide sender name from the card and delivery label</div>
            </div>
          </div>
          <input
            type="checkbox"
            checked={cardData.isAnonymous}
            onChange={(e) => updateCardData({ isAnonymous: e.target.checked })}
            className="w-4 h-4 rounded text-dustyPink-500 focus:ring-dustyPink-400 accent-dustyPink-500"
          />
        </label>
      </div>
    </div>
  );
};
