import React, { useState } from 'react';
import { useFlorist } from '../../context/FloristContext';
import { OCCASIONS_LIST, MESSAGE_TEMPLATES } from '../../data/templates';
import { Sparkles, Check } from 'lucide-react';

export const TemplateSelector: React.FC = () => {
  const { cardData, updateCardData } = useFlorist();
  const [selectedOccasion, setSelectedOccasion] = useState<string>(cardData.occasion || OCCASIONS_LIST[0]);

  const filteredTemplates = MESSAGE_TEMPLATES.filter(
    t => t.occasion.toLowerCase() === selectedOccasion.toLowerCase()
  );

  const handleSelectTemplate = (text: string) => {
    updateCardData({
      occasion: selectedOccasion,
      message: text
    });
  };

  return (
    <div className="bg-cream-50 rounded-2xl p-5 border border-cream-300 shadow-soft space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif text-lg font-bold text-deepBrown-500 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-dustyPink-500" />
            <span>Curated Message Templates</span>
          </h3>
          <p className="text-xs text-deepBrown-400">
            For introverts and thoughtful gifters who want words crafted with grace.
          </p>
        </div>
      </div>

      {/* Occasion Scroll / Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {OCCASIONS_LIST.map(occ => {
          const isActive = selectedOccasion === occ;
          return (
            <button
              key={occ}
              onClick={() => {
                setSelectedOccasion(occ);
                updateCardData({ occasion: occ });
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium shrink-0 transition-all ${
                isActive
                  ? 'bg-deepBrown-500 text-cream-100 shadow-xs'
                  : 'bg-cream-200/70 text-deepBrown-500 hover:bg-cream-300/60'
              }`}
            >
              {occ}
            </button>
          );
        })}
      </div>

      {/* Templates List */}
      <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
        {filteredTemplates.map(tpl => {
          const isSelected = cardData.message === tpl.text;
          return (
            <div
              key={tpl.id}
              onClick={() => handleSelectTemplate(tpl.text)}
              className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                isSelected
                  ? 'bg-cream-100 border-dustyPink-500 shadow-xs ring-1 ring-dustyPink-400'
                  : 'bg-cream-100/60 border-cream-200 hover:bg-cream-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-serif text-xs font-bold text-deepBrown-500">
                  {tpl.title}
                </span>
                <span className="text-[10px] font-semibold text-sage-600 bg-sage-50 px-2 py-0.5 rounded-full border border-sage-200">
                  {tpl.tone}
                </span>
              </div>
              <p className="text-xs text-deepBrown-400 line-clamp-3 leading-relaxed">
                "{tpl.text}"
              </p>
              <div className="mt-2 flex items-center justify-end text-[11px] font-semibold text-dustyPink-600">
                {isSelected ? (
                  <span className="flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Selected
                  </span>
                ) : (
                  <span>Click to Apply →</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
