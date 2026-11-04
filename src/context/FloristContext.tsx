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
  CartItem,
  BouquetSizeOption
} from '../types';
import { FLOWERS_DATA, GREENERY_OPTIONS, WRAPPING_OPTIONS, WRAPPING_STYLES, RIBBON_OPTIONS, BOUQUET_SIZES } from '../data/flowers';
import { PHNOM_PENH_DISTRICTS } from '../data/districts';
import { QUANTITY_SYMBOLISM } from '../data/meanings';

interface FloristContextType {
  // Session & Customer Identity
  sessionId: string;
  userId: string | null;
  setUserId: (id: string | null) => void;
  startNewSession: () => void;
  switchSession: (sid: string) => void;

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

  // Shopping Cart (Customer Isolated)
  cartItems: CartItem[];
  addToCart: (itemOverride?: Partial<CartItem>) => CartItem;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

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

// Cleanup deprecated un-scoped static keys from prior builds to prevent legacy state leakage
if (typeof window !== 'undefined') {
  try {
    const deprecated = [
      'floranote_stems',
      'floranote_bouquet_size',
      'floranote_greenery',
      'floranote_wrap_style',
      'floranote_wrappings',
      'floranote_ribbon',
      'floranote_card',
      'floranote_delivery',
      'floranote_orders'
    ];
    deprecated.forEach(k => {
      localStorage.removeItem(k);
      sessionStorage.removeItem(k);
    });
  } catch (e) {
    /* ignore */
  }
}

// Session identification logic: per-tab/visitor unique session ID
function getInitialSessionId(): string {
  // 1. Check for URL query param (?session=... or ?sid=...)
  if (typeof window !== 'undefined' && window.location) {
    try {
      const params = new URLSearchParams(window.location.search);
      const sid = params.get('session') || params.get('sid');
      if (sid && sid.trim().length > 0) {
        sessionStorage.setItem('floranote_session_id', sid.trim());
        return sid.trim();
      }
    } catch (e) {
      /* ignore */
    }
  }

  // 2. Check tab-isolated sessionStorage
  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      const existing = sessionStorage.getItem('floranote_session_id');
      if (existing && existing.trim().length > 0) {
        return existing.trim();
      }
    } catch (e) {
      /* ignore */
    }
  }

  // 3. New visitor or new window/tab: generate a unique anonymous session ID
  const newSid = `fn_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      sessionStorage.setItem('floranote_session_id', newSid);
    } catch (e) {
      /* ignore */
    }
  }
  return newSid;
}

// Scoped Storage Helpers: All customer data is strictly namespaced under their session or auth ID
function getScopedKey(prefix: string, key: string): string {
  return `floranote_${prefix}_${key}`;
}

function loadScopedData<T>(prefix: string, key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  const scopedKey = getScopedKey(prefix, key);
  try {
    // Check tab-isolated sessionStorage first
    const sessionVal = window.sessionStorage.getItem(scopedKey);
    if (sessionVal) return JSON.parse(sessionVal);

    // Fallback to scoped localStorage
    const localVal = window.localStorage.getItem(scopedKey);
    if (localVal) return JSON.parse(localVal);
  } catch (e) {
    console.warn(`Failed reading scoped storage key ${scopedKey}`, e);
  }
  return defaultValue;
}

function saveScopedData<T>(prefix: string, key: string, value: T): void {
  if (typeof window === 'undefined') return;
  const scopedKey = getScopedKey(prefix, key);
  try {
    const serialized = JSON.stringify(value);
    window.sessionStorage.setItem(scopedKey, serialized);
    window.localStorage.setItem(scopedKey, serialized);
  } catch (e) {
    console.warn(`Failed writing scoped storage key ${scopedKey}`, e);
  }
}

export const FloristProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<PageTab>('home');

  // Customer Session & Authentication
  const [sessionId, setSessionId] = useState<string>(() => getInitialSessionId());
  const [userId, setUserIdState] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        return localStorage.getItem('floranote_auth_user_id') || null;
      } catch (e) {
        /* ignore */
      }
    }
    return null;
  });

  const setUserId = (id: string | null) => {
    setUserIdState(id);
    if (typeof window !== 'undefined') {
      try {
        if (id) {
          localStorage.setItem('floranote_auth_user_id', id);
        } else {
          localStorage.removeItem('floranote_auth_user_id');
        }
      } catch (e) {
        /* ignore */
      }
    }
  };

  // The active storage prefix: uses authenticated user ID if logged in, otherwise the isolated session ID
  const customerKey = userId ? `user_${userId}` : sessionId;

  // Bouquet Size State (Default: Large)
  const [bouquetSize, setBouquetSize] = useState<BouquetSizeOption>(() => {
    const saved = loadScopedData<any>(customerKey, 'bouquet_size', null);
    if (saved) {
      const match = BOUQUET_SIZES.find(b => b.id === saved.id);
      if (match) return match;
    }
    return BOUQUET_SIZES[2]; // Large
  });

  // Selected Stems State: Fresh session starts completely clean with 0 stems
  const [selectedStems, setSelectedStems] = useState<SelectedStem[]>(() => {
    return loadScopedData<SelectedStem[]>(customerKey, 'stems', []);
  });

  // Selected Greenery: Fresh session starts with 0 greenery
  const [selectedGreenery, setSelectedGreenery] = useState<SelectedGreenery[]>(() => {
    return loadScopedData<SelectedGreenery[]>(customerKey, 'greenery', []);
  });

  // Wrapping Style State
  const [wrappingStyle, setWrappingStyle] = useState<WrappingStyle>(() => {
    const saved = loadScopedData<any>(customerKey, 'wrap_style', null);
    if (saved) {
      const match = WRAPPING_STYLES.find(s => s.id === saved.id);
      if (match) return match;
    }
    return WRAPPING_STYLES[0]; // Korean Dual-Layer
  });

  // Multiple wrappings support (inner wrap + outer wrap)
  const [selectedWrappings, setSelectedWrappings] = useState<WrappingOption[]>(() => {
    const saved = loadScopedData<WrappingOption[] | null>(customerKey, 'wrappings', null);
    if (saved && Array.isArray(saved) && saved.length > 0) {
      return saved;
    }
    return [
      WRAPPING_OPTIONS.find(w => w.id === 'matte-cream') || WRAPPING_OPTIONS[0],
      WRAPPING_OPTIONS.find(w => w.id === 'glossy-blush') || WRAPPING_OPTIONS[1]
    ];
  });

  // Ribbon selection
  const [selectedRibbon, setSelectedRibbon] = useState<RibbonOption>(() => {
    const saved = loadScopedData<any>(customerKey, 'ribbon', null);
    if (saved) {
      const match = RIBBON_OPTIONS.find(r => r.id === saved.id);
      if (match) return match;
    }
    return RIBBON_OPTIONS[0]; // Blush Silk Satin
  });

  // Card Data
  const [cardData, setCardData] = useState<GreetingCardData>(() => {
    return loadScopedData<GreetingCardData>(customerKey, 'card', DEFAULT_CARD);
  });

  // Delivery Data
  const [deliveryData, setDeliveryData] = useState<DeliveryDetails>(() => {
    return loadScopedData<DeliveryDetails>(customerKey, 'delivery', DEFAULT_DELIVERY);
  });

  // Shopping Cart Items
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    return loadScopedData<CartItem[]>(customerKey, 'cart', []);
  });

  // Placed Orders
  const [placedOrders, setPlacedOrders] = useState<OrderItem[]>(() => {
    return loadScopedData<OrderItem[]>(customerKey, 'orders', []);
  });

  const [activeConfirmedOrder, setActiveConfirmedOrder] = useState<OrderItem | null>(null);

  // Sync state to scoped storage
  useEffect(() => {
    saveScopedData(customerKey, 'bouquet_size', bouquetSize);
  }, [customerKey, bouquetSize]);

  useEffect(() => {
    saveScopedData(customerKey, 'stems', selectedStems);
  }, [customerKey, selectedStems]);

  useEffect(() => {
    saveScopedData(customerKey, 'greenery', selectedGreenery);
  }, [customerKey, selectedGreenery]);

  useEffect(() => {
    saveScopedData(customerKey, 'wrap_style', wrappingStyle);
  }, [customerKey, wrappingStyle]);

  useEffect(() => {
    saveScopedData(customerKey, 'wrappings', selectedWrappings);
  }, [customerKey, selectedWrappings]);

  useEffect(() => {
    saveScopedData(customerKey, 'ribbon', selectedRibbon);
  }, [customerKey, selectedRibbon]);

  useEffect(() => {
    saveScopedData(customerKey, 'card', cardData);
  }, [customerKey, cardData]);

  useEffect(() => {
    saveScopedData(customerKey, 'delivery', deliveryData);
  }, [customerKey, deliveryData]);

  useEffect(() => {
    saveScopedData(customerKey, 'cart', cartItems);
  }, [customerKey, cartItems]);

  useEffect(() => {
    saveScopedData(customerKey, 'orders', placedOrders);
  }, [customerKey, placedOrders]);

  // Start a fresh, clean customer session
  const startNewSession = () => {
    const nextSid = `fn_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('floranote_session_id', nextSid);
      try {
        const url = new URL(window.location.href);
        if (url.searchParams.has('session') || url.searchParams.has('sid')) {
          url.searchParams.delete('session');
          url.searchParams.delete('sid');
          window.history.replaceState({}, '', url.pathname + url.search);
        }
      } catch (e) {
        /* ignore */
      }
    }
    setSessionId(nextSid);
    setBouquetSize(BOUQUET_SIZES[2]);
    setSelectedStems([]);
    setSelectedGreenery([]);
    setWrappingStyle(WRAPPING_STYLES[0]);
    setSelectedWrappings([
      WRAPPING_OPTIONS.find(w => w.id === 'matte-cream') || WRAPPING_OPTIONS[0],
      WRAPPING_OPTIONS.find(w => w.id === 'glossy-blush') || WRAPPING_OPTIONS[1]
    ]);
    setSelectedRibbon(RIBBON_OPTIONS[0]);
    setCardData(DEFAULT_CARD);
    setDeliveryData(DEFAULT_DELIVERY);
    setCartItems([]);
    setPlacedOrders([]);
    setActiveConfirmedOrder(null);
  };

  // Switch to another session ID (e.g. for testing or resumption)
  const switchSession = (targetSessionId: string) => {
    if (!targetSessionId || targetSessionId === sessionId) return;
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('floranote_session_id', targetSessionId);
    }
    const tKey = userId ? `user_${userId}` : targetSessionId;
    setSessionId(targetSessionId);
    setBouquetSize(loadScopedData(tKey, 'bouquet_size', BOUQUET_SIZES[2]));
    setSelectedStems(loadScopedData(tKey, 'stems', []));
    setSelectedGreenery(loadScopedData(tKey, 'greenery', []));
    setWrappingStyle(loadScopedData(tKey, 'wrap_style', WRAPPING_STYLES[0]));
    setSelectedWrappings(loadScopedData(tKey, 'wrappings', [
      WRAPPING_OPTIONS.find(w => w.id === 'matte-cream') || WRAPPING_OPTIONS[0],
      WRAPPING_OPTIONS.find(w => w.id === 'glossy-blush') || WRAPPING_OPTIONS[1]
    ]));
    setSelectedRibbon(loadScopedData(tKey, 'ribbon', RIBBON_OPTIONS[0]));
    setCardData(loadScopedData(tKey, 'card', DEFAULT_CARD));
    setDeliveryData(loadScopedData(tKey, 'delivery', DEFAULT_DELIVERY));
    setCartItems(loadScopedData(tKey, 'cart', []));
    setPlacedOrders(loadScopedData(tKey, 'orders', []));
    setActiveConfirmedOrder(null);
  };

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

  // Toggle multiple wrapping papers
  const toggleWrapping = (wrapping: WrappingOption) => {
    setSelectedWrappings(prev => {
      const exists = prev.some(w => w.id === wrapping.id);
      if (exists) {
        if (prev.length <= 1) return prev;
        return prev.filter(w => w.id !== wrapping.id);
      } else {
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

  // Clean pricing: when no flowers are selected yet (clean fresh session), bouquet total is $0.00
  const rawBouquetCost = totalStemsCount > 0
    ? stemsSubtotal + greenerySubtotal + wrappingSubtotal + selectedRibbon.price + sizePriceAdjustment
    : 0;
  const totalBouquetCost = Math.max(0, rawBouquetCost);

  const currentDistrict = PHNOM_PENH_DISTRICTS.find(d => d.name === deliveryData.district) || PHNOM_PENH_DISTRICTS[0];
  const currentDistrictFee = currentDistrict.deliveryFee;
  const orderTotal = totalBouquetCost > 0 ? totalBouquetCost + currentDistrictFee : 0;

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

  // Shopping Cart Operations
  const addToCart = (itemOverride?: Partial<CartItem>): CartItem => {
    const newCartItem: CartItem = {
      id: 'cart_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      sessionId,
      bouquetSize: itemOverride?.bouquetSize || { ...bouquetSize },
      stems: itemOverride?.stems || [...selectedStems],
      greenery: itemOverride?.greenery || [...selectedGreenery],
      wrappingStyle: itemOverride?.wrappingStyle || { ...wrappingStyle },
      wrappings: itemOverride?.wrappings || [...selectedWrappings],
      ribbon: itemOverride?.ribbon || { ...selectedRibbon },
      card: itemOverride?.card || { ...cardData },
      totalBouquetCost: itemOverride?.totalBouquetCost !== undefined ? itemOverride.totalBouquetCost : totalBouquetCost,
      totalStemsCount: itemOverride?.totalStemsCount !== undefined ? itemOverride.totalStemsCount : totalStemsCount,
      addedAt: new Date().toISOString()
    };

    setCartItems(prev => [newCartItem, ...prev]);
    return newCartItem;
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems(prev => prev.filter(i => i.id !== cartItemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.totalBouquetCost, 0);
  const cartCount = cartItems.length;

  // Place Order (Isolated per customer session)
  const placeOrder = (): OrderItem => {
    const newOrder: OrderItem = {
      id: 'ord-' + Date.now(),
      orderNumber: 'NOTE-' + Math.floor(100000 + Math.random() * 900000),
      sessionId,
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

  // Expose testing handle on window for automated verification
  if (typeof window !== 'undefined') {
    (window as any).__floranoteSession = {
      getSessionId: () => sessionId,
      startNewSession,
      switchSession,
      getCartItems: () => cartItems,
      addToCart,
      clearBouquet,
      addFlowerStem,
      getPlacedOrders: () => placedOrders,
      getTotalBouquetCost: () => totalBouquetCost,
      getTotalStemsCount: () => totalStemsCount
    };
  }

  return (
    <FloristContext.Provider
      value={{
        sessionId,
        userId,
        setUserId,
        startNewSession,
        switchSession,
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
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
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
