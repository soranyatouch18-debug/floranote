import React, { useState } from 'react';
import { useFlorist } from '../../context/FloristContext';
import { WRAPPING_OPTIONS, WRAPPING_STYLES, RIBBON_OPTIONS } from '../../data/flowers';
import { Sparkles, Eye, Palette, SplitSquareVertical, Maximize2 } from 'lucide-react';
import { Flower, BouquetSizeOption } from '../../types';

// Dynamic 3D lighting utility to calculate realistic tints and shadow depths from hex colors
function adjustColorBrightness(hex: string, percent: number): string {
  let hexClean = hex.replace('#', '');
  if (hexClean.length === 3) {
    hexClean = hexClean[0] + hexClean[0] + hexClean[1] + hexClean[1] + hexClean[2] + hexClean[2];
  }
  const num = parseInt(hexClean, 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + Math.round(255 * (percent / 100))));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + Math.round(255 * (percent / 100))));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + Math.round(255 * (percent / 100))));
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

export const BouquetVisualizer2D: React.FC = () => {
  const {
    bouquetSize,
    selectedStems,
    selectedGreenery,
    wrappingStyle,
    selectedWrappings,
    selectedRibbon,
    totalStemsCount,
    synthesizedMeaning,
    theoreticalInsight,
    quantityMeaningNote,
    setWrappingStyle,
    setSelectedWrappings,
    setRibbon
  } = useFlorist();

  // Preview Mode:
  // 'custom' = Realistic Hand-Tied Live Arrangement (adapts dynamically to size & choices)
  // 'sample' = Signature Bouquet Reference from florists
  // 'split'  = Side-by-side comparison
  const [viewMode, setViewMode] = useState<'custom' | 'sample' | 'split'>('custom');

  // Primary wrap (outer) and accent wrap (inner)
  const primaryWrap = selectedWrappings[0] || WRAPPING_OPTIONS[0];
  const accentWrap = selectedWrappings[1] || primaryWrap;
  const ribbonColor = selectedRibbon.colorHex;

  // Flatten stems into individual floral units with their specific color PNGs
  const flattenedStems: { flower: Flower; color: string; image: string; key: string }[] = [];
  selectedStems.forEach((stem) => {
    const colorObj = stem.flower.colors.find(c => c.name === stem.color) || stem.flower.colors[0];
    const flowerImg = colorObj?.image || stem.flower.image;
    for (let i = 0; i < stem.quantity; i++) {
      flattenedStems.push({
        flower: stem.flower,
        color: stem.color,
        image: flowerImg,
        key: `${stem.flower.id}-${stem.color}-${i}-${flattenedStems.length}`
      });
    }
  });

  // Scale factor based on selected Bouquet Size
  const scale = bouquetSize?.scaleFactor || 1.0;

  // Botanical size categorization (bloom head diameter scaled by bouquet size) - decreased ~25%
  const getBloomDiameter = (flowerId: string, count: number): number => {
    let base = 135;
    // Large Mass & Form blooms (Hydrangeas, Peonies, Sunflowers, Dahlias) - decreased 25% from 205
    if (['hydrangeas', 'peonies', 'sunflower', 'purple-dahlias'].includes(flowerId)) {
      base = 154;
    }
    // Classic Medium Focal blooms (Roses, Tulips, Gerberas, Lilies, Camellias, Carnations, Iris, Marigold, Gardenia) - decreased 25% from 185
    else if (['rose', 'tulips', 'camellias', 'gardenias', 'gerberas', 'lily', 'carnation', 'iris', 'marigold'].includes(flowerId)) {
      base = 139;
    }
    // Delicate Filler & Texture sprigs (Freesia, Chamomile, Lavender, Violet, Daisy, Larkspur, Lily of the Valley) - decreased 25% from 160
    else {
      base = 120;
    }

    // Adaptive volume boost for bouquets with fewer stems
    let countFactor = 1.0;
    if (count === 1) countFactor = 1.25;
    else if (count === 2) countFactor = 1.15;
    else if (count === 3) countFactor = 1.10;
    else if (count === 4) countFactor = 1.05;

    return Math.round(base * scale * countFactor);
  };

  // Generate balanced Florist Dome layout across the entire opening
  // Dynamically responsive to Bouquet Size (Small, Medium, Large)
  const generateDomeSlots = (count: number): { cx: number; cy: number; rot: number }[] => {
    // Sizing adjustments: Small bouquets have a tighter, slightly higher center
    const yShift = bouquetSize.id === 'small' ? 8 : bouquetSize.id === 'medium' ? 4 : 0;
    const xSpread = bouquetSize.id === 'small' ? 0.78 : bouquetSize.id === 'medium' ? 0.88 : 0.96;

    if (count === 1) {
      return [{ cx: 210, cy: 140 + yShift, rot: 0 }];
    }
    if (count === 2) {
      return [
        { cx: 210 - 40 * xSpread, cy: 144 + yShift, rot: -6 },
        { cx: 210 + 40 * xSpread, cy: 144 + yShift, rot: 6 }
      ];
    }
    if (count === 3) {
      return [
        { cx: 210, cy: 114 + yShift, rot: 0 },
        { cx: 210 - 52 * xSpread, cy: 154 + yShift, rot: -8 },
        { cx: 210 + 52 * xSpread, cy: 154 + yShift, rot: 8 }
      ];
    }
    if (count === 4) {
      return [
        { cx: 210, cy: 108 + yShift, rot: 0 },
        { cx: 210 - 58 * xSpread, cy: 144 + yShift, rot: -9 },
        { cx: 210 + 58 * xSpread, cy: 144 + yShift, rot: 9 },
        { cx: 210, cy: 172 + yShift, rot: 2 }
      ];
    }
    if (count === 5) {
      return [
        { cx: 210, cy: 104 + yShift, rot: 0 },
        { cx: 210 - 64 * xSpread, cy: 136 + yShift, rot: -10 },
        { cx: 210 + 64 * xSpread, cy: 136 + yShift, rot: 10 },
        { cx: 210 - 36 * xSpread, cy: 172 + yShift, rot: -6 },
        { cx: 210 + 36 * xSpread, cy: 172 + yShift, rot: 6 }
      ];
    }
    if (count === 6) {
      return [
        { cx: 210, cy: 102 + yShift, rot: 0 },
        { cx: 210 - 68 * xSpread, cy: 132 + yShift, rot: -10 },
        { cx: 210, cy: 142 + yShift, rot: 2 },
        { cx: 210 + 68 * xSpread, cy: 132 + yShift, rot: 10 },
        { cx: 210 - 42 * xSpread, cy: 174 + yShift, rot: -7 },
        { cx: 210 + 42 * xSpread, cy: 174 + yShift, rot: 7 }
      ];
    }
    if (count === 7) {
      return [
        { cx: 210, cy: 98 + yShift, rot: 0 },
        { cx: 210 - 70 * xSpread, cy: 126 + yShift, rot: -10 },
        { cx: 210 + 70 * xSpread, cy: 126 + yShift, rot: 10 },
        { cx: 210, cy: 138 + yShift, rot: 0 },
        { cx: 210 - 74 * xSpread, cy: 166 + yShift, rot: -12 },
        { cx: 210 + 74 * xSpread, cy: 166 + yShift, rot: 12 },
        { cx: 210, cy: 176 + yShift, rot: 2 }
      ];
    }
    if (count === 8) {
      return [
        { cx: 210, cy: 96 + yShift, rot: 0 },
        { cx: 210 - 68 * xSpread, cy: 120 + yShift, rot: -10 },
        { cx: 210 + 68 * xSpread, cy: 120 + yShift, rot: 10 },
        { cx: 210 - 36 * xSpread, cy: 144 + yShift, rot: -4 },
        { cx: 210 + 36 * xSpread, cy: 144 + yShift, rot: 4 },
        { cx: 210 - 76 * xSpread, cy: 166 + yShift, rot: -12 },
        { cx: 210 + 76 * xSpread, cy: 166 + yShift, rot: 12 },
        { cx: 210, cy: 176 + yShift, rot: 2 }
      ];
    }
    if (count === 9) {
      return [
        { cx: 210, cy: 94 + yShift, rot: 0 },
        { cx: 210 - 72 * xSpread, cy: 118 + yShift, rot: -10 },
        { cx: 210 + 72 * xSpread, cy: 118 + yShift, rot: 10 },
        { cx: 210, cy: 136 + yShift, rot: 0 },
        { cx: 210 - 46 * xSpread, cy: 152 + yShift, rot: -6 },
        { cx: 210 + 46 * xSpread, cy: 152 + yShift, rot: 6 },
        { cx: 210 - 78 * xSpread, cy: 168 + yShift, rot: -12 },
        { cx: 210 + 78 * xSpread, cy: 168 + yShift, rot: 12 },
        { cx: 210, cy: 178 + yShift, rot: 2 }
      ];
    }

    // General N >= 10: Layered concentric dome across Crown, Mid Core, and Front Lip
    const positions: { cx: number; cy: number; rot: number }[] = [];
    const crownCount = Math.max(3, Math.floor(count * 0.3));
    const lipCount = Math.max(3, Math.floor(count * 0.3));
    const coreCount = count - crownCount - lipCount;

    // 1. Crown Arc (top crown spanning across opening)
    for (let i = 0; i < crownCount; i++) {
      const t = crownCount === 1 ? 0.5 : i / (crownCount - 1);
      const angle = -Math.PI * 0.88 + t * (Math.PI * 0.76);
      const cx = 210 + Math.cos(angle) * (100 * xSpread);
      const cy = (136 + yShift) + Math.sin(angle) * 48;
      positions.push({
        cx: Math.round(cx),
        cy: Math.round(cy),
        rot: Math.round(Math.sin(t * Math.PI) * 12 * (t < 0.5 ? -1 : 1))
      });
    }

    // 2. Mid Core (heart of the bouquet)
    for (let i = 0; i < coreCount; i++) {
      const t = coreCount === 1 ? 0.5 : i / (coreCount - 1);
      const cx = 210 + (t - 0.5) * (158 * xSpread);
      const cy = (146 + yShift) + Math.sin(t * Math.PI) * 12;
      positions.push({
        cx: Math.round(cx),
        cy: Math.round(cy),
        rot: Math.round((t - 0.5) * 14)
      });
    }

    // 3. Front Lip (resting nestled on the wrapping paper collar)
    for (let i = 0; i < lipCount; i++) {
      const t = lipCount === 1 ? 0.5 : i / (lipCount - 1);
      const cx = 210 + (t - 0.5) * (168 * xSpread);
      const cy = (175 + yShift) + Math.sin(t * Math.PI) * 12;
      positions.push({
        cx: Math.round(cx),
        cy: Math.round(cy),
        rot: Math.round((t - 0.5) * 16)
      });
    }

    return positions;
  };

  // Interleave and balance stems across slots so identical flower types are symmetrically distributed
  const calculateArrangement = () => {
    const total = flattenedStems.length;
    if (total === 0) return [];

    const slots = generateDomeSlots(total);

    // Group stems by flower id and color for balanced botanical distribution
    const groups: { [key: string]: { flower: Flower; color: string; image: string; key: string }[] } = {};
    for (const s of flattenedStems) {
      const gKey = `${s.flower.id}_${s.color}`;
      if (!groups[gKey]) groups[gKey] = [];
      groups[gKey].push(s);
    }

    // Sort groups: mass blooms first, then form, then fillers
    const groupKeys = Object.keys(groups).sort((a, b) => {
      const idA = a.split('_')[0];
      const idB = b.split('_')[0];
      const isMassA = ['hydrangeas', 'peonies', 'sunflower', 'purple-dahlias'].includes(idA);
      const isMassB = ['hydrangeas', 'peonies', 'sunflower', 'purple-dahlias'].includes(idB);
      if (isMassA && !isMassB) return -1;
      if (!isMassA && isMassB) return 1;
      return groups[b].length - groups[a].length;
    });

    // Interleave stems across slots for visual balance
    const balancedStems: { flower: Flower; color: string; image: string; key: string }[] = [];
    while (balancedStems.length < total) {
      for (const k of groupKeys) {
        if (groups[k].length > 0) {
          balancedStems.push(groups[k].shift()!);
        }
      }
    }

    // Assemble flowers with their exact slot position, stem connections, and dimensions
    const flowersWithStems = slots.map((slot, idx) => {
      const stem = balancedStems[idx] || balancedStems[0];
      const diameter = getBloomDiameter(stem.flower.id, total);
      return {
        cx: slot.cx,
        cy: slot.cy,
        rotation: slot.rot,
        size: diameter,
        stem,
        idx
      };
    });

    // Sort by cy ascending so background flowers are drawn first, foreground flowers drawn on top
    return flowersWithStems.sort((a, b) => a.cy - b.cy);
  };

  const positionedFlowers = calculateArrangement();

  // Greenery items selected by customer (strictly customer-selected, no random foliage!)
  const flattenedGreenery: { id: string; name: string }[] = [];
  selectedGreenery.forEach((sg) => {
    for (let i = 0; i < sg.quantity; i++) {
      flattenedGreenery.push({ id: sg.greenery.id, name: sg.greenery.name });
    }
  });

  // Calculate natural asymmetrical positions for selected greenery stems
  const greeneryStems = flattenedGreenery.map((g, idx) => {
    const isLeft = idx % 2 === 0;
    const offsetFactor = Math.floor(idx / 2);
    const originX = isLeft ? 115 + offsetFactor * 16 : 305 - offsetFactor * 16;
    const originY = 135 + (idx * 16) % 32;
    const rot = isLeft ? -26 - (idx * 5) % 12 : 26 + (idx * 5) % 12;
    return {
      ...g,
      originX,
      originY,
      rot,
      idx
    };
  });

  // Quick action: Match Sample Bouquet Reference style
  const handleMatchSampleStyle = () => {
    const korean = WRAPPING_STYLES.find((s) => s.id === 'korean-dual') || WRAPPING_STYLES[0];
    setWrappingStyle(korean);

    const creamWrap = WRAPPING_OPTIONS.find((w) => w.id === 'matte-cream') || WRAPPING_OPTIONS[0];
    const pinkWrap = WRAPPING_OPTIONS.find((w) => w.id === 'glossy-blush') || WRAPPING_OPTIONS[1];
    setSelectedWrappings([creamWrap, pinkWrap]);

    const blushRibbon = RIBBON_OPTIONS.find((r) => r.id === 'rib-blush') || RIBBON_OPTIONS[0];
    setRibbon(blushRibbon);
  };

  return (
    <div className="bg-cream-100 rounded-3xl p-4 sm:p-5 border border-cream-300 shadow-elevated relative overflow-hidden flex flex-col items-center">
      {/* Top Header & Mode Switcher */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-deepBrown-500 text-sm tracking-wide">
              Bouquet Preview
            </span>
            <span className="text-[10px] bg-dustyPink-100 text-dustyPink-600 px-2 py-0.5 rounded-full font-semibold border border-dustyPink-200">
              {bouquetSize.name} Size ({bouquetSize.dimensions})
            </span>
          </div>
          <p className="text-[10px] text-deepBrown-400 mt-0.5">
            Style: <span className="font-semibold text-deepBrown-500">{wrappingStyle.name}</span> • {selectedWrappings.length} {selectedWrappings.length === 1 ? 'Paper' : 'Papers'} • {totalStemsCount} Stems
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 bg-cream-200/80 p-1 rounded-xl border border-cream-300 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('custom')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all flex items-center gap-1.5 ${
              viewMode === 'custom'
                ? 'bg-cream-50 text-deepBrown-600 font-semibold shadow-xs'
                : 'text-deepBrown-400 hover:text-deepBrown-600'
            }`}
            title="Photorealistic hand-tied bouquet adapting live to size and choices"
          >
            <Palette className="w-3 h-3 text-dustyPink-500" />
            <span>Custom</span>
          </button>
          <button
            onClick={() => setViewMode('sample')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all flex items-center gap-1.5 ${
              viewMode === 'sample'
                ? 'bg-cream-50 text-deepBrown-600 font-semibold shadow-xs'
                : 'text-deepBrown-400 hover:text-deepBrown-600'
            }`}
            title="Florist reference photograph"
          >
            <Eye className="w-3 h-3 text-sage-600" />
            <span>Sample Ref</span>
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition-all flex items-center gap-1.5 ${
              viewMode === 'split'
                ? 'bg-cream-50 text-deepBrown-600 font-semibold shadow-xs'
                : 'text-deepBrown-400 hover:text-deepBrown-600'
            }`}
            title="Compare sample reference alongside your custom arrangement"
          >
            <SplitSquareVertical className="w-3 h-3 text-deepBrown-500" />
            <span>Compare</span>
          </button>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="w-full relative">
        {/* VIEW 1: SAMPLE BOUQUET REFERENCE */}
        {viewMode === 'sample' && (
          <div className="w-full aspect-[4/5] rounded-2xl bg-cream-50 border border-cream-300 p-4 flex flex-col items-center justify-between relative animate-fade-in shadow-inner">
            <div className="text-center w-full">
              <span className="text-[11px] uppercase tracking-wider text-dustyPink-600 font-semibold block">
                Signature Florist Reference
              </span>
              <p className="text-xs text-deepBrown-400 font-light">
                Sample bouquet preview showcasing Korean origami wrapping & garden blooms
              </p>
            </div>

            <div className="my-auto flex items-center justify-center max-h-[72%]">
              <img
                src="/flowers/bouquet-sample.png"
                alt="Signature florist bouquet sample"
                className="max-h-[260px] object-contain filter drop-shadow-lg"
              />
            </div>

            <div className="w-full pt-2 border-t border-cream-200 flex items-center justify-between">
              <span className="text-[10px] text-deepBrown-400 italic">
                Ready to replicate this look?
              </span>
              <button
                onClick={handleMatchSampleStyle}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-deepBrown-500 hover:bg-deepBrown-600 text-cream-100 text-xs font-medium shadow-xs transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-dustyPink-300" />
                <span>Match This Style</span>
              </button>
            </div>
          </div>
        )}

        {/* VIEW 2: SIDE-BY-SIDE COMPARE */}
        {viewMode === 'split' && (
          <div className="w-full grid grid-cols-2 gap-3 animate-fade-in">
            {/* Left: Sample Reference */}
            <div className="rounded-2xl bg-cream-50 border border-cream-300 p-3 flex flex-col items-center justify-between aspect-[3/4.2]">
              <span className="text-[10px] font-serif font-bold text-deepBrown-500 text-center">
                Sample Reference
              </span>
              <div className="my-auto flex items-center justify-center max-h-[70%]">
                <img
                  src="/flowers/bouquet-sample.png"
                  alt="Sample bouquet"
                  className="max-h-[160px] object-contain filter drop-shadow-sm"
                />
              </div>
              <span className="text-[9px] text-deepBrown-400 text-center">
                Korean Origami Style
              </span>
            </div>

            {/* Right: Custom Design */}
            <div className="rounded-2xl bg-cream-50 border border-dustyPink-300/80 p-3 flex flex-col items-center justify-between aspect-[3/4.2] relative overflow-hidden">
              <span className="text-[10px] font-serif font-bold text-dustyPink-600 text-center">
                Your Custom Design ({bouquetSize.name})
              </span>
              <div className="my-auto w-full h-[75%] relative flex items-center justify-center">
                {renderHandTiedBouquetSVG(
                  primaryWrap,
                  accentWrap,
                  ribbonColor,
                  wrappingStyle,
                  positionedFlowers,
                  greeneryStems,
                  selectedWrappings.length > 1,
                  bouquetSize
                )}
              </div>
              <span className="text-[9px] text-deepBrown-400 text-center">
                {totalStemsCount} Stems • {bouquetSize.dimensions}
              </span>
            </div>
          </div>
        )}

        {/* VIEW 3: LIVE REALISTIC CUSTOM BOUQUET (Default) */}
        {viewMode === 'custom' && (
          <div className="w-full aspect-[4/5] relative flex items-center justify-center bg-cream-50/70 rounded-2xl border border-cream-300/80 shadow-inner p-2 sm:p-4">
            {renderHandTiedBouquetSVG(
              primaryWrap,
              accentWrap,
              ribbonColor,
              wrappingStyle,
              positionedFlowers,
              greeneryStems,
              selectedWrappings.length > 1,
              bouquetSize
            )}

            {/* Quick Match Sample Style Floating Chip */}
            <button
              onClick={handleMatchSampleStyle}
              className="absolute top-2 right-2 bg-cream-50/95 hover:bg-cream-100 backdrop-blur-md px-2.5 py-1 rounded-lg border border-cream-300 text-[10px] text-deepBrown-500 shadow-xs flex items-center gap-1 transition-all"
              title="Quick-set wrapping and ribbons to match the sample reference"
            >
              <Sparkles className="w-3 h-3 text-dustyPink-500" />
              <span>Match Sample Style</span>
            </button>

            {/* Bottom Paper & Ribbon Badges */}
            <div className="absolute bottom-2 left-2 flex flex-col gap-1 pointer-events-none">
              <div className="bg-cream-50/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-cream-300 text-[10px] text-deepBrown-500 shadow-xs flex items-center gap-1.5">
                <div
                  className="w-2.5 h-2.5 rounded-full border border-cream-400"
                  style={{ backgroundColor: primaryWrap.colorHex }}
                />
                {selectedWrappings.length > 1 && (
                  <div
                    className="w-2.5 h-2.5 rounded-full border border-cream-400 -ml-1"
                    style={{ backgroundColor: accentWrap.colorHex }}
                  />
                )}
                <span>Wrap: <span className="font-semibold">{selectedWrappings.map((w) => w.name).join(' + ')}</span></span>
              </div>
            </div>

            <div className="absolute bottom-2 right-2 bg-cream-50/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-cream-300 text-[10px] text-deepBrown-500 shadow-xs flex items-center gap-1.5 pointer-events-none">
              <div
                className="w-2.5 h-2.5 rounded-full border border-cream-400"
                style={{ backgroundColor: ribbonColor }}
              />
              <span>Ribbon: <span className="font-semibold">{selectedRibbon.name}</span></span>
            </div>
          </div>
        )}
      </div>

      {/* Floriography Meaning Synthesis Card */}
      <div className="w-full mt-4 p-4 bg-cream-50 rounded-2xl border border-dustyPink-300/80 text-center space-y-1.5 shadow-xs">
        <div className="text-[11px] uppercase tracking-wider font-semibold text-dustyPink-600 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Synthesized Meaning</span>
        </div>
        <p className="font-serif text-base font-semibold text-deepBrown-500 italic">
          "{synthesizedMeaning}"
        </p>
        <p className="text-xs text-deepBrown-400 font-light leading-relaxed pt-0.5">
          {theoreticalInsight}
        </p>
        {quantityMeaningNote && (
          <div className="text-xs text-sage-600 font-medium pt-1 border-t border-cream-200 mt-2">
            🌱 {quantityMeaningNote}
          </div>
        )}
      </div>
    </div>
  );
};

// =========================================================================
// REALISTIC HAND-TIED BOUQUET SVG COMPOSITING RENDERER
// =========================================================================
function renderHandTiedBouquetSVG(
  primaryWrap: any,
  accentWrap: any,
  ribbonColor: string,
  wrappingStyle: any,
  positionedFlowers: any[],
  greeneryStems: any[],
  hasMultipleWraps: boolean,
  bouquetSize: BouquetSizeOption
) {
  const pColor = primaryWrap?.colorHex || '#F5EDE7';
  const aColor = accentWrap?.colorHex || pColor;

  // Dynamic 3D paper shading gradients
  const pLight = adjustColorBrightness(pColor, 15);
  const pMid = pColor;
  const pDark = adjustColorBrightness(pColor, -18);
  const pDeepCrease = adjustColorBrightness(pColor, -32);

  const aLight = adjustColorBrightness(aColor, 14);
  const aMid = aColor;
  const aDark = adjustColorBrightness(aColor, -18);

  const ribLight = adjustColorBrightness(ribbonColor, 24);
  const ribDark = adjustColorBrightness(ribbonColor, -26);

  // Bouquet Size Dimension Geometry
  const sizeId = bouquetSize?.id || 'large';

  // Central Tie Point (where stems converge and ribbon is cinched)
  const TYING_X = 210;
  const TYING_Y = sizeId === 'small' ? 362 : sizeId === 'medium' ? 358 : 355;

  // Stems Handle bottom cut coordinates
  const handleCutY = sizeId === 'small' ? 440 : sizeId === 'medium' ? 452 : 465;

  // Wingspan and wrapping dimensions
  const wingSpread = sizeId === 'small' ? 0.82 : sizeId === 'medium' ? 0.91 : 1.0;
  const collarTopY = sizeId === 'small' ? 86 : sizeId === 'medium' ? 70 : 58;

  // Dynamic ribbon size
  const bowSpan = sizeId === 'small' ? 20 : sizeId === 'medium' ? 24 : 28;
  const knotHeight = sizeId === 'small' ? 14 : sizeId === 'medium' ? 17 : 20;

  // Ribbon Streamer Length
  const streamerCutY = sizeId === 'small' ? 445 : sizeId === 'medium' ? 460 : 472;

  return (
    <svg
      viewBox="0 0 420 540"
      className="w-full h-full drop-shadow-2xl overflow-visible transition-all duration-500 select-none"
    >
      <defs>
        {/* Soft Ambient Studio Lighting Shadow for Whole Bouquet */}
        <filter id="studioBouquetShadow" x="-30%" y="-20%" width="160%" height="150%">
          <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#261710" floodOpacity="0.22" />
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#180E0A" floodOpacity="0.16" />
        </filter>

        {/* Contact Shadow between Overlapping Petals and Stems */}
        <filter id="realisticBloomShadow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#22130C" floodOpacity="0.28" />
        </filter>

        {/* Paper Lapel Fold Shadow */}
        <filter id="paperLapelShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="-2" dy="5" stdDeviation="6" floodColor="#1C100B" floodOpacity="0.24" />
        </filter>

        {/* Front Wrapping Paper Shadow Cast Over Flowers */}
        <filter id="frontWrapTuckShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="-4" stdDeviation="5" floodColor="#160C08" floodOpacity="0.26" />
        </filter>

        {/* Ribbon Knot Drop Shadow */}
        <filter id="ribbonKnotShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#140B07" floodOpacity="0.30" />
        </filter>

        {/* Stem Bundle Contact Occlusion Shadow */}
        <filter id="stemBundleShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="1" dy="2" stdDeviation="2.5" floodColor="#161208" floodOpacity="0.35" />
        </filter>

        {/* Primary Wrap Volumetric Gradient */}
        <linearGradient id="pWrapVolumetric" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={pLight} />
          <stop offset="35%" stopColor={pMid} />
          <stop offset="70%" stopColor={pDark} />
          <stop offset="100%" stopColor={pDeepCrease} />
        </linearGradient>

        {/* Primary Wrap Diagonal Fold Lighting */}
        <linearGradient id="pWrapDiagonal" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor={pLight} />
          <stop offset="50%" stopColor={pMid} />
          <stop offset="100%" stopColor={pDark} />
        </linearGradient>

        {/* Primary Wrap Recessed Layer */}
        <linearGradient id="pWrapRecessed" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={pMid} />
          <stop offset="100%" stopColor={pDeepCrease} />
        </linearGradient>

        {/* Accent Wrap Volumetric Gradient */}
        <linearGradient id="aWrapVolumetric" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={aLight} />
          <stop offset="60%" stopColor={aMid} />
          <stop offset="100%" stopColor={aDark} />
        </linearGradient>

        {/* Deep Cone Throat Cavity Shadow (Physical hollow interior of paper cone) */}
        <radialGradient id="coneThroatShadow" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#0B0604" stopOpacity="0.75" />
          <stop offset="50%" stopColor="#150B07" stopOpacity="0.40" />
          <stop offset="100%" stopColor="#1E100A" stopOpacity="0.0" />
        </radialGradient>

        {/* Satin Ribbon Horizontal Sheen Gradient */}
        <linearGradient id="satinRibbonLuster" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={ribLight} stopOpacity="0.9" />
          <stop offset="35%" stopColor={ribbonColor} />
          <stop offset="75%" stopColor={ribDark} />
          <stop offset="100%" stopColor={adjustColorBrightness(ribbonColor, -35)} />
        </linearGradient>

        {/* Satin Ribbon Streamer Longitudinal Sheen */}
        <linearGradient id="ribbonStreamerSheen" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={ribLight} stopOpacity="0.75" />
          <stop offset="50%" stopColor={ribbonColor} />
          <stop offset="100%" stopColor={ribDark} />
        </linearGradient>

        {/* Glossy Paper Specular Curved Sheen */}
        <linearGradient id="glossSpecularReflection" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="15%" stopColor="#FFFFFF" stopOpacity="0.0" />
          <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.25" />
          <stop offset="85%" stopColor="#FFFFFF" stopOpacity="0.0" />
        </linearGradient>

        {/* Seamless Flower Stem Concealment Fade (Tucks lower stem cut softly behind wrap) */}
        <linearGradient id="naturalStemTuckFade" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="82%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="97%" stopColor="#FFFFFF" stopOpacity="0.0" />
        </linearGradient>
        <mask id="naturalBloomTuckMask">
          <rect width="100%" height="100%" fill="url(#naturalStemTuckFade)" />
        </mask>
      </defs>

      {/* ============================================================= */}
      {/* LAYER 1: BACK LAYER OF WRAPPING PAPER (Cradles the flowers)   */}
      {/* Scaled dynamically to Bouquet Size: Small, Medium, Large      */}
      {/* ============================================================= */}
      <g id="layer-1-back-paper" filter="url(#studioBouquetShadow)">
        {wrappingStyle.id === 'artisan-cone' ? (
          /* ARTISAN FRENCH BOUQUET CONE: Flared trumpet collar */
          <g>
            <path
              d={`M 210 ${TYING_Y} C ${210 - 60 * wingSpread} ${TYING_Y - 35} ${210 - 150 * wingSpread} ${collarTopY + 80} ${210 - 170 * wingSpread} ${collarTopY + 25} C ${210 - 125 * wingSpread} ${collarTopY - 15} ${210 - 60 * wingSpread} ${collarTopY - 20} 210 ${collarTopY - 20} C ${210 + 60 * wingSpread} ${collarTopY - 20} ${210 + 125 * wingSpread} ${collarTopY - 15} ${210 + 170 * wingSpread} ${collarTopY + 25} C ${210 + 150 * wingSpread} ${collarTopY + 80} ${210 + 60 * wingSpread} ${TYING_Y - 35} 210 ${TYING_Y} Z`}
              fill="url(#pWrapDiagonal)"
            />
            {hasMultipleWraps && (
              <path
                d={`M 210 ${TYING_Y} C ${210 - 55 * wingSpread} ${TYING_Y - 35} ${210 - 135 * wingSpread} ${collarTopY + 85} ${210 - 152 * wingSpread} ${collarTopY + 35} C ${210 - 115 * wingSpread} ${collarTopY} ${210 - 55 * wingSpread} ${collarTopY - 5} 210 ${collarTopY - 5} C ${210 + 55 * wingSpread} ${collarTopY - 5} ${210 + 115 * wingSpread} ${collarTopY} ${210 + 152 * wingSpread} ${collarTopY + 35} C ${210 + 135 * wingSpread} ${collarTopY + 85} ${210 + 55 * wingSpread} ${TYING_Y - 35} 210 ${TYING_Y} Z`}
                fill="url(#aWrapVolumetric)"
                opacity="0.9"
              />
            )}
          </g>
        ) : (
          /* KOREAN DUAL-LAYER ORIGAMI (Default): Architectural wings & multi-fold collar */
          <g id="korean-origami-back">
            {/* Outer Primary Left Wing */}
            <path
              d={`M 210 ${TYING_Y} C ${210 - 50 * wingSpread} ${TYING_Y - 25} ${210 - 135 * wingSpread} ${collarTopY + 85} ${210 - 165 * wingSpread} ${collarTopY + 15} C ${210 - 170 * wingSpread} ${collarTopY - 8} ${210 - 138 * wingSpread} ${collarTopY - 14} ${210 - 98 * wingSpread} ${collarTopY - 16} C ${210 - 64 * wingSpread} ${collarTopY - 18} ${210 - 34 * wingSpread} ${collarTopY + 45} ${210 - 22 * wingSpread} ${TYING_Y - 110} Z`}
              fill="url(#pWrapDiagonal)"
            />
            {/* Outer Primary Right Wing */}
            <path
              d={`M 210 ${TYING_Y} C ${210 + 50 * wingSpread} ${TYING_Y - 25} ${210 + 135 * wingSpread} ${collarTopY + 85} ${210 + 165 * wingSpread} ${collarTopY + 15} C ${210 + 170 * wingSpread} ${collarTopY - 8} ${210 + 138 * wingSpread} ${collarTopY - 14} ${210 + 98 * wingSpread} ${collarTopY - 16} C ${210 + 64 * wingSpread} ${collarTopY - 18} ${210 + 34 * wingSpread} ${collarTopY + 45} ${210 + 22 * wingSpread} ${TYING_Y - 110} Z`}
              fill="url(#pWrapDiagonal)"
            />
            {/* Center Back Curved Fan Collar */}
            <path
              d={`M 210 ${TYING_Y} C ${210 - 70 * wingSpread} ${TYING_Y - 45} ${210 - 140 * wingSpread} ${collarTopY + 70} ${210 - 145 * wingSpread} ${collarTopY + 20} C ${210 - 105 * wingSpread} ${collarTopY - 15} ${210 - 50 * wingSpread} ${collarTopY - 20} 210 ${collarTopY - 20} C ${210 + 50 * wingSpread} ${collarTopY - 20} ${210 + 105 * wingSpread} ${collarTopY - 15} ${210 + 145 * wingSpread} ${collarTopY + 20} C ${210 + 140 * wingSpread} ${collarTopY + 70} ${210 + 70 * wingSpread} ${TYING_Y - 45} 210 ${TYING_Y} Z`}
              fill="url(#pWrapVolumetric)"
            />

            {/* Inner Accent Paper Layer (Renders if 2+ papers selected, peeking out along top & flanks) */}
            {hasMultipleWraps && (
              <g id="korean-inner-wings" opacity="0.95">
                <path
                  d={`M 210 ${TYING_Y} C ${210 - 45 * wingSpread} ${TYING_Y - 25} ${210 - 125 * wingSpread} ${collarTopY + 85} ${210 - 152 * wingSpread} ${collarTopY + 25} C ${210 - 156 * wingSpread} ${collarTopY + 5} ${210 - 130 * wingSpread} ${collarTopY} ${210 - 94 * wingSpread} ${collarTopY} C ${210 - 64 * wingSpread} ${collarTopY} ${210 - 36 * wingSpread} ${collarTopY + 50} ${210 - 20 * wingSpread} ${TYING_Y - 105} Z`}
                  fill="url(#aWrapVolumetric)"
                />
                <path
                  d={`M 210 ${TYING_Y} C ${210 + 45 * wingSpread} ${TYING_Y - 25} ${210 + 125 * wingSpread} ${collarTopY + 85} ${210 + 152 * wingSpread} ${collarTopY + 25} C ${210 + 156 * wingSpread} ${collarTopY + 5} ${210 + 130 * wingSpread} ${collarTopY} ${210 + 94 * wingSpread} ${collarTopY} C ${210 + 64 * wingSpread} ${collarTopY} ${210 + 36 * wingSpread} ${collarTopY + 50} ${210 + 20 * wingSpread} ${TYING_Y - 105} Z`}
                  fill="url(#aWrapVolumetric)"
                />
                <path
                  d={`M 210 ${TYING_Y} C ${210 - 65 * wingSpread} ${TYING_Y - 45} ${210 - 128 * wingSpread} ${collarTopY + 75} ${210 - 132 * wingSpread} ${collarTopY + 28} C ${210 - 96 * wingSpread} ${collarTopY} ${210 - 46 * wingSpread} ${collarTopY - 6} 210 ${collarTopY - 6} C ${210 + 46 * wingSpread} ${collarTopY - 6} ${210 + 96 * wingSpread} ${collarTopY} ${210 + 132 * wingSpread} ${collarTopY + 28} C ${210 + 128 * wingSpread} ${collarTopY + 75} ${210 + 65 * wingSpread} ${TYING_Y - 45} 210 ${TYING_Y} Z`}
                  fill="url(#aWrapVolumetric)"
                />
              </g>
            )}

            {/* Subtle vertical origami fold shading creases on back fan */}
            <path
              d={`M ${210 - 70 * wingSpread} ${collarTopY + 15} C ${210 - 50 * wingSpread} ${collarTopY + 85} ${210 - 20 * wingSpread} ${TYING_Y - 80} 210 ${TYING_Y}`}
              stroke={pDeepCrease}
              strokeWidth="1.2"
              opacity="0.22"
              fill="none"
            />
            <path
              d={`M ${210 + 70 * wingSpread} ${collarTopY + 15} C ${210 + 50 * wingSpread} ${collarTopY + 85} ${210 + 20 * wingSpread} ${TYING_Y - 80} 210 ${TYING_Y}`}
              stroke={pDeepCrease}
              strokeWidth="1.2"
              opacity="0.22"
              fill="none"
            />
          </g>
        )}

        {/* Deep Cone Throat Cavity Shadow (Physical hollow interior of paper cone) */}
        <ellipse
          cx="210"
          cy={TYING_Y - 120}
          rx={105 * wingSpread}
          ry={60 * wingSpread}
          fill="url(#coneThroatShadow)"
          pointerEvents="none"
        />
      </g>

      {/* ============================================================= */}
      {/* LAYER 2: FLOWER STEMS (Upper portion inside the wrapping)     */}
      {/* Each stem begins directly underneath its corresponding flower */}
      {/* and curves naturally inward toward the central tying point    */}
      {/* ============================================================= */}
      <g id="layer-2-upper-stems">
        {positionedFlowers.map((item) => {
          const stemStartX = item.cx;
          const stemStartY = item.cy + item.size * 0.38;
          const tieX = TYING_X + (item.cx - TYING_X) * 0.08;
          const tieY = TYING_Y;
          // Natural curved path dropping down and angling inward
          const c1x = stemStartX + (tieX - stemStartX) * 0.45;
          const c1y = stemStartY + (tieY - stemStartY) * 0.55;

          return (
            <g key={`upper-stem-${item.stem.key}`}>
              {/* Botanical stem with realistic double-line bark shading */}
              <path
                d={`M ${stemStartX} ${stemStartY} Q ${c1x} ${c1y} ${tieX} ${tieY}`}
                stroke="#2B3A1C"
                strokeWidth="4.2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d={`M ${stemStartX} ${stemStartY} Q ${c1x} ${c1y} ${tieX} ${tieY}`}
                stroke="#4C6233"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d={`M ${stemStartX} ${stemStartY} Q ${c1x} ${c1y} ${tieX} ${tieY}`}
                stroke="#758E55"
                strokeWidth="1.0"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />
            </g>
          );
        })}
      </g>

      {/* ============================================================= */}
      {/* LAYER 3: NATURAL FOLIAGE (Strictly customer-selected greenery)*/}
      {/* ============================================================= */}
      {greeneryStems.length > 0 && (
        <g id="layer-3-selected-greenery" opacity="0.95">
          {greeneryStems.map((g) => {
            const tieX = TYING_X + (g.originX - TYING_X) * 0.08;
            const tieY = TYING_Y;
            const c1x = g.originX + (tieX - g.originX) * 0.4;
            const c1y = g.originY + (tieY - g.originY) * 0.55;

            return (
              <g key={`greenery-stem-${g.idx}`}>
                {/* Natural stem curve */}
                <path
                  d={`M ${g.originX} ${g.originY} Q ${c1x} ${c1y} ${tieX} ${tieY}`}
                  stroke="#344621"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Botanical leaves along the stem */}
                {g.id === 'eucalyptus' && (
                  <g transform={`rotate(${g.rot} ${g.originX} ${g.originY})`}>
                    <ellipse cx={g.originX} cy={g.originY} rx="13" ry="8" fill="#72886E" stroke="#52664D" strokeWidth="0.8" />
                    <ellipse cx={g.originX + 14} cy={g.originY + 20} rx="14" ry="9" fill="#7E947A" stroke="#52664D" strokeWidth="0.8" />
                    <ellipse cx={g.originX + 26} cy={g.originY + 42} rx="13" ry="8" fill="#72886E" stroke="#52664D" strokeWidth="0.8" />
                  </g>
                )}

                {g.id === 'ruscus' && (
                  <g transform={`rotate(${g.rot} ${g.originX} ${g.originY})`}>
                    <path d={`M ${g.originX} ${g.originY} Q ${g.originX + 12} ${g.originY - 12} ${g.originX + 24} ${g.originY} Q ${g.originX + 12} ${g.originY + 12} ${g.originX} ${g.originY} Z`} fill="#3D5934" />
                    <path d={`M ${g.originX + 16} ${g.originY + 20} Q ${g.originX + 28} ${g.originY + 8} ${g.originX + 40} ${g.originY + 20} Q ${g.originX + 28} ${g.originY + 32} ${g.originX + 16} ${g.originY + 20} Z`} fill="#47683D" />
                  </g>
                )}

                {g.id === 'fern' && (
                  <g transform={`rotate(${g.rot} ${g.originX} ${g.originY})`}>
                    <path d={`M ${g.originX} ${g.originY} L ${g.originX - 8} ${g.originY + 5} M ${g.originX + 6} ${g.originY + 15} L ${g.originX - 6} ${g.originY + 22} M ${g.originX + 14} ${g.originY + 30} L ${g.originX} ${g.originY + 38}`} stroke="#4E6835" strokeWidth="2.4" strokeLinecap="round" />
                  </g>
                )}

                {g.id === 'olive' && (
                  <g transform={`rotate(${g.rot} ${g.originX} ${g.originY})`}>
                    <ellipse cx={g.originX} cy={g.originY} rx="13" ry="5" fill="#7C8870" />
                    <ellipse cx={g.originX + 16} cy={g.originY + 18} rx="13" ry="5" fill="#88957C" />
                  </g>
                )}
              </g>
            );
          })}
        </g>
      )}

      {/* ============================================================= */}
      {/* LAYER 4: FLOWER HEADS & OVERLAPPING PETALS                    */}
      {/* Depth-sorted (cy ascending). 100% full opacity, crisp details */}
      {/* Lower image cuts tucked cleanly into the wrapping cone       */}
      {/* ============================================================= */}
      <g id="layer-4-flower-heads">
        {positionedFlowers.length === 0 && (
          <text
            x="210"
            y={TYING_Y - 140}
            textAnchor="middle"
            fill="#453A38"
            fontSize="14"
            fontFamily="serif"
            fontStyle="italic"
            opacity="0.65"
          >
            Select flowers below to compose your bouquet
          </text>
        )}

        {/* Real transparent PNG flowers layered with contact shadows and natural rotation */}
        {positionedFlowers.map((item) => {
          return (
            <g
              key={`flower-head-${item.stem.key}`}
              className="transition-all duration-300"
              transform={`rotate(${item.rotation} ${item.cx} ${item.cy})`}
            >
              <image
                href={item.stem.image || item.stem.flower.image}
                x={item.cx - item.size / 2}
                y={item.cy - item.size / 2}
                width={item.size}
                height={item.size}
                preserveAspectRatio="xMidYMid meet"
                filter="url(#realisticBloomShadow)"
                className="hover:scale-105 transition-transform duration-200 cursor-pointer"
              />
            </g>
          );
        })}
      </g>

      {/* ============================================================= */}
      {/* LAYER 5: FRONT WRAPPING PAPER CONE & ORIGAMI CRADLE           */}
      {/* Rises up naturally to cradle blooms and CONCEALS lower cuts!  */}
      {/* ============================================================= */}
      <g id="layer-5-front-paper" filter="url(#frontWrapTuckShadow)">
        {wrappingStyle.id === 'artisan-cone' ? (
          /* ARTISAN FRENCH CONE: Flared conical collar rising up to cradle blooms */
          <g>
            <path
              d={`M 210 ${TYING_Y} C ${210 - 65 * wingSpread} ${TYING_Y - 25} ${210 - 125 * wingSpread} 230 ${210 - 128 * wingSpread} 178 C ${210 - 65 * wingSpread} 186 ${210 + 65 * wingSpread} 186 ${210 + 128 * wingSpread} 178 C ${210 + 128 * wingSpread} 230 ${210 + 65 * wingSpread} ${TYING_Y - 25} 210 ${TYING_Y} Z`}
              fill="url(#pWrapVolumetric)"
            />
            {/* Diagonal tuck folds */}
            <path
              d={`M 210 ${TYING_Y} L ${210 - 85 * wingSpread} 182 Q ${210 - 25 * wingSpread} 196 210 220 Z`}
              fill={hasMultipleWraps ? 'url(#aWrapVolumetric)' : 'url(#pWrapRecessed)'}
              opacity="0.85"
            />
            <path
              d={`M 210 ${TYING_Y} L ${210 + 85 * wingSpread} 182 Q ${210 + 25 * wingSpread} 196 210 220 Z`}
              fill="url(#pWrapRecessed)"
              opacity="0.8"
            />
          </g>
        ) : (
          /* KOREAN DUAL-LAYER ORIGAMI: Photorealistic diagonal overlapping lapels */
          <g id="korean-origami-front">
            {/* Under-Lapel Base Cone (Cradles the lower blooms) */}
            <path
              d={`M 210 ${TYING_Y} C ${210 - 55 * wingSpread} ${TYING_Y - 20} ${210 - 115 * wingSpread} 230 ${210 - 118 * wingSpread} 182 C ${210 - 55 * wingSpread} 172 ${210 + 55 * wingSpread} 172 ${210 + 118 * wingSpread} 182 C ${210 + 118 * wingSpread} 230 ${210 + 55 * wingSpread} ${TYING_Y - 20} 210 ${TYING_Y} Z`}
              fill="url(#pWrapRecessed)"
              opacity="0.9"
            />

            {/* Inner Accent Reveal along fold (peeks out when multi-wrap selected) */}
            {hasMultipleWraps && (
              <path
                d={`M 210 ${TYING_Y} C ${210 - 55 * wingSpread} ${TYING_Y - 15} ${210 - 142 * wingSpread} 235 ${210 - 146 * wingSpread} 178 C ${210 - 92 * wingSpread} 165 ${210 - 30 * wingSpread} 172 210 182 Z`}
                fill="url(#aWrapVolumetric)"
                opacity="0.95"
              />
            )}

            {/* Left Origami Front Lapel (sweeps diagonally across to cradle center) */}
            <path
              d={`M 210 ${TYING_Y} C ${210 - 60 * wingSpread} ${TYING_Y - 13} ${210 - 145 * wingSpread} 235 ${210 - 148 * wingSpread} 178 C ${210 - 92 * wingSpread} 164 ${210 - 25 * wingSpread} 170 210 178 C 210 248 210 ${TYING_Y - 13} 210 ${TYING_Y} Z`}
              fill="url(#pWrapDiagonal)"
            />

            {/* Right Origami Front Lapel (folds cleanly OVER the left lapel with contact shadow) */}
            <path
              d={`M 210 ${TYING_Y} C ${210 + 60 * wingSpread} ${TYING_Y - 13} ${210 + 145 * wingSpread} 235 ${210 + 148 * wingSpread} 178 C ${210 + 92 * wingSpread} 164 ${210 + 25 * wingSpread} 170 204 182 C 204 248 210 ${TYING_Y - 13} 210 ${TYING_Y} Z`}
              fill="url(#pWrapDiagonal)"
              filter="url(#paperLapelShadow)"
            />

            {/* Natural Origami Fold Crease Highlights */}
            <path
              d={`M ${210 + 148 * wingSpread} 178 L 204 182 L 210 ${TYING_Y}`}
              stroke="#FFFFFF"
              strokeWidth="0.8"
              opacity="0.45"
              fill="none"
            />
            <path
              d={`M ${210 - 148 * wingSpread} 178 L 210 178 L 210 ${TYING_Y}`}
              stroke={pDeepCrease}
              strokeWidth="1.2"
              opacity="0.22"
              fill="none"
            />
          </g>
        )}

        {/* Glossy Specular Reflection (renders dynamic sheen when finish is glossy) */}
        {primaryWrap?.category === 'glossy' && (
          <path
            d={`M ${210 - 50 * wingSpread} 182 C 210 194 ${210 + 50 * wingSpread} 182 ${210 + 50 * wingSpread} 182 L 222 ${TYING_Y - 3} L 188 ${TYING_Y - 3} Z`}
            fill="url(#glossSpecularReflection)"
            pointerEvents="none"
          />
        )}
      </g>

      {/* ============================================================= */}
      {/* LAYER 6: STEMS BELOW THE RIBBON (Tight Spiral Hand-Tie Bundle) */}
      {/* Strictly selected stems! Gathered snugly into a solid handle,  */}
      {/* natural organic curvature, contact shadows, fresh water cuts. */}
      {/* Rendered BEFORE the ribbon so the ribbon wraps OVER the stems! */}
      {/* ============================================================= */}
      <g id="layer-6-stems-below-ribbon" filter="url(#stemBundleShadow)">
        {/* Soft contact shadow behind the stem handle */}
        <path
          d={`M ${TYING_X - 14} ${TYING_Y} L ${TYING_X + 14} ${TYING_Y} L ${TYING_X + 16} ${handleCutY + 12} L ${TYING_X - 16} ${handleCutY + 12} Z`}
          fill="#1A120B"
          opacity="0.25"
          filter="blur(2px)"
        />

        {/* Render tight spiral bundle for all customer-selected flowers */}
        {positionedFlowers.map((item, i) => {
          const total = positionedFlowers.length;
          // Spiral Hand-Tie geometry: Stems spiral through center, forming a snug botanical handle
          // Trimmed across the bottom within a compact 20-26px bundle
          const normIdx = total <= 1 ? 0 : (i / (total - 1)) - 0.5;
          const tieX = TYING_X + normIdx * 9;

          // In florist spiral technique, stems gently cross at angles (-12px to +12px spread)
          const spiralOffset = normIdx * 15 + (Math.sin(i * 2.1) * 3);
          const endX = TYING_X + spiralOffset;
          const endY = handleCutY + ((i * 3.2) % 9);

          // Organic gentle curve control points (subtle botanical flex, not rigid sticks)
          const c1x = tieX + (endX - tieX) * 0.35 + (normIdx > 0 ? 0.8 : -0.8);
          const c1y = TYING_Y + (endY - TYING_Y) * 0.35;
          const c2x = tieX + (endX - tieX) * 0.70;
          const c2y = TYING_Y + (endY - TYING_Y) * 0.70;

          // Organic botanical stem color variation
          const barkColors = ['#263319', '#2E3D1E', '#364722', '#2A381A'];
          const highlightColors = ['#3D5127', '#485F2E', '#536E35', '#42582A'];
          const bark = barkColors[i % barkColors.length];
          const highlight = highlightColors[i % highlightColors.length];

          return (
            <g key={`bottom-stem-flower-${item.stem.key}`}>
              {/* Core Stem Tube */}
              <path
                d={`M ${tieX} ${TYING_Y - 4} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`}
                stroke={bark}
                strokeWidth="3.6"
                strokeLinecap="round"
                fill="none"
              />
              {/* Highlight Ridge along the stem */}
              <path
                d={`M ${tieX} ${TYING_Y - 4} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`}
                stroke={highlight}
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />

              {/* 45° Fresh Florist Diagonal Water Cut */}
              <ellipse
                cx={endX}
                cy={endY}
                rx="2.0"
                ry="1.2"
                fill="#C6D6A8"
                stroke={bark}
                strokeWidth="0.6"
                transform={`rotate(${Math.round((endX - 210) * 1.2)} ${endX} ${endY})`}
              />
            </g>
          );
        })}

        {/* Selected greenery stems continuing through bundle */}
        {greeneryStems.map((g, i) => {
          const total = greeneryStems.length;
          const normIdx = total <= 1 ? 0 : (i / (total - 1)) - 0.5;
          const tieX = TYING_X + normIdx * 8;
          const endX = TYING_X + (normIdx * 14) + ((i % 2 === 0 ? -1 : 1) * 2);
          const endY = handleCutY + 2 + ((i * 4) % 8);

          const c1x = tieX + (endX - tieX) * 0.4;
          const c1y = TYING_Y + (endY - TYING_Y) * 0.4;
          const c2x = tieX + (endX - tieX) * 0.7;
          const c2y = TYING_Y + (endY - TYING_Y) * 0.7;

          return (
            <g key={`bottom-stem-greenery-${g.idx}`}>
              <path
                d={`M ${tieX} ${TYING_Y - 4} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`}
                stroke="#223015"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
              />
              <ellipse
                cx={endX}
                cy={endY}
                rx="1.5"
                ry="0.9"
                fill="#BACD98"
                stroke="#223015"
                strokeWidth="0.5"
                transform={`rotate(${Math.round((endX - 210) * 1.2)} ${endX} ${endY})`}
              />
            </g>
          );
        })}
      </g>

      {/* ============================================================= */}
      {/* LAYER 7: WAIST SATIN RIBBON & BOW (Tied over wrap and stems)  */}
      {/* Proportionally sized to Bouquet Size                          */}
      {/* ============================================================= */}
      <g id="layer-7-waist-ribbon" filter="url(#ribbonKnotShadow)">
        {/* Ribbon Cinch Band wrapped around the paper cone */}
        <path
          d={`M ${210 - 50 * wingSpread} ${TYING_Y - 10} Q 210 ${TYING_Y - 3} ${210 + 50 * wingSpread} ${TYING_Y - 10} L ${210 + 47 * wingSpread} ${TYING_Y + 8} Q 210 ${TYING_Y + 16} ${210 - 47 * wingSpread} ${TYING_Y + 8} Z`}
          fill="url(#satinRibbonLuster)"
        />
        {/* Specular luster highlight across band */}
        <path
          d={`M ${210 - 46 * wingSpread} ${TYING_Y - 2} Q 210 ${TYING_Y + 5} ${210 + 46 * wingSpread} ${TYING_Y - 2}`}
          stroke="#FFFFFF"
          strokeWidth="1.4"
          opacity="0.45"
          fill="none"
        />

        {/* Left Dimensional Bow Loop */}
        <path
          d={`M 204 ${TYING_Y - 3} C ${210 - 42 * (bowSpan / 28)} ${TYING_Y - 33} ${210 - 70 * (bowSpan / 28)} ${TYING_Y - 19} ${210 - 58 * (bowSpan / 28)} ${TYING_Y + 5} C ${210 - 48 * (bowSpan / 28)} ${TYING_Y + 21} ${210 - 15 * (bowSpan / 28)} ${TYING_Y + 9} 204 ${TYING_Y + 1} Z`}
          fill="url(#satinRibbonLuster)"
        />
        {/* Left Inner Loop Shadow Hole */}
        <path
          d={`M 194 ${TYING_Y - 3} C ${210 - 36 * (bowSpan / 28)} ${TYING_Y - 21} ${210 - 54 * (bowSpan / 28)} ${TYING_Y - 10} ${210 - 47 * (bowSpan / 28)} ${TYING_Y + 3} C ${210 - 40 * (bowSpan / 28)} ${TYING_Y + 11} 188 ${TYING_Y + 3} 194 ${TYING_Y - 1} Z`}
          fill="#100805"
          opacity="0.38"
        />

        {/* Right Dimensional Bow Loop */}
        <path
          d={`M 216 ${TYING_Y - 3} C ${210 + 42 * (bowSpan / 28)} ${TYING_Y - 33} ${210 + 70 * (bowSpan / 28)} ${TYING_Y - 19} ${210 + 58 * (bowSpan / 28)} ${TYING_Y + 5} C ${210 + 48 * (bowSpan / 28)} ${TYING_Y + 21} ${210 + 15 * (bowSpan / 28)} ${TYING_Y + 9} 216 ${TYING_Y + 1} Z`}
          fill="url(#satinRibbonLuster)"
        />
        {/* Right Inner Loop Shadow Hole */}
        <path
          d={`M 226 ${TYING_Y - 3} C ${210 + 36 * (bowSpan / 28)} ${TYING_Y - 21} ${210 + 54 * (bowSpan / 28)} ${TYING_Y - 10} ${210 + 47 * (bowSpan / 28)} ${TYING_Y + 3} C ${210 + 40 * (bowSpan / 28)} ${TYING_Y + 11} 232 ${TYING_Y + 3} 226 ${TYING_Y - 1} Z`}
          fill="#100805"
          opacity="0.38"
        />

        {/* Central Tied Ribbon Knot with compression creases */}
        <rect
          x={210 - knotHeight * 0.7}
          y={TYING_Y - knotHeight * 0.45}
          width={knotHeight * 1.4}
          height={knotHeight}
          rx="6"
          fill="url(#satinRibbonLuster)"
        />
        <line x1="210" y1={TYING_Y - knotHeight * 0.4} x2="210" y2={TYING_Y + knotHeight * 0.5} stroke="#120906" strokeWidth="1" opacity="0.3" />
        <line x1="205" y1={TYING_Y - knotHeight * 0.35} x2="204" y2={TYING_Y + knotHeight * 0.45} stroke="#FFFFFF" strokeWidth="0.8" opacity="0.4" />

        {/* Left Cascading Satin Streamer with 45° angled florist cut */}
        <path
          d={`M 202 ${TYING_Y + 7} C 178 ${TYING_Y + 45} 148 ${TYING_Y + 73} 142 ${streamerCutY} L 156 ${streamerCutY - 5} C 162 ${TYING_Y + 75} 188 ${TYING_Y + 50} 208 ${TYING_Y + 9} Z`}
          fill="url(#ribbonStreamerSheen)"
        />
        <path
          d={`M 204 ${TYING_Y + 9} C 180 ${TYING_Y + 47} 152 ${TYING_Y + 75} 148 ${streamerCutY - 2}`}
          stroke="#FFFFFF"
          strokeWidth="1.2"
          opacity="0.4"
          fill="none"
        />

        {/* Right Cascading Satin Streamer with 45° angled florist cut */}
        <path
          d={`M 218 ${TYING_Y + 7} C 242 ${TYING_Y + 45} 272 ${TYING_Y + 73} 278 ${streamerCutY} L 264 ${streamerCutY - 5} C 258 ${TYING_Y + 75} 232 ${TYING_Y + 50} 212 ${TYING_Y + 9} Z`}
          fill="url(#ribbonStreamerSheen)"
        />
        <path
          d={`M 216 ${TYING_Y + 9} C 240 ${TYING_Y + 47} 268 ${TYING_Y + 75} 272 ${streamerCutY - 2}`}
          stroke="#FFFFFF"
          strokeWidth="1.2"
          opacity="0.4"
          fill="none"
        />
      </g>
    </svg>
  );
}
