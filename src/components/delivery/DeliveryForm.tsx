import React from 'react';
import { useFlorist } from '../../context/FloristContext';
import { PHNOM_PENH_DISTRICTS } from '../../data/districts';
import { MapPin, Calendar, Clock, Phone, User, ShieldCheck, QrCode, Banknote, CreditCard } from 'lucide-react';
import { PaymentMethod } from '../../types';

export const DeliveryForm: React.FC = () => {
  const { deliveryData, updateDeliveryData } = useFlorist();

  const handleDistrictChange = (districtName: string) => {
    updateDeliveryData({ district: districtName });
  };

  const paymentOptions: { id: PaymentMethod; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'khqr',
      label: 'ABA KHQR PayWay',
      desc: 'Scan with ABA Mobile, Bakong, or any Cambodian banking app',
      icon: <QrCode className="w-5 h-5 text-red-600" />
    },
    {
      id: 'cod',
      label: 'Cash on Delivery (COD)',
      desc: 'Pay cash quietly upon delivery to our discreet courier',
      icon: <Banknote className="w-5 h-5 text-emerald-600" />
    },
    {
      id: 'card',
      label: 'Credit / Debit Card',
      desc: 'Visa, Mastercard, or UnionPay online checkout',
      icon: <CreditCard className="w-5 h-5 text-deepBrown-500" />
    }
  ];

  const selectedDistrictInfo = PHNOM_PENH_DISTRICTS.find(d => d.name === deliveryData.district) || PHNOM_PENH_DISTRICTS[0];

  return (
    <div className="bg-cream-50 rounded-2xl p-6 border border-cream-300 shadow-soft space-y-6">
      <div>
        <h3 className="font-serif text-xl font-bold text-deepBrown-500 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-dustyPink-500" />
          <span>Recipient & Phnom Penh Delivery Details</span>
        </h3>
        <p className="text-xs text-deepBrown-400 mt-0.5">
          We ensure quiet, polite, and contactless delivery across Phnom Penh.
        </p>
      </div>

      {/* Recipient Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-deepBrown-500 block mb-1">
            Recipient's Full Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-deepBrown-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={deliveryData.recipientName}
              onChange={(e) => updateDeliveryData({ recipientName: e.target.value })}
              placeholder="e.g. Sok Chenda"
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-cream-100 border border-cream-300 text-deepBrown-500 placeholder-deepBrown-400/60 text-xs focus:outline-none focus:border-dustyPink-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-deepBrown-500 block mb-1">
            Recipient Contact Phone Number *
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-deepBrown-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              required
              value={deliveryData.recipientPhone}
              onChange={(e) => updateDeliveryData({ recipientPhone: e.target.value })}
              placeholder="012 345 678 (Smart / Cellcard / Metfone)"
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-cream-100 border border-cream-300 text-deepBrown-500 placeholder-deepBrown-400/60 text-xs focus:outline-none focus:border-dustyPink-500"
            />
          </div>
        </div>
      </div>

      {/* Phnom Penh District Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-deepBrown-500 block mb-1">
            Phnom Penh District (Khan) *
          </label>
          <select
            value={deliveryData.district}
            onChange={(e) => handleDistrictChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-cream-300 text-deepBrown-500 text-xs focus:outline-none focus:border-dustyPink-500 cursor-pointer"
          >
            {PHNOM_PENH_DISTRICTS.map(d => (
              <option key={d.name} value={d.name}>
                {d.name} ({d.khmerName}) — ${d.deliveryFee.toFixed(2)}
              </option>
            ))}
          </select>
          <div className="text-[10px] text-sage-600 mt-1">
            Est. Transit: {selectedDistrictInfo.estimatedDeliveryHours} • {selectedDistrictInfo.popularSpots}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-deepBrown-500 block mb-1">
            Street Address, Building & Room Number *
          </label>
          <input
            type="text"
            required
            value={deliveryData.address}
            onChange={(e) => updateDeliveryData({ address: e.target.value })}
            placeholder="e.g. Condo #402, Street 282, near Boeung Keng Kang"
            className="w-full px-3.5 py-2.5 rounded-xl bg-cream-100 border border-cream-300 text-deepBrown-500 placeholder-deepBrown-400/60 text-xs focus:outline-none focus:border-dustyPink-500"
          />
        </div>
      </div>

      {/* Date & Time Slot Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-cream-200">
        <div>
          <label className="text-xs font-semibold text-deepBrown-500 block mb-1">
            Preferred Delivery Date *
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-deepBrown-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="date"
              value={deliveryData.deliveryDate}
              onChange={(e) => updateDeliveryData({ deliveryDate: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
              className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-cream-100 border border-cream-300 text-deepBrown-500 text-xs focus:outline-none focus:border-dustyPink-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-deepBrown-500 block mb-1">
            Delivery Time Window *
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { id: 'morning', label: 'Morning', time: '8:00 - 11:30' },
              { id: 'afternoon', label: 'Afternoon', time: '13:00 - 16:30' },
              { id: 'sunset', label: 'Sunset', time: '17:00 - 20:00' },
            ].map(slot => {
              const isSelected = deliveryData.timeSlot === slot.id;
              return (
                <button
                  type="button"
                  key={slot.id}
                  onClick={() => updateDeliveryData({ timeSlot: slot.id as any })}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'border-dustyPink-500 bg-cream-100 ring-1 ring-dustyPink-400 font-semibold'
                      : 'border-cream-300 bg-cream-100/50 hover:bg-cream-100 text-deepBrown-400'
                  }`}
                >
                  <div className="text-xs text-deepBrown-500">{slot.label}</div>
                  <div className="text-[9px] text-deepBrown-400">{slot.time}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Special Courier Notes (Introvert friendly) */}
      <div>
        <label className="text-xs font-semibold text-deepBrown-500 block mb-1">
          Special Delivery Instructions (Introvert-friendly / Contactless)
        </label>
        <textarea
          rows={2}
          value={deliveryData.specialNotes}
          onChange={(e) => updateDeliveryData({ specialNotes: e.target.value })}
          placeholder="e.g., Leave with front condo security; please do not ring doorbell loudly; surprise gift for my girlfriend..."
          className="w-full p-3 rounded-xl bg-cream-100 border border-cream-300 text-deepBrown-500 placeholder-deepBrown-400/60 text-xs focus:outline-none focus:border-dustyPink-500 resize-none"
        />
      </div>

      {/* Payment Method Selector */}
      <div className="pt-2 border-t border-cream-200">
        <label className="text-xs font-semibold text-deepBrown-500 block mb-2">
          Select Payment Method
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {paymentOptions.map(opt => {
            const isSelected = deliveryData.paymentMethod === opt.id;
            return (
              <button
                type="button"
                key={opt.id}
                onClick={() => updateDeliveryData({ paymentMethod: opt.id })}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-dustyPink-500 bg-cream-100 shadow-xs ring-1 ring-dustyPink-400'
                    : 'border-cream-300 bg-cream-100/50 hover:bg-cream-100'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  {opt.icon}
                  <span className="text-xs font-bold text-deepBrown-500">{opt.label}</span>
                </div>
                <p className="text-[10px] text-deepBrown-400 leading-tight">
                  {opt.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
