import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PageTab,
  Flower,
  SelectedStem,
  SelectedGreenery,
  WrappingOption,
  WrappingStyle,
  RibbonOption,
  GreetingCardData,
  DeliveryDetails,
  OrderItem,
  BouquetSizeOption
} from '../types';
import { FLOWERS_DATA, GREENERY_OPTIONS, WRAPPING_OPTIONS, WRAPPING_STYLES, RIBBON_OPTIONS, BOUQUET_SIZES } from '../data/flowers';
import { PHNOM_PENH_DISTRICTS } from '../data/districts';
import { QUANTITY_SYMBOLISM } from '../data/meanings';

interface FloristContextType {
  currentTab: PageTab;
  setCurrentTab: (tab: PageTab) => void;

  // Bouquet Builder State
  bouquetSize: BouquetSizeOption;
  setBouquetSize: (size: BouquetSizeOption) => void;
  selectedStems: SelectedStem[];
  selectedGreenery: SelectedGreenery[];
  wrappingStyle: WrappingStyle;
  selectedWrappings: WrappingOption[];
  selectedRibbon: RibbonOption;

  addFlowerStem: (flower: Flower, color?: string, qty?: number) => void;
  updateStemQuantity: (flowerId: string, delta: number, color?: string) => void;
  removeStem: (flowerId: string, color?: string) => void;
  updateStemColor: (flowerId: string, oldColor: string, newColor: string) => void;
  updateGreeneryQuantity: (greeneryId: string, delta: number) => void;
  setWrappingStyle: (style: WrappingStyle) => void;
  setSelectedWrappings: (wrappings: WrappingOption[]) => void;
  toggleWrapping: (wrapping: WrappingOption) => void;
  setRibbon: (ribbon: RibbonOption) => void;
  clearBouquet: () => void;

  // Card State
  cardData: GreetingCardData;
  updateCardData: (updates: Partial<GreetingCardData>) => void;

  // Delivery State
  deliveryData: DeliveryDetails;
  updateDeliveryData: (updates: Partial<DeliveryDetails>) => void;
  currentDistrictFee: number;

  // Pricing & Metrics
  totalStemsCount: number;
  stemsSubtotal: number;
  greenerySubtotal: number;
  wrappingSubtotal: number;
  totalBouquetCost: number;
  orderTotal: number;

  // Theoretical Floriography synthesis
  synthesizedMeaning: string;
  theoreticalInsight: string;
  quantityMeaningNote?: string;

  // Orders
  placedOrders: OrderItem[];
  activeConfirmedOrder: OrderItem | null;
  placeOrder: () => OrderItem;
  closeConfirmation: () => void;
}

const FloristContext = createContext<FloristContextType | undefined>(undefined);

const DEFAULT_CARD: GreetingCardData = {
  style: 'cream-minimal',
  occasion: 'Thinking of You',
  recipientName: '',
  senderName: '',
  message: 'May these blooms bring a quiet moment of peace, beauty, and mindful presence to your day.',
  isAnonymous: false,
  useHandwriting: true,
};

const DEFAULT_DELIVERY: DeliveryDetails = {
  recipientName: '',
  recipientPhone: '',
  district: PHNOM_PENH_DISTRICTS[0].name,
  address: '',
  deliveryDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
  timeSlot: 'afternoon',
  specialNotes: '',
  paymentMethod: 'khqr',
};

export const FloristProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<PageTab>('home');

  // Bouquet Size State (Default: Large - keeping original full size)
  const [bouquetSize, setBouquetSize] = useState<BouquetSizeOption>(() => {
    const saved = localStorage.getItem('floranote_bouquet_size');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const match = BOUQUET_SIZES.find(b => b.id === parsed.id);
        if (match) return match;
      } catch (e) { /* ignore */ }
    }
    return BOUQUET_SIZES[2]; // Large
  });

  // Pre-populated boutique starter bouquet
  const [selectedStems, setSelectedStems] = useState<SelectedStem[]>(() => {
    const saved = localStorage.getItem('floranote_stems');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    const rose = FLOWERS_DATA.find(f => f.id === 'rose') || FLOWERS_DATA[0];
    const peony = FLOWERS_DATA.find(f => f.id === 'peonies') || FLOWERS_DATA[3];
    return [
      { flower: rose, color: rose.colors[0].name, quantity: 4 },
      { flower: peony, color: peony.colors[0].name, quantity: 2 }
    ];
  });

  const [selectedGreenery, setSelectedGreenery] = useState<SelectedGreenery[]>(() => {
    const saved = localStorage.getItem('floranote_greenery');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [{ greenery: GREENERY_OPTIONS[0], quantity: 2 }];
  });

  const [wrappingStyle, setWrappingStyle] = useState<WrappingStyle>(() => {
    const saved = localStorage.getItem('floranote_wrap_style');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (WRAPPING_STYLES.some(s => s.id === parsed.id)) return parsed;
      } catch (e) { /* ignore */ }
    }
    return WRAPPING_STYLES[0]; // Korean Dual-Layer
  });

  // Multiple wrappings support (e.g. inner wrap + outer wrap)
  const [selectedWrappings, setSelectedWrappings] = useState<WrappingOption[]>(() => {
    const saved = localStorage.getItem('floranote_wrappings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    // Default: Cream Matte inner + Dusty Pink outer
    return [
      WRAPPING_OPTIONS.find(w => w.id === 'matte-cream') || WRAPPING_OPTIONS[0],
      WRAPPING_OPTIONS.find(w => w.id === 'glossy-blush') || WRAPPING_OPTIONS[1]
    ];
  });

  const [selectedRibbon, setSelectedRibbon] = useState<RibbonOption>(() => {
    const saved = localStorage.getItem('floranote_ribbon');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return RIBBON_OPTIONS[0]; // Blush Silk Satin
  });

  const [cardData, setCardData] = useState<GreetingCardData>(() => {
    const saved = localStorage.getItem('floranote_card');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return DEFAULT_CARD;
  });

  const [deliveryData, setDeliveryData] = useState<DeliveryDetails>(() => {
    const saved = localStorage.getItem('floranote_delivery');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return DEFAULT_DELIVERY;
  });

  const [placedOrders, setPlacedOrders] = useState<OrderItem[]>(() => {
    const saved = localStorage.getItem('floranote_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  const [activeConfirmedOrder, setActiveConfirmedOrder] = useState<OrderItem | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('floranote_bouquet_size', JSON.stringify(bouquetSize));
  }, [bouquetSize]);

  useEffect(() => {
    localStorage.setItem('floranote_stems', JSON.stringify(selectedStems));
  }, [selectedStems]);

  useEffect(() => {
    localStorage.setItem('floranote_greenery', JSON.stringify(selectedGreenery));
  }, [selectedGreenery]);

  useEffect(() => {
    localStorage.setItem('floranote_wrap_style', JSON.stringify(wrappingStyle));
  }, [wrappingStyle]);

  useEffect(() => {
    localStorage.setItem('floranote_wrappings', JSON.stringify(selectedWrappings));
  }, [selectedWrappings]);

  useEffect(() => {
    localStorage.setItem('floranote_ribbon', JSON.stringify(selectedRibbon));
  }, [selectedRibbon]);

  useEffect(() => {
    localStorage.setItem('floranote_card', JSON.stringify(cardData));
  }, [cardData]);

  useEffect(() => {
    localStorage.setItem('floranote_delivery', JSON.stringify(deliveryData));
  }, [deliveryData]);

  useEffect(() => {
    localStorage.setItem('floranote_orders', JSON.stringify(placedOrders));
  }, [placedOrders]);

  // Actions for Stems
  const addFlowerStem = (flower: Flower, color?: string, qty = 1) => {
    setSelectedStems(prev => {
      const chosenColor = color || flower.colors[0]?.name || 'Standard';
      const existing = prev.find(s => s.flower.id === flower.id && s.color === chosenColor);
      if (existing) {
        return prev.map(s =>
          s.flower.id === flower.id && s.color === chosenColor
            ? { ...s, quantity: Math.min(s.quantity + qty, 50) }
            : s
        );
      }
      return [...prev, { flower, color: chosenColor, quantity: qty }];
    });
  };

  const updateStemQuantity = (flowerId: string, delta: number, color?: string) => {
    setSelectedStems(prev =>
      prev
        .map(s => {
          if (s.flower.id === flowerId && (!color || s.color === color)) {
            const nextQty = s.quantity + delta;
            return nextQty > 0 ? { ...s, quantity: nextQty } : null;
          }
          return s;
        })
        .filter(Boolean) as SelectedStem[]
    );
  };

  const removeStem = (flowerId: string, color?: string) => {
    setSelectedStems(prev => prev.filter(s => !(s.flower.id === flowerId && (!color || s.color === color))));
  };

  const updateStemColor = (flowerId: string, oldColor: string, newColor: string) => {
    setSelectedStems(prev => {
      // If a stem with the target newColor already exists, merge quantities
      const existingNew = prev.find(s => s.flower.id === flowerId && s.color === newColor);
      const current = prev.find(s => s.flower.id === flowerId && s.color === oldColor);
      if (!current) return prev;
      if (existingNew && oldColor !== newColor) {
        return prev
          .map(s => s.flower.id === flowerId && s.color === newColor ? { ...s, quantity: s.quantity + current.quantity } : s)
          .filter(s => !(s.flower.id === flowerId && s.color === oldColor));
      }
      return prev.map(s => s.flower.id === flowerId && s.color === oldColor ? { ...s, color: newColor } : s);
    });
  };

  // Actions for Greenery
  const updateGreeneryQuantity = (greeneryId: string, delta: number) => {
    setSelectedGreenery(prev => {
      const existing = prev.find(g => g.greenery.id === greeneryId);
      if (existing) {
        const nextQty = existing.quantity + delta;
        if (nextQty <= 0) {
          return prev.filter(g => g.greenery.id !== greeneryId);
        }
        return prev.map(g => g.greenery.id === greeneryId ? { ...g, quantity: nextQty } : g);
      } else if (delta > 0) {
        const gOption = GREENERY_OPTIONS.find(g => g.id === greeneryId);
        if (gOption) return [...prev, { greenery: gOption, quantity: delta }];
      }
      return prev;
    });
  };

  // Toggle multiple wrapping papers (allows choosing 1, 2, or 3 papers, e.g. inner & outer accent)
  const toggleWrapping = (wrapping: WrappingOption) => {
    setSelectedWrappings(prev => {
      const exists = prev.some(w => w.id === wrapping.id);
      if (exists) {
        // Keep at least one wrapping paper
        if (prev.length <= 1) return prev;
        return prev.filter(w => w.id !== wrapping.id);
      } else {
        // Allow up to 3 wrapping papers max for layered compositions
        if (prev.length >= 3) {
          return [...prev.slice(1), wrapping];
        }
        return [...prev, wrapping];
      }
    });
  };

  const clearBouquet = () => {
    setSelectedStems([]);
    setSelectedGreenery([]);
  };

  const updateCardData = (updates: Partial<GreetingCardData>) => {
    setCardData(prev => ({ ...prev, ...updates }));
  };

  const updateDeliveryData = (updates: Partial<DeliveryDetails>) => {
    setDeliveryData(prev => ({ ...prev, ...updates }));
  };

  // Pricing Calculations
  const totalStemsCount = selectedStems.reduce((acc, s) => acc + s.quantity, 0);
  const stemsSubtotal = selectedStems.reduce((acc, s) => acc + (s.flower.pricePerStem * s.quantity), 0);
  const greenerySubtotal = selectedGreenery.reduce((acc, g) => acc + (g.greenery.price * g.quantity), 0);
  const wrappingSubtotal = selectedWrappings.reduce((acc, w) => acc + w.price, 0);
  const sizePriceAdjustment = bouquetSize.priceAdjustment;
  const rawBouquetCost = stemsSubtotal + greenerySubtotal + wrappingSubtotal + selectedRibbon.price + sizePriceAdjustment;
  const totalBouquetCost = Math.max(0, rawBouquetCost);

  const currentDistrict = PHNOM_PENH_DISTRICTS.find(d => d.name === deliveryData.district) || PHNOM_PENH_DISTRICTS[0];
  const currentDistrictFee = currentDistrict.deliveryFee;
  const orderTotal = totalBouquetCost + currentDistrictFee;

  // Deep theoretical floriography synthesis
  const synthesizedMeaning = (() => {
    if (selectedStems.length === 0) return 'Gather flowers to formulate their philosophical meaning.';
    const meanings = selectedStems.map(s => s.flower.primaryMeaning.split('&')[0].trim());
    const unique = Array.from(new Set(meanings));
    if (unique.length === 1) return `An intentional declaration of ${unique[0]}.`;
    if (unique.length === 2) return `A dialectical dialogue of ${unique[0]} grounded in ${unique[1]}.`;
    return `An intricate poetic tapestry weaving ${unique.slice(0, 2).join(', ')} with ${unique[2]}.`;
  })();

  const theoreticalInsight = (() => {
    if (selectedStems.length === 0) return 'In floriography, each botanical arrangement acts as a silent language of existential intent.';
    return selectedStems[0]?.flower?.theoreticalPhilosophy || 'Flowers communicate beyond the limits of human speech.';
  })();

  const quantityMeaningNote = (() => {
    const match = QUANTITY_SYMBOLISM.find(q => q.count === totalStemsCount);
    if (match) return `${match.label}: ${match.symbolism}`;
    if (totalStemsCount > 0) return `${totalStemsCount} stems composed in contemplative balance.`;
    return undefined;
  })();

  // Place Order
  const placeOrder = (): OrderItem => {
    const newOrder: OrderItem = {
      id: 'ord-' + Date.now(),
      orderNumber: 'NOTE-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      bouquetSize: { ...bouquetSize },
      stems: [...selectedStems],
      greenery: [...selectedGreenery],
      wrappingStyle,
      wrappings: [...selectedWrappings],
      ribbon: selectedRibbon,
      card: { ...cardData },
      delivery: { ...deliveryData },
      subtotal: stemsSubtotal + greenerySubtotal,
      wrappingPrice: wrappingSubtotal,
      ribbonPrice: selectedRibbon.price,
      deliveryFee: currentDistrictFee,
      total: orderTotal,
      status: 'Confirmed'
    };

    setPlacedOrders(prev => [newOrder, ...prev]);
    setActiveConfirmedOrder(newOrder);
    return newOrder;
  };

  const closeConfirmation = () => {
    setActiveConfirmedOrder(null);
  };

  return (
    <FloristContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        bouquetSize,
        setBouquetSize,
        selectedStems,
        selectedGreenery,
        wrappingStyle,
        selectedWrappings,
        selectedRibbon,
        addFlowerStem,
        updateStemQuantity,
        removeStem,
        updateStemColor,
        updateGreeneryQuantity,
        setWrappingStyle,
        setSelectedWrappings,
        toggleWrapping,
        setRibbon: setSelectedRibbon,
        clearBouquet,
        cardData,
        updateCardData,
        deliveryData,
        updateDeliveryData,
        currentDistrictFee,
        totalStemsCount,
        stemsSubtotal,
        greenerySubtotal,
        wrappingSubtotal,
        totalBouquetCost,
        orderTotal,
        synthesizedMeaning,
        theoreticalInsight,
        quantityMeaningNote,
        placedOrders,
        activeConfirmedOrder,
        placeOrder,
        closeConfirmation
      }}
    >
      {children}
    </FloristContext.Provider>
  );
};

export const useFlorist = () => {
  const context = useContext(FloristContext);
  if (!context) throw new Error('useFlorist must be used within a FloristProvider');
  return context;
};
