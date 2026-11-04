export interface MessageTemplate {
  id: string;
  occasion: string;
  title: string;
  tone: 'Poetic' | 'Tender' | 'Playful' | 'Deep' | 'Minimalist';
  text: string;
}

export const OCCASIONS_LIST = [
  'Birthday',
  'Anniversary & Romance',
  'Apology & Forgiveness',
  'Gratitude & Thanks',
  'Thinking of You',
  'Graduation & Success',
  'Just Because'
];

export const MESSAGE_TEMPLATES: MessageTemplate[] = [
  // Birthday
  {
    id: 'bday-1',
    occasion: 'Birthday',
    title: 'Quiet Celebration',
    tone: 'Tender',
    text: 'Wishing you a day as peaceful, bright, and gentle as you make the world for everyone around you. Happy Birthday!'
  },
  {
    id: 'bday-2',
    occasion: 'Birthday',
    title: 'Blossoming Another Year',
    tone: 'Poetic',
    text: 'May this year unfold for you like these delicate petals—with effortless grace, quiet joy, and abundant quiet moments.'
  },
  {
    id: 'bday-3',
    occasion: 'Birthday',
    title: 'Warm & Simple',
    tone: 'Minimalist',
    text: 'Another trip around the sun! Hope your day is filled with your favorite quiet things, good coffee, and lots of warmth.'
  },

  // Romance & Anniversary
  {
    id: 'rom-1',
    occasion: 'Anniversary & Romance',
    title: 'Words are Hard, but My Heart is Full',
    tone: 'Deep',
    text: 'I may not always find the perfect words to say out loud, but every flower here was picked with you in mind. Thank you for being my favorite safe place.'
  },
  {
    id: 'rom-2',
    occasion: 'Anniversary & Romance',
    title: 'Quiet Love',
    tone: 'Poetic',
    text: 'Loving you is like breathing—quiet, steady, and the sweetest part of my every day. Happy Anniversary, my heart.'
  },
  {
    id: 'rom-3',
    occasion: 'Anniversary & Romance',
    title: 'Always You',
    tone: 'Minimalist',
    text: 'In a noisy world, your love is my peace. Forever grateful to walk this journey hand in hand with you.'
  },

  // Apology & Forgiveness
  {
    id: 'apol-1',
    occasion: 'Apology & Forgiveness',
    title: 'Sincere Reconciliation',
    tone: 'Deep',
    text: 'I am truly sorry for my words and actions. You and our connection mean more to me than my ego ever could. I hope these flowers can be a quiet bridge toward healing.'
  },
  {
    id: 'apol-2',
    occasion: 'Apology & Forgiveness',
    title: 'Gentle Peace Offering',
    tone: 'Tender',
    text: 'I hate the distance between us. Please accept these flowers as my sincere apology and a wish to listen whenever you are ready.'
  },

  // Gratitude
  {
    id: 'grat-1',
    occasion: 'Gratitude & Thanks',
    title: 'Heartfelt Appreciation',
    tone: 'Tender',
    text: 'Thank you for your boundless kindness. Having someone like you in my corner makes every obstacle so much easier to bear.'
  },
  {
    id: 'grat-2',
    occasion: 'Gratitude & Thanks',
    title: 'Quiet Strength',
    tone: 'Deep',
    text: 'Your patience, understanding, and generous heart never go unnoticed. Thank you for simply being you.'
  },

  // Thinking of You
  {
    id: 'think-1',
    occasion: 'Thinking of You',
    title: 'A Little Hug in Bloom',
    tone: 'Tender',
    text: 'Just wanted to send a little reminder that you are loved, remembered, and held in high regard today. Take all the time you need to rest.'
  },
  {
    id: 'think-2',
    occasion: 'Thinking of You',
    title: 'No Pressure, Just Love',
    tone: 'Playful',
    text: 'No need to reply or call back! Just let these blooms sit beside you and brighten your space today.'
  },

  // Graduation & Success
  {
    id: 'grad-1',
    occasion: 'Graduation & Success',
    title: 'Proud of Your Dedication',
    tone: 'Poetic',
    text: 'You put in the silent work, early mornings, and perseverance. Today you bloom in full brilliance! So incredibly proud of you.'
  }
];
