export interface DistrictInfo {
  name: string;
  khmerName: string;
  deliveryFee: number;
  estimatedDeliveryHours: string;
  popularSpots: string;
}

export const PHNOM_PENH_DISTRICTS: DistrictInfo[] = [
  {
    name: 'Boeung Keng Kang (BKK 1, 2, 3)',
    khmerName: 'ខណ្ឌបឹងកេងកង',
    deliveryFee: 1.50,
    estimatedDeliveryHours: '1 - 2 hours',
    popularSpots: 'BKK1, Bassac Lane, Street 302, St 51'
  },
  {
    name: 'Chamkarmon',
    khmerName: 'ខណ្ឌចំការមន',
    deliveryFee: 1.50,
    estimatedDeliveryHours: '1 - 2 hours',
    popularSpots: 'Russian Market, Tuol Tompoung, Tonle Bassac'
  },
  {
    name: 'Daun Penh',
    khmerName: 'ខណ្ឌដូនពេញ',
    deliveryFee: 1.75,
    estimatedDeliveryHours: '1 - 2 hours',
    popularSpots: 'Riverside, Royal Palace, Wat Phnom, Central Market'
  },
  {
    name: 'Toul Kork',
    khmerName: 'ខណ្ឌទួលគោក',
    deliveryFee: 2.00,
    estimatedDeliveryHours: '1.5 - 2.5 hours',
    popularSpots: 'TK Avenue, Boeung Kak, Eden Garden'
  },
  {
    name: 'Prampir Meakkakra (7 Makara)',
    khmerName: 'ខណ្ឌ៧មករា',
    deliveryFee: 1.75,
    estimatedDeliveryHours: '1 - 2 hours',
    popularSpots: 'Olympic Stadium, Orussey, Charles de Gaulle'
  },
  {
    name: 'Chroy Changvar',
    khmerName: 'ខណ្ឌជ្រោយចង្វារ',
    deliveryFee: 2.50,
    estimatedDeliveryHours: '2 - 3 hours',
    popularSpots: 'OCIC City, Mekong View, Peninsula'
  },
  {
    name: 'Sen Sok',
    khmerName: 'ខណ្ឌសែនសុខ',
    deliveryFee: 2.50,
    estimatedDeliveryHours: '2 - 3 hours',
    popularSpots: 'Aeon Mall 2, Chip Mong 271, Phnom Penh Thmey'
  },
  {
    name: 'Mean Chey',
    khmerName: 'ខណ្ឌមានជ័យ',
    deliveryFee: 2.50,
    estimatedDeliveryHours: '2 - 3 hours',
    popularSpots: 'Steung Meanchey, Chak Angre, Boeung Tumpun'
  },
  {
    name: 'Chbar Ampov',
    khmerName: 'ខណ្ឌច្បារអំពៅ',
    deliveryFee: 3.00,
    estimatedDeliveryHours: '2 - 3.5 hours',
    popularSpots: 'Peng Huoth Grand Star, Kien Svay border, Chbar Ampov 1'
  },
  {
    name: 'Russey Keo',
    khmerName: 'ខណ្ឌឫស្សីកែវ',
    deliveryFee: 2.50,
    estimatedDeliveryHours: '2 - 3 hours',
    popularSpots: 'Km 6, Chroy Changvar Bridge base, Toul Sangke'
  }
];
