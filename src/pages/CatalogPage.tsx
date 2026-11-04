import React, { useState, useMemo } from 'react';
import { FLOWERS_DATA } from '../data/flowers';
import { Flower } from '../types';
import { FlowerCard } from '../components/catalog/FlowerCard';
import { FilterBar } from '../components/catalog/FilterBar';
import { QuantityGuideModal } from '../components/catalog/QuantityGuideModal';
import { FlowerDetailModal } from '../components/catalog/FlowerDetailModal';
import { Compass, Sparkles } from 'lucide-react';

export const CatalogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedColor, setSelectedColor] = useState('All');
  const [selectedFlowerForDetail, setSelectedFlowerForDetail] = useState<Flower | null>(null);
  const [selectedColorForModal, setSelectedColorForModal] = useState<string | undefined>(undefined);
  const [isQuantityGuideOpen, setIsQuantityGuideOpen] = useState(false);

  // Filter logic
  const filteredFlowers = useMemo(() => {
    return FLOWERS_DATA.filter(flower => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        flower.name.toLowerCase().includes(q) ||
        flower.botanicalName.toLowerCase().includes(q) ||
        flower.primaryMeaning.toLowerCase().includes(q) ||
        flower.theoreticalPhilosophy.toLowerCase().includes(q) ||
        flower.psychologicalResonance.toLowerCase().includes(q) ||
        flower.bestOccasions.some(o => o.toLowerCase().includes(q));

      const matchesCategory = (() => {
        if (selectedCategory === 'all') return true;
        if (selectedCategory === 'romance') {
          return flower.bestOccasions.some(o => ['Romance', 'Anniversary', 'Valentine'].includes(o));
        }
        if (selectedCategory === 'gratitude') {
          return flower.bestOccasions.some(o => ['Gratitude', 'Mother’s Day'].includes(o));
        }
        if (selectedCategory === 'apology') {
          return flower.bestOccasions.some(o => ['Apology', 'Reconciliation'].includes(o));
        }
        if (selectedCategory === 'friendship') {
          return flower.bestOccasions.some(o => ['Friendship', 'Just Because'].includes(o));
        }
        if (selectedCategory === 'cheer') {
          return flower.bestOccasions.some(o => ['Cheer Up', 'Thinking of You'].includes(o));
        }
        if (selectedCategory === 'celebration') {
          return flower.bestOccasions.some(o => ['Birthday', 'Graduation', 'Congratulations'].includes(o));
        }
        return true;
      })();

      const matchesColor = (() => {
        if (selectedColor === 'All') return true;
        return flower.colors.some(c => c.name.toLowerCase().includes(selectedColor.toLowerCase()));
      })();

      return matchesSearch && matchesCategory && matchesColor;
    });
  }, [searchQuery, selectedCategory, selectedColor]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream-100 border border-dustyPink-300 text-deepBrown-500 text-xs font-medium">
          <Compass className="w-3.5 h-3.5 text-sage-600" />
          <span>The Floriography Library</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-deepBrown-500">
          Flower Meanings & Symbolism
        </h1>
        <p className="text-sm text-deepBrown-400">
          Discover the heartfelt meaning and emotional intention behind every blossom.
        </p>
      </div>

      {/* Filter Controls */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        onOpenQuantityGuide={() => setIsQuantityGuideOpen(true)}
      />

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-deepBrown-400 px-1">
        <span>
          Showing <span className="font-semibold text-deepBrown-500">{filteredFlowers.length}</span> blooms with theoretical meanings
        </span>
        <button
          onClick={() => setIsQuantityGuideOpen(true)}
          className="text-dustyPink-600 hover:underline flex items-center gap-1 font-medium"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quantity Symbolism Guide</span>
        </button>
      </div>

      {/* Flower Cards Grid */}
      {filteredFlowers.length === 0 ? (
        <div className="text-center py-16 bg-cream-50 rounded-2xl border border-cream-300">
          <p className="font-serif text-lg text-deepBrown-500">No flowers match your current filter.</p>
          <p className="text-xs text-deepBrown-400 mt-1">Try resetting the search query or emotion category.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSelectedColor('All');
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-dustyPink-300 text-deepBrown-500 text-xs font-semibold hover:bg-dustyPink-400 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFlowers.map(flower => (
            <FlowerCard
              key={flower.id}
              flower={flower}
              onOpenDetails={(fl, initialColor) => {
                setSelectedFlowerForDetail(fl);
                setSelectedColorForModal(initialColor);
              }}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <QuantityGuideModal
        isOpen={isQuantityGuideOpen}
        onClose={() => setIsQuantityGuideOpen(false)}
      />

      <FlowerDetailModal
        flower={selectedFlowerForDetail}
        initialColor={selectedColorForModal}
        onClose={() => {
          setSelectedFlowerForDetail(null);
          setSelectedColorForModal(undefined);
        }}
      />
    </div>
  );
};
