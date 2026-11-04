import React from 'react';
import { CardPreview } from '../components/card/CardPreview';
import { TemplateSelector } from '../components/card/TemplateSelector';
import { CardStyleSelector } from '../components/card/CardStyleSelector';
import { Mail, Sparkles } from 'lucide-react';

export const CardPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream-100 border border-dustyPink-300 text-deepBrown-500 text-xs font-medium">
          <Mail className="w-3.5 h-3.5 text-dustyPink-500" />
          <span>The Sentiment Studio • Page 4</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-deepBrown-500">
          Personal Greeting Card
        </h1>
        <p className="text-sm text-deepBrown-400">
          Write your personal thoughts or pick from our heartfelt, introvert-friendly templates. We print and seal each card by hand in Phnom Penh.
        </p>
      </div>

      {/* 2-Column Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Templates & Styles */}
        <div className="lg:col-span-5 space-y-6">
          <TemplateSelector />
          <CardStyleSelector />
        </div>

        {/* Right Column: Live Mockup Card & Form */}
        <div className="lg:col-span-7">
          <CardPreview />
        </div>
      </div>
    </div>
  );
};
