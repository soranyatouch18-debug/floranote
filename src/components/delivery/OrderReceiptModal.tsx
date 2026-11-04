import React, { useEffect } from 'react';
import { useFlorist } from '../../context/FloristContext';
import confetti from 'canvas-confetti';
import { CheckCircle2, Printer, MapPin, Calendar, X } from 'lucide-react';

export const OrderReceiptModal: React.FC = () => {
  const { activeConfirmedOrder, closeConfirmation, setCurrentTab } = useFlorist();

  useEffect(() => {
    if (activeConfirmedOrder) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E8B7BD', '#8D9B7A', '#F5EDE7', '#453A38']
      });
    }
  }, [activeConfirmedOrder]);

  if (!activeConfirmedOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleStartNew = () => {
    closeConfirmation();
    setCurrentTab('home');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deepBrown-900/70 backdrop-blur-md animate-fade-in">
      <div className="bg-cream-50 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden border border-cream-300 shadow-2xl flex flex-col">
        {/* Header Ribbon */}
        <div className="p-6 bg-cream-100 border-b border-cream-300 text-center relative">
          <button
            onClick={closeConfirmation}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-cream-200 hover:bg-cream-300 text-deepBrown-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-14 h-14 rounded-full bg-dustyPink-100 border-2 border-dustyPink-300 flex items-center justify-center text-dustyPink-600 mx-auto mb-3 shadow-soft">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase tracking-widest text-dustyPink-600 font-bold block mb-1">
            Order Confirmed & In Preparation
          </span>
          <h2 className="font-serif text-3xl font-bold text-deepBrown-500">
            Thank You for Trusting Flora Note
          </h2>
          <p className="text-xs text-deepBrown-400 mt-1">
            Order Ref: <span className="font-mono font-bold text-deepBrown-600">{activeConfirmedOrder.orderNumber}</span>
          </p>
        </div>

        {/* Scrollable Receipt Details */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-deepBrown-400">
          {/* Status Timeline */}
          <div className="bg-cream-100 rounded-2xl p-4 border border-cream-200 space-y-2">
            <div className="flex items-center justify-between text-deepBrown-500 font-semibold text-xs">
              <span>Status: Floral Artisan Conditioning Stems</span>
              <span className="text-sage-600">On Schedule</span>
            </div>
            <div className="w-full bg-cream-300 h-2 rounded-full overflow-hidden">
              <div className="bg-dustyPink-400 h-full w-2/5 rounded-full" />
            </div>
            <p className="text-[11px] text-deepBrown-400">
              Fresh flowers are being arranged according to your chosen folding style. We will send a quiet SMS update upon departure.
            </p>
          </div>

          {/* Delivery Coordinates */}
          <div className="space-y-1.5 p-3 rounded-xl bg-cream-100/70 border border-cream-200">
            <div className="flex items-center gap-1.5 font-semibold text-deepBrown-500">
              <MapPin className="w-3.5 h-3.5 text-dustyPink-500" />
              <span>Delivering to: {activeConfirmedOrder.delivery.recipientName} ({activeConfirmedOrder.delivery.recipientPhone})</span>
            </div>
            <div className="pl-5 text-deepBrown-400">
              {activeConfirmedOrder.delivery.address}, {activeConfirmedOrder.delivery.district}
            </div>
            <div className="flex items-center gap-1.5 pl-5 text-[11px] text-sage-600 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              <span>Date: {activeConfirmedOrder.delivery.deliveryDate} ({activeConfirmedOrder.delivery.timeSlot} slot)</span>
            </div>
            {activeConfirmedOrder.delivery.specialNotes && (
              <div className="pl-5 text-[11px] italic text-deepBrown-400">
                Notes: "{activeConfirmedOrder.delivery.specialNotes}"
              </div>
            )}
          </div>

          {/* Itemized Stems & Wrap */}
          <div className="space-y-1 border-t border-cream-200 pt-3">
            <div className="flex justify-between items-center font-semibold text-deepBrown-500 mb-1">
              <span>Bouquet Composition</span>
              <span className="text-[11px] font-normal text-dustyPink-600 bg-dustyPink-50 px-2 py-0.5 rounded-full border border-dustyPink-200">
                {activeConfirmedOrder.bouquetSize?.name || 'Large'} Size ({activeConfirmedOrder.bouquetSize?.dimensions || '40cm × 52cm'})
              </span>
            </div>
            {activeConfirmedOrder.stems.map(s => (
              <div key={`${s.flower.id}-${s.color}`} className="flex justify-between">
                <span>{s.quantity}x {s.flower.name} ({s.color})</span>
                <span>${(s.flower.pricePerStem * s.quantity).toFixed(2)}</span>
              </div>
            ))}
            {activeConfirmedOrder.greenery.map(g => (
              <div key={g.greenery.id} className="flex justify-between">
                <span>{g.quantity}x {g.greenery.name}</span>
                <span>${(g.greenery.price * g.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between">
              <span>Style: {activeConfirmedOrder.wrappingStyle.name}</span>
              <span>${activeConfirmedOrder.wrappingPrice.toFixed(2)}</span>
            </div>
            <div className="text-[10px] text-deepBrown-400 pl-2">
              Papers: {activeConfirmedOrder.wrappings.map(w => w.name).join(' + ')}
            </div>
            <div className="flex justify-between">
              <span>Ribbon: {activeConfirmedOrder.ribbon.name}</span>
              <span>${activeConfirmedOrder.ribbonPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Phnom Penh Delivery Fee</span>
              <span>${activeConfirmedOrder.deliveryFee.toFixed(2)}</span>
            </div>

            <div className="border-t border-cream-300 pt-2 flex justify-between font-bold text-sm text-deepBrown-500">
              <span>Total Paid:</span>
              <span className="font-serif text-lg text-dustyPink-600">
                ${activeConfirmedOrder.total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Enclosed Greeting Card Note */}
          <div className="p-3 bg-cream-100 rounded-xl border border-cream-200">
            <div className="font-semibold text-deepBrown-500 mb-1">Enclosed Card Message:</div>
            <p className="italic text-[11px] text-deepBrown-400">
              "{activeConfirmedOrder.card.message}"
            </p>
            <div className="mt-1 text-[10px] text-dustyPink-600 font-medium">
              {activeConfirmedOrder.card.isAnonymous ? 'From: Secret Admirer' : `From: ${activeConfirmedOrder.card.senderName || 'Anonymous'}`}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-cream-100 border-t border-cream-300 flex items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-cream-200 hover:bg-cream-300 text-deepBrown-500 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Receipt</span>
          </button>

          <button
            onClick={handleStartNew}
            className="px-5 py-2.5 rounded-xl bg-deepBrown-500 hover:bg-deepBrown-600 text-cream-100 text-xs font-semibold uppercase tracking-wider transition-colors shadow-soft"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
