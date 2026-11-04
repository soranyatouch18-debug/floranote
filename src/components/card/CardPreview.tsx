import React from 'react';
import { useFlorist } from '../../context/FloristContext';
import { ArrowRight, Flower2, Heart, Lock } from 'lucide-react';

export const CardPreview: React.FC = () => {
  const { cardData, updateCardData, setCurrentTab } = useFlorist();

  // Style class maps
  const styleClasses = {
    'dusty-pink-blush': 'bg-[#F9EBEE] border-[#E8B7BD] text-[#453A38]',
    'cream-minimal': 'bg-[#FAF5F1] border-[#DFC8B8] text-[#453A38]',
    'botanical-sage': 'bg-[#E6EAE2] border-[#8D9B7A] text-[#453A38]',
    'vintage-kraft': 'bg-[#E8DCC9] border-[#CBB499] text-[#453A38]',
  };

  return (
    <div className="space-y-6">
      {/* Live Physical Card Mockup */}
      <div className="bg-cream-100 rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-elevated flex flex-col items-center">
        <div className="w-full flex items-center justify-between text-xs mb-3 text-deepBrown-400">
          <span className="font-serif font-bold text-deepBrown-500 text-sm">
            Live Greeting Card Preview
          </span>
          <span className="text-[11px] bg-cream-50 px-2.5 py-0.5 rounded-full border border-cream-300">
            Enclosed in sealed envelope
          </span>
        </div>

        {/* The Card Paper Sheet */}
        <div
          className={`w-full max-w-md aspect-[5/4] sm:aspect-[4/3] rounded-2xl p-6 sm:p-8 border-2 shadow-elevated relative flex flex-col justify-between transition-all duration-300 ${
            styleClasses[cardData.style]
          }`}
        >
          {/* Subtle botanical corner decoration */}
          <div className="absolute top-3 left-3 opacity-30 text-deepBrown-500">
            <Flower2 className="w-6 h-6" />
          </div>
          <div className="absolute bottom-3 right-3 opacity-30 text-deepBrown-500">
            <Flower2 className="w-6 h-6 rotate-180" />
          </div>

          {/* Card Top: Salutation */}
          <div>
            <div className="text-[11px] uppercase tracking-widest text-deepBrown-400 font-semibold mb-1">
              {cardData.occasion || 'Greeting'}
            </div>
            <div className="font-serif text-lg font-bold text-deepBrown-600">
              {cardData.recipientName.trim() ? `Dearest ${cardData.recipientName},` : 'Dearest,'}
            </div>
          </div>

          {/* Card Middle: Message Body */}
          <div className="my-auto py-2">
            <p
              className={`leading-relaxed text-deepBrown-600 ${
                cardData.useHandwriting
                  ? 'font-handwriting text-xl sm:text-2xl text-deepBrown-700'
                  : 'font-serif text-sm sm:text-base italic'
              }`}
            >
              "{cardData.message.trim() || 'Your personal thoughts and warm wishes will appear here...'}"
            </p>
          </div>

          {/* Card Bottom: Sign-off */}
          <div className="text-right pt-2 border-t border-deepBrown-500/10">
            {cardData.isAnonymous ? (
              <div className="flex items-center justify-end gap-1.5 text-xs text-dustyPink-600 font-medium">
                <Lock className="w-3.5 h-3.5" />
                <span>With quiet fondness, from a Secret Admirer</span>
              </div>
            ) : (
              <div>
                <span className="text-xs text-deepBrown-400 font-serif block">With warmth & affection,</span>
                <span className="font-serif text-sm font-bold text-deepBrown-600">
                  {cardData.senderName.trim() ? cardData.senderName : 'Someone who cares'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Editing Inputs Form */}
      <div className="bg-cream-50 rounded-2xl p-5 border border-cream-300 shadow-soft space-y-4">
        <h3 className="font-serif text-lg font-bold text-deepBrown-500">
          Personalize The Message
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-deepBrown-500 block mb-1">
              Recipient Name (optional on card)
            </label>
            <input
              type="text"
              value={cardData.recipientName}
              onChange={(e) => updateCardData({ recipientName: e.target.value })}
              placeholder="e.g., Sophea / My Favorite Person"
              className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-cream-300 text-deepBrown-500 placeholder-deepBrown-400/60 text-xs focus:outline-none focus:border-dustyPink-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-deepBrown-500 block mb-1">
              Sender Name (leave blank if anonymous)
            </label>
            <input
              type="text"
              value={cardData.senderName}
              disabled={cardData.isAnonymous}
              onChange={(e) => updateCardData({ senderName: e.target.value })}
              placeholder={cardData.isAnonymous ? 'Sender hidden (Anonymous Mode)' : 'e.g., Visal / From Me'}
              className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-cream-300 text-deepBrown-500 placeholder-deepBrown-400/60 text-xs focus:outline-none focus:border-dustyPink-500 disabled:opacity-50"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs font-semibold text-deepBrown-500">
              Message Content (or choose from templates on the left)
            </label>
            <span className="text-[10px] text-deepBrown-400">
              {cardData.message.length} characters
            </span>
          </div>
          <textarea
            rows={4}
            value={cardData.message}
            onChange={(e) => updateCardData({ message: e.target.value })}
            placeholder="Write your heartfelt message here..."
            className="w-full p-3.5 rounded-xl bg-cream-100 border border-cream-300 text-deepBrown-500 placeholder-deepBrown-400/60 text-xs focus:outline-none focus:border-dustyPink-500 resize-none leading-relaxed"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={() => setCurrentTab('review')}
          className="w-full py-3.5 px-4 rounded-xl bg-deepBrown-500 hover:bg-deepBrown-600 text-cream-100 font-medium text-xs uppercase tracking-wider transition-all shadow-soft flex items-center justify-center gap-2"
        >
          <span>Proceed to Delivery & Review (Step 5)</span>
          <ArrowRight className="w-4 h-4 text-dustyPink-300" />
        </button>
      </div>
    </div>
  );
};
