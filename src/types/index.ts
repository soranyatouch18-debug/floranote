export type PageTab = 'home' | 'catalog' | 'builder' | 'card' | 'review';

export type BouquetSize = 'small' | 'medium' | 'large';

export interface BouquetSizeOption {
  id: BouquetSize;
  name: string;
  tagline: string;
  description: string;
  dimensions: string;
  recommendedStems: string;
  scaleFactor: number;
  priceAdjustment: number;
}

export interface FlowerColor {
  name: string;
  hex: string;
  symbolism?: string;
  image?: string;
}

export interface Flower {
  id: string;
  name: string;
  botanicalName: string;
  pricePerStem: number; // in USD: from $0.50 to $10.00
  unit?: 'stem' | 'bundle'; // pricing unit: 'stem' or 'bundle'
  colors: FlowerColor[];
  primaryMeaning: string;
  theoreticalPhilosophy: string; // Theoretical, philosophical, and metaphysical meaning
  psychologicalResonance: string; // Subconscious & emotional intention
  image: string;
  bestOccasions: string[];
  inStock: boolean;
  fragranceLevel: 'Mild' | 'Moderate' | 'Intense' | 'None';
  stemLengthCm: number;
}

export interface SelectedStem {
  flower: Flower;
  color: string;
  quantity: number;
}

export interface GreeneryOption {
  id: string;
  name: string;
  botanicalName: string;
  price: number;
  symbolism: string;
  image: string;
  visualDescription: string;
}

export interface SelectedGreenery {
  greenery: GreeneryOption;
  quantity: number;
}

export type PaperCategory = 'glossy' | 'khaki' | 'matte-korean' | 'linen' | 'pearl-metallic';

export interface WrappingOption {
  id: string;
  name: string;
  category: PaperCategory;
  categoryLabel: string;
  colorHex: string;
  colorName: string;
  finish: string;
  price: number;
}

export interface WrappingStyle {
  id: string;
  name: string;
  description: string;
  visualShape: string;
}

export interface RibbonOption {
  id: string;
  name: string;
  colorHex: string;
  colorName: string;
  material: string;
  price: number;
}

export type CardStyle = 'cream-minimal' | 'botanical-sage' | 'dusty-pink-blush' | 'vintage-kraft';

export interface GreetingCardData {
  style: CardStyle;
  occasion: string;
  recipientName: string;
  senderName: string;
  message: string;
  isAnonymous: boolean;
  useHandwriting: boolean;
}

export type PaymentMethod = 'khqr' | 'cod' | 'card';

export interface DeliveryDetails {
  recipientName: string;
  recipientPhone: string;
  district: string;
  address: string;
  deliveryDate: string;
  timeSlot: 'morning' | 'afternoon' | 'sunset';
  specialNotes: string;
  paymentMethod: PaymentMethod;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  createdAt: string;
  bouquetSize: BouquetSizeOption;
  stems: SelectedStem[];
  greenery: SelectedGreenery[];
  wrappingStyle: WrappingStyle;
  wrappings: WrappingOption[];
  ribbon: RibbonOption;
  card: GreetingCardData;
  delivery: DeliveryDetails;
  subtotal: number;
  wrappingPrice: number;
  ribbonPrice: number;
  deliveryFee: number;
  total: number;
  status: 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered';
}
