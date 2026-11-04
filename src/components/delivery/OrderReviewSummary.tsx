import React from 'react';
import { useFlorist } from '../../context/FloristContext';
import { Sparkles, Mail, CheckCircle, ShieldCheck, ShoppingBag, Trash2 } from 'lucide-react';

interface OrderReviewSummaryProps {
  onInitiatePlaceOrder: () => void;
}

export const OrderReviewSummary: React.FC<OrderReviewSummaryProps> = ({ onInitiatePlaceOrder }) => {
  const {
    bouquetSize,
    selectedStems,
    selectedGreenery,
    wrappingStyle,
    selectedWrappings,
    wrappingSubtotal,
    selectedRibbon,
    cardData,
    deliveryData,
    totalBouquetCost,
    currentDistrictFee,
    orderTotal,
    totalStemsCount,
    setCurrentTab,
    cartItems,
    cartTotal,
    removeFromCart,
    clearCart
  } = useFlorist();

  const effectiveSubtotal = (totalStemsCount > 0 ? totalBouquetCost : 0) + cartTotal;
  const grandTotal = effectiveSubtotal > 0 ? effectiveSubtotal + currentDistrictFee : orderTotal;

  const isFormValid =
    (totalStemsCount > 0 || cartItems.length > 0) &&
    deliveryData.recipientName.trim().length > 0 &&
    deliveryData.recipientPhone.trim().length > 0 &&
    deliveryData.address.trim().length > 0;

  return (
    <div className="bg-cream-50 rounded-2xl p-6 border border-cream-300 shadow-soft space-y-6">
      <div className="border-b border-cream-200 pb-3 flex items-center justify-between">
        <h3 className="font-serif text-xl font-bold text-deepBrown-500">
          Order Summary & Final Review
        </h3>
        <span className="text-xs text-dustyPink-600 font-semibold bg-dustyPink-50 px-2.5 py-0.5 rounded-full border border-dustyPink-200">
          Flora Note
        </span>
      </div>

      {/* Cart Bouquets Recap Box (if any) */}
      {cartItems.length > 0 && (
        <div className="bg-cream-100 rounded-xl p-4 border border-cream-200 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-deepBrown-500">
            <span className="flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4 text-dustyPink-500" />
              <span>Saved Cart Bouquets ({cartItems.length})</span>
            </span>
            <button
              onClick={clearCart}
              className="text-[11px] text-dustyPink-600 hover:underline"
            >
              Clear Cart
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {cartItems.map((item, idx) => (
              <div key={item.id} className="p-2.5 rounded-lg bg-cream-50 border border-cream-200 flex items-center justify-between">
                <div>
                  <div className="font-medium text-deepBrown-500">
                    Bouquet #{idx + 1} ({item.totalStemsCount} flowers, {item.bouquetSize.name})
                  </div>
                  <div className="text-[11px] text-deepBrown-400">
                    {item.stems.map(s => `${s.quantity}x ${s.flower.name}`).join(', ') || 'Custom selection'}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-deepBrown-600">${item.totalBouquetCost.toFixed(2)}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 text-deepBrown-400 hover:text-red-500 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Bouquet Recap Box (if flowers present) */}
      {totalStemsCount > 0 && (
        <div className="bg-cream-100 rounded-xl p-4 border border-cream-200 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-deepBrown-500">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-dustyPink-500" />
              <span>Custom Bouquet ({totalStemsCount} flowers)</span>
            </span>
            <button
              onClick={() => setCurrentTab('builder')}
              className="text-[11px] text-dustyPink-600 hover:underline"
            >
              Edit
            </button>
          </div>

          <div className="space-y-1.5 text-xs text-deepBrown-400">
            <div className="flex justify-between pb-1 border-b border-cream-200/60 font-medium text-deepBrown-500">
              <span>Bouquet Size: {bouquetSize.name} ({bouquetSize.dimensions})</span>
              <span className="text-sage-600 font-normal">Included in total</span>
            </div>

            {selectedStems.map(s => (
              <div key={`${s.flower.id}-${s.color}`} className="flex justify-between">
                <span>{s.quantity}x {s.flower.name} ({s.color})</span>
                <span className="text-deepBrown-500 font-medium">
                  ${(s.flower.pricePerStem * s.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            {selectedGreenery.map(g => (
              <div key={g.greenery.id} className="flex justify-between">
                <span>{g.quantity}x {g.greenery.name}</span>
                <span className="text-deepBrown-500 font-medium">
                  ${(g.greenery.price * g.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <div className="flex justify-between pt-1 border-t border-cream-200/60">
              <span>Style: {wrappingStyle.name}</span>
              <span className="text-deepBrown-500 font-medium">${wrappingSubtotal.toFixed(2)}</span>
            </div>

            <div className="text-[10px] text-deepBrown-400 pl-2">
              Papers: {selectedWrappings.map(w => w.name).join(' + ')}
            </div>

            <div className="flex justify-between">
              <span>Ribbon: {selectedRibbon.name}</span>
              <span className="text-deepBrown-500 font-medium">${selectedRibbon.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Greeting Card Recap */}
      <div className="bg-cream-100 rounded-xl p-4 border border-cream-200 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-deepBrown-500">
          <span className="flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-dustyPink-500" />
            <span>Greeting Card Included</span>
          </span>
          <button
            onClick={() => setCurrentTab('card')}
            className="text-[11px] text-dustyPink-600 hover:underline"
          >
            Edit Card
          </button>
        </div>
        <p className="text-xs text-deepBrown-400 italic line-clamp-2">
          "{cardData.message}"
        </p>
        <div className="text-[10px] text-sage-600 font-medium">
          {cardData.isAnonymous ? 'Sender: Anonymous (Secret Admirer)' : `Sender: ${cardData.senderName || 'Anonymous'}`}
        </div>
      </div>

      {/* Pricing Calculation Breakdown */}
      <div className="space-y-2 text-xs text-deepBrown-400 pt-2 border-t border-cream-200">
        {totalStemsCount > 0 && (
          <div className="flex justify-between">
            <span>Bouquet Subtotal</span>
            <span className="font-semibold text-deepBrown-500">${totalBouquetCost.toFixed(2)}</span>
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="flex justify-between">
            <span>Saved Cart Bouquets ({cartItems.length})</span>
            <span className="font-semibold text-deepBrown-500">${cartTotal.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Phnom Penh Courier Fee ({deliveryData.district})</span>
          <span className="font-semibold text-deepBrown-500">${currentDistrictFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-dustyPink-600 font-medium">
          <span>Greeting Card & Custom Assembly</span>
          <span>Included (Free)</span>
        </div>

        <div className="border-t border-cream-300 pt-3 flex justify-between items-baseline text-deepBrown-500">
          <span className="font-serif text-lg font-bold">Total Amount:</span>
          <span className="font-serif text-3xl font-bold text-dustyPink-600">
            ${grandTotal.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Notice & Confirmation Trigger */}
      <div className="space-y-3 pt-2">
        {!isFormValid && (
          <div className="text-[11px] text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
            {totalStemsCount === 0 && cartItems.length === 0
              ? 'Please add flowers to your bouquet or cart before placing an order.'
              : 'Please fill in the recipient’s name, phone number, and address to place your order.'}
          </div>
        )}

        <button
          onClick={onInitiatePlaceOrder}
          disabled={!isFormValid}
          className="w-full py-4 px-6 rounded-2xl bg-deepBrown-500 hover:bg-deepBrown-600 disabled:opacity-50 text-cream-100 font-serif text-base font-bold tracking-wide transition-all shadow-elevated flex items-center justify-center gap-2 group"
        >
          <CheckCircle className="w-5 h-5 text-dustyPink-300 group-hover:scale-110 transition-transform" />
          <span>Place Order for Delivery (${grandTotal.toFixed(2)})</span>
        </button>

        <div className="flex items-center justify-center gap-2 text-[11px] text-deepBrown-400 text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-sage-600" />
          <span>Flora Note Quality Guarantee • Contactless Phnom Penh Delivery</span>
        </div>
      </div>
    </div>
  );
};
