export interface StemQuantityMeaning {
  count: number;
  label: string;
  symbolism: string;
  sentiment: string;
  recommendedFor: string;
}

export const QUANTITY_SYMBOLISM: StemQuantityMeaning[] = [
  {
    count: 1,
    label: '1 Stem — The Singular Devotion',
    symbolism: 'Love at first sight, you are my only one, complete focus on you.',
    sentiment: 'Understated, pure, and deeply personal. It speaks volumes without clutter.',
    recommendedFor: 'First confession, quiet apology, minimalist gesture',
  },
  {
    count: 3,
    label: '3 Stems — The Golden Trio',
    symbolism: 'I Love You (Yesterday, Today, and Tomorrow).',
    sentiment: 'A classic, intimate harmony representing shared memories and enduring commitment.',
    recommendedFor: 'Monthly anniversary, spontaneous surprise, romantic date',
  },
  {
    count: 7,
    label: '7 Stems — The Secret Fascination',
    symbolism: 'Secret infatuation, I am quietly captivated and enchanted by your presence.',
    sentiment: 'Perfect for shy admirers and introverts who admire someone from a tender distance.',
    recommendedFor: 'Secret admirer, crush confession, subtle romance',
  },
  {
    count: 9,
    label: '9 Stems — Together Forever',
    symbolism: 'Eternal longevity, unspoken promise to stay together for as long as we live.',
    sentiment: 'In Asian floriography, 9 represents permanence, harmony, and steadfast loyalty.',
    recommendedFor: 'Long-term partners, deep lifelong friendships, milestone celebrations',
  },
  {
    count: 12,
    label: '12 Stems — The Complete Bouquet',
    symbolism: 'Be mine! Total devotion through all 12 months of every year.',
    sentiment: 'A full, lush declaration that leaves no doubt about your sincerity and warmth.',
    recommendedFor: 'Proposals, Valentine’s Day, heartfelt grand apologies',
  },
  {
    count: 24,
    label: '24 Stems — 24 Hours on My Mind',
    symbolism: 'You are in my thoughts every single hour of the day and night.',
    sentiment: 'Lavish and romantic, expressing persistent and joyful devotion.',
    recommendedFor: 'Major anniversaries, romantic birthdays, long-distance reunions',
  },
  {
    count: 99,
    label: '99 Stems — Eternal & Unwavering',
    symbolism: 'Boundless love that will never fade as long as the earth turns.',
    sentiment: 'The ultimate royal gesture of dedication and timeless devotion.',
    recommendedFor: 'Engagement, golden anniversaries, life-defining celebrations',
  }
];

export const INTENTION_CATEGORIES = [
  { id: 'all', label: 'All Flowers' },
  { id: 'romance', label: 'Deep Romance' },
  { id: 'gratitude', label: 'Sincere Gratitude' },
  { id: 'apology', label: 'Quiet Apology' },
  { id: 'friendship', label: 'Pure Friendship' },
  { id: 'cheer', label: 'Comfort & Cheer' },
  { id: 'celebration', label: 'Success & Milestone' },
];
