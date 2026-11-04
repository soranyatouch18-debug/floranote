import React, { useState, useEffect } from 'react';
import { useFlorist } from '../../context/FloristContext';
import { X, CheckCircle, ShieldCheck, QrCode, Smartphone } from 'lucide-react';

interface AbaQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

export const AbaQrModal: React.FC<AbaQrModalProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess
}) => {
  const { orderTotal } = useFlorist();
  const [secondsLeft, setSecondsLeft] = useState(180);

  useEffect(() => {
    if (!isOpen) {
      setSecondsLeft(180);
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deepBrown-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-cream-300 flex flex-col text-center">
        {/* ABA KHQR Header */}
        <div className="bg-[#E1251B] p-4 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="text-xs uppercase tracking-widest font-bold opacity-90">
            KHQR Instant Pay
          </div>
          <div className="text-lg font-bold font-serif">
            Flora Note Studio
          </div>
        </div>

        {/* QR Code Body */}
        <div className="p-6 space-y-4">
          <div className="text-deepBrown-500">
            <div className="text-xs text-deepBrown-400">Total Payment Due</div>
            <div className="text-3xl font-extrabold text-deepBrown-700 tracking-tight">
              ${orderTotal.toFixed(2)}
            </div>
            <div className="text-[11px] text-deepBrown-400 mt-0.5">
              Expires in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
          </div>

          {/* Realistic KHQR Visual Box */}
          <div className="relative mx-auto w-56 h-56 p-3 bg-white rounded-2xl border-2 border-red-500/80 shadow-md flex items-center justify-center">
            {/* SVG stylized QR code */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-deepBrown-800">
              {/* Corner markers */}
              <rect x="5" y="5" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" rx="4" />
              <rect x="11" y="11" width="16" height="16" fill="currentColor" rx="2" />

              <rect x="67" y="5" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" rx="4" />
              <rect x="73" y="11" width="16" height="16" fill="currentColor" rx="2" />

              <rect x="5" y="67" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="6" rx="4" />
              <rect x="11" y="73" width="16" height="16" fill="currentColor" rx="2" />

              {/* Data matrix pattern simulation */}
              <circle cx="42" cy="18" r="4" fill="currentColor" />
              <circle cx="55" cy="18" r="4" fill="currentColor" />
              <circle cx="42" cy="30" r="3" fill="currentColor" />
              <circle cx="55" cy="30" r="3" fill="currentColor" />

              <circle cx="18" cy="42" r="3" fill="currentColor" />
              <circle cx="30" cy="42" r="3" fill="currentColor" />
              <circle cx="45" cy="45" r="5" fill="#E1251B" />
              <circle cx="68" cy="45" r="4" fill="currentColor" />
              <circle cx="82" cy="45" r="3" fill="currentColor" />

              <circle cx="42" cy="68" r="4" fill="currentColor" />
              <circle cx="55" cy="68" r="3" fill="currentColor" />
              <circle cx="68" cy="68" r="4" fill="currentColor" />
              <circle cx="82" cy="82" r="4" fill="currentColor" />
            </svg>

            {/* Center Logo */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white p-1 rounded-lg shadow-sm border border-red-500/30">
                <span className="text-[10px] font-bold text-red-600 tracking-wider">KHQR</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs text-deepBrown-400">
            <Smartphone className="w-4 h-4 text-deepBrown-500" />
            <span>Scan with ABA Mobile, Bakong, or Wing</span>
          </div>

          {/* Simulation button for prototype */}
          <button
            onClick={onPaymentSuccess}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wide transition-colors shadow-soft flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>[Prototype] Simulate Payment Success</span>
          </button>
        </div>

        <div className="bg-cream-100 p-3 text-[10px] text-deepBrown-400 border-t border-cream-200 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Secured by National Bank of Cambodia (NBC) Bakong</span>
        </div>
      </div>
    </div>
  );
};
