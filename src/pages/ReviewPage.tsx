import React, { useState } from 'react';
import { DeliveryForm } from '../components/delivery/DeliveryForm';
import { OrderReviewSummary } from '../components/delivery/OrderReviewSummary';
import { AbaQrModal } from '../components/delivery/AbaQrModal';
import { OrderReceiptModal } from '../components/delivery/OrderReceiptModal';
import { useFlorist } from '../context/FloristContext';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export const ReviewPage: React.FC = () => {
  const { deliveryData, placeOrder } = useFlorist();
  const [isAbaModalOpen, setIsAbaModalOpen] = useState(false);

  const handleInitiateOrder = () => {
    if (deliveryData.paymentMethod === 'khqr') {
      setIsAbaModalOpen(true);
    } else {
      // Direct placement for COD or Card
      placeOrder();
    }
  };

  const handlePaymentSuccess = () => {
    setIsAbaModalOpen(false);
    placeOrder();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cream-100 border border-dustyPink-300 text-deepBrown-500 text-xs font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-dustyPink-500" />
          <span>Final Step • Page 5</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-deepBrown-500">
          Order & Delivery Review
        </h1>
        <p className="text-sm text-deepBrown-400">
          Review your bouquet composition, card message, and recipient details before finalizing your delivery order.
        </p>
      </div>

      {/* Grid: Delivery Form on Left, Order Summary on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <DeliveryForm />
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <OrderReviewSummary onInitiatePlaceOrder={handleInitiateOrder} />
        </div>
      </div>

      {/* Payment Modals */}
      <AbaQrModal
        isOpen={isAbaModalOpen}
        onClose={() => setIsAbaModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <OrderReceiptModal />
    </div>
  );
};
