import { Flower, GreeneryOption, WrappingOption, WrappingStyle, RibbonOption, BouquetSizeOption } from '../types';

export const FLOWERS_DATA: Flower[] = [
{
    id: 'gardenias',
    name: 'White Gardenia',
    botanicalName: 'Gardenia jasminoides',
    pricePerStem: 0.50,
    unit: 'stem',
    colors: [
      {
        name: 'Velvet White',
        hex: '#FAF9F6',
        symbolism: 'Secret love & pure soul harmony',
        image: '/flowers/gardenias.png'
      },
      {
        name: 'Soft Ivory Cream',
        hex: '#F4EDE2',
        symbolism: 'Peaceful clarity & mindful gratitude',
        image: '/flowers/gardenias-cream.png'
      },
      {
        name: 'Blush Tint',
        hex: '#F6E4E6',
        symbolism: 'Gentle affection & tender thoughts',
        image: '/flowers/gardenias-blush.png'
      }
    ],
    primaryMeaning: 'Secret love, gentleness, my love for you is pure and eternal',
    theoreticalPhilosophy: 'Historically sent by shy Victorian admirers as a quiet token of unspoken devotion, gardenias represent secret affection carried without pretense. Their creamy petals and intoxicating aroma express a love so tender it needs no noisy proclamation.',
    psychologicalResonance: 'Subconsciously communicates: "I love you with quiet steadfastness, asking for nothing more than your happiness."',
    image: '/flowers/gardenias.png',
    bestOccasions: ['Romance', 'Just Because', 'Thinking of You', 'Apology'],
    inStock: true,
    fragranceLevel: 'Intense',
    stemLengthCm: 35,
  },
{
    id: 'gerberas',
    name: 'Artisan Gerbera Daisy',
    botanicalName: 'Gerbera jamesonii',
    pricePerStem: 0.50,
    unit: 'stem',
    colors: [
      {
        name: 'Blush Coral',
        hex: '#E78895',
        symbolism: 'Effortless warmth & radiant cheer',
        image: '/flowers/gerberas.png'
      },
      {
        name: 'Warm Amber Gold',
        hex: '#F4B41A',
        symbolism: 'Golden optimism & sunny energy',
        image: '/flowers/gerberas-yellow.png'
      },
      {
        name: 'Scarlet Crimson',
        hex: '#C8283E',
        symbolism: 'Passionate cheer & joyful love',
        image: '/flowers/gerberas-red.png'
      },
      {
        name: 'Soft Baby Pink',
        hex: '#F2B5C4',
        symbolism: 'Sweet gentleness & youthful charm',
        image: '/flowers/gerberas-pink.png'
      },
      {
        name: 'Pure White',
        hex: '#FAF9F6',
        symbolism: 'Clarity, innocence & honest light',
        image: '/flowers/gerberas-white.png'
      }
    ],
    primaryMeaning: 'Cheerfulness, joy, innocence, purity, and loyal love. (*3 stems: I love you, *6 stems: I admire you)',
    theoreticalPhilosophy: 'Gerberas are nature’s radiant smile. In the language of stem count floriography: 3 stems signify "I love you" with unvarnished honesty, while 6 stems declare "I admire you deeply". They radiate cheerful optimism and faithful affection.',
    psychologicalResonance: 'Subconsciously communicates: "You bring pure sunshine into my days; my affection for you is joyful and steadfast."',
    image: '/flowers/gerberas.png',
    bestOccasions: ['Birthday', 'Gratitude', 'Cheer Up', 'Romance'],
    inStock: true,
    fragranceLevel: 'None',
    stemLengthCm: 45,
  },
{
    id: 'rose',
    name: 'Classic Velvet Rose',
    botanicalName: 'Rosa rubiginosa',
    pricePerStem: 0.50,
    unit: 'stem',
    colors: [
      {
        name: 'Velvet Crimson',
        hex: '#8B1E2F',
        symbolism: 'Profound devotion & romantic love',
        image: '/flowers/rose-red.png'
      },
      {
        name: 'Soft Blush Pink',
        hex: '#E8B7BD',
        symbolism: 'Grace, sweetness & gentle admiration',
        image: '/flowers/rose.png'
      },
      {
        name: 'Pure Ivory White',
        hex: '#FAF7F4',
        symbolism: 'Spiritual purity & respectful honor',
        image: '/flowers/rose-white.png'
      },
      {
        name: 'Golden Sun Yellow',
        hex: '#F3C242',
        symbolism: 'Warm friendship & joyful celebration',
        image: '/flowers/rose-yellow.png'
      }
    ],
    primaryMeaning: 'Love, passion, romance',
    theoreticalPhilosophy: 'The undisputed monarch of romantic floriography. The red rose represents the passionate surrender of self-preservation in pursuit of an authentic, all-encompassing emotional connection.',
    psychologicalResonance: 'Subconsciously communicates: "My heart belongs to you completely, now and always."',
    image: '/flowers/rose.png',
    bestOccasions: ['Romance', 'Anniversary', 'Valentine', 'Reconciliation'],
    inStock: true,
    fragranceLevel: 'Moderate',
    stemLengthCm: 50,
  },
{
    id: 'marigold',
    name: 'Golden Sun Marigold',
    botanicalName: 'Tagetes erecta',
    pricePerStem: 0.60,
    unit: 'stem',
    colors: [
      {
        name: 'Brilliant Golden Orange',
        hex: '#E67E22',
        symbolism: 'Creativity, inner passion & endurance',
        image: '/flowers/marigold.png'
      },
      {
        name: 'Fiery Tangerine Red',
        hex: '#B83A1B',
        symbolism: 'Fierce resilience & radiant power',
        image: '/flowers/marigold-red.png'
      },
      {
        name: 'Lemon Sun Yellow',
        hex: '#F4D03F',
        symbolism: 'Vital warmth & life-affirming optimism',
        image: '/flowers/marigold-yellow.png'
      }
    ],
    primaryMeaning: 'Warmth, optimism, positivity',
    theoreticalPhilosophy: 'Resilient and fiercely radiant, marigolds celebrate the invincible power of warm optimism. They represent comforting presence that dispels heavy shadows and fills spaces with golden energy.',
    psychologicalResonance: 'Subconsciously communicates: "Your warmth lights up every room; stay bright and positive."',
    image: '/flowers/marigold.png',
    bestOccasions: ['Celebration', 'Graduation', 'Birthday', 'Cheer Up'],
    inStock: true,
    fragranceLevel: 'Moderate',
    stemLengthCm: 40,
  },
{
    id: 'carnation',
    name: 'Heritage Carnation',
    botanicalName: 'Dianthus caryophyllus',
    pricePerStem: 0.75,
    unit: 'stem',
    colors: [
      {
        name: 'Soft Petal Pink',
        hex: '#F1C7CF',
        symbolism: 'Enduring gratitude & maternal love',
        image: '/flowers/carnation.png'
      },
      {
        name: 'Velvet Crimson Red',
        hex: '#A32034',
        symbolism: 'Admiration, deep affection & longing',
        image: '/flowers/carnation-red.png'
      },
      {
        name: 'Pure White',
        hex: '#FAF9F6',
        symbolism: 'Sweet remembrance & pure sincerity',
        image: '/flowers/carnation-white.png'
      },
      {
        name: 'Vintage Peach',
        hex: '#EFC0AF',
        symbolism: 'Subtle charm & nostalgic warmth',
        image: '/flowers/carnation-peach.png'
      }
    ],
    primaryMeaning: 'Admiration and gratitude',
    theoreticalPhilosophy: 'Known for its ruffled endurance and longevity, the carnation is the timeless emblem of deep gratitude. It honors someone whose steady support and kindness have sustained your spirit.',
    psychologicalResonance: 'Subconsciously communicates: "I notice and deeply appreciate everything you do; thank you from the bottom of my heart."',
    image: '/flowers/carnation.png',
    bestOccasions: ['Gratitude', 'Mother’s Day', 'Friendship', 'Just Because'],
    inStock: true,
    fragranceLevel: 'Mild',
    stemLengthCm: 45,
  },
{
    id: 'sunflower',
    name: 'Helios Sunflower',
    botanicalName: 'Helianthus annuus',
    pricePerStem: 1.00,
    unit: 'stem',
    colors: [
      {
        name: 'Warm Amber Gold',
        hex: '#F4B41A',
        symbolism: 'Loyal adoration & steadfast loyalty',
        image: '/flowers/sunflower.png'
      },
      {
        name: 'Honey Ochre',
        hex: '#DA8A24',
        symbolism: 'Abundance, harvest warmth & vitality',
        image: '/flowers/sunflower-honey.png'
      },
      {
        name: 'Autumn Russet Red',
        hex: '#9C3826',
        symbolism: 'Deep grounding & timeless devotion',
        image: '/flowers/sunflower-russet.png'
      }
    ],
    primaryMeaning: 'Adoration, admiration',
    theoreticalPhilosophy: 'Perpetually turning its face toward the sun, the sunflower represents heliotropic devotion—the deliberate choice of steadfast loyalty regardless of cloud cover. It is the timeless declaration that you hold someone in highest admiration.',
    psychologicalResonance: 'Subconsciously communicates: "I look up to you with genuine respect and warmth; I am always in your corner."',
    image: '/flowers/sunflower.png',
    bestOccasions: ['Birthday', 'Graduation', 'Cheer Up', 'Friendship'],
    inStock: true,
    fragranceLevel: 'None',
    stemLengthCm: 55,
  },
{
    id: 'larkspur',
    name: 'Delphinium Larkspur',
    botanicalName: 'Consolida ajacis',
    pricePerStem: 1.00,
    unit: 'stem',
    colors: [
      {
        name: 'Ocean Indigo',
        hex: '#445D8E',
        symbolism: 'Open heart & lightness of spirit',
        image: '/flowers/larkspur.png'
      },
      {
        name: 'Soft Sky Blue',
        hex: '#8CA0BA',
        symbolism: 'Sweet tranquility & breezy freedom',
        image: '/flowers/larkspur-sky.png'
      },
      {
        name: 'Lilac Pink',
        hex: '#B88DA8',
        symbolism: 'Romantic whimsy & tender levity',
        image: '/flowers/larkspur-pink.png'
      },
      {
        name: 'Pure White',
        hex: '#FAF9F7',
        symbolism: 'Joyful optimism & pure laughter',
        image: '/flowers/larkspur-white.png'
      }
    ],
    primaryMeaning: 'Open heart and ardent attachment',
    theoreticalPhilosophy: 'Rising proudly in dramatic tall spires, larkspur signifies an open heart eager to give affection without reservation. It embodies generous attachment that holds nothing back.',
    psychologicalResonance: 'Subconsciously communicates: "My heart is completely open to you; I cherish every step of our shared journey."',
    image: '/flowers/larkspur.png',
    bestOccasions: ['Romance', 'Birthday', 'Anniversary', 'Celebration'],
    inStock: true,
    fragranceLevel: 'None',
    stemLengthCm: 60,
  },
{
    id: 'white-freesia',
    name: 'White Freesia',
    botanicalName: 'Freesia refracta',
    pricePerStem: 2.00,
    unit: 'stem',
    colors: [
      {
        name: 'Porcelain White',
        hex: '#FAF9F6',
        symbolism: 'Dreamlike reverence & gentle trust',
        image: '/flowers/white-freesia.png'
      },
      {
        name: 'Soft Cream Tint',
        hex: '#F5EDE7',
        symbolism: 'Innocent sweetness & calm presence',
        image: '/flowers/white-freesia-cream.png'
      },
      {
        name: 'Sunshine Yellow',
        hex: '#F6C644',
        symbolism: 'Playful optimism & joyful friendship',
        image: '/flowers/white-freesia-yellow.png'
      },
      {
        name: 'Lilac Purple',
        hex: '#B39CD0',
        symbolism: 'Graceful mystery & delicate romance',
        image: '/flowers/white-freesia-lilac.png'
      }
    ],
    primaryMeaning: 'Every moment with you feels like a dream',
    theoreticalPhilosophy: 'Known for its delicate bell-like arching stems and heavenly citrus aroma, white freesia symbolizes sweet surrender to an ethereal happiness. It embodies a transcendent relationship that feels too pure and gentle to belong to ordinary reality.',
    psychologicalResonance: 'Subconsciously communicates: "Being beside you feels peaceful, safe, and quietly miraculous."',
    image: '/flowers/white-freesia.png',
    bestOccasions: ['Romance', 'Anniversary', 'Just Because', 'Gratitude'],
    inStock: true,
    fragranceLevel: 'Intense',
    stemLengthCm: 35,
  },
{
    id: 'camellias',
    name: 'Pink Camellia',
    botanicalName: 'Camellia japonica',
    pricePerStem: 2.00,
    unit: 'stem',
    colors: [
      {
        name: 'Rose Camellia Pink',
        hex: '#E28498',
        symbolism: 'Romantic longing & enchantment',
        image: '/flowers/camellias.png'
      },
      {
        name: 'Pearl White',
        hex: '#FAF5F6',
        symbolism: 'Flawless perfection & understated grace',
        image: '/flowers/camellias-white.png'
      },
      {
        name: 'Scarlet Red',
        hex: '#C22D42',
        symbolism: 'Unwavering adoration & flaming desire',
        image: '/flowers/camellias-red.png'
      }
    ],
    primaryMeaning: 'Romantic longing, pink; I\'m fully enchanted by you',
    theoreticalPhilosophy: 'Unlike many blossoms that shed petals loosely, the camellia’s whole flower calyx remains intact with its stem when falling, symbolizing eternal devotion and unyielding longing. Gifting a pink camellia confesses that your thoughts are entirely held by their charm.',
    psychologicalResonance: 'Subconsciously communicates: "I long to be near you; your essence lingers with me wherever I go."',
    image: '/flowers/camellias.png',
    bestOccasions: ['Romance', 'Thinking of You', 'Valentine', 'Reconciliation'],
    inStock: true,
    fragranceLevel: 'Mild',
    stemLengthCm: 40,
  },
{
    id: 'lily',
    name: 'Casablanca White Lily',
    botanicalName: 'Lilium candidum',
    pricePerStem: 2.00,
    unit: 'stem',
    colors: [
      {
        name: 'Porcelain White',
        hex: '#FAF9F6',
        symbolism: 'Purity of intention & timeless dignity',
        image: '/flowers/lily.png'
      },
      {
        name: 'Stargazer Pink',
        hex: '#E26D86',
        symbolism: 'Prosperity, ambition & romantic wonder',
        image: '/flowers/lily-pink.png'
      },
      {
        name: 'Sunset Yellow',
        hex: '#F5C038',
        symbolism: 'Gratitude & celebratory joy',
        image: '/flowers/lily-yellow.png'
      }
    ],
    primaryMeaning: 'Purity, innocence, rebirth, and devotion',
    theoreticalPhilosophy: 'The white lily represents unclouded moral integrity and spiritual renewal. It operates in floriography as an ontological reset—cleansing misunderstandings and dedicating oneself anew with sincere devotion.',
    psychologicalResonance: 'Subconsciously communicates: "My intentions are completely sincere; let us start with a clean, peaceful heart."',
    image: '/flowers/lily.png',
    bestOccasions: ['Apology', 'Graduation', 'Sympathy', 'Homecoming'],
    inStock: true,
    fragranceLevel: 'Intense',
    stemLengthCm: 60,
  },
{
    id: 'iris',
    name: 'Royal Blue Iris',
    botanicalName: 'Iris germanica',
    pricePerStem: 2.00,
    unit: 'stem',
    colors: [
      {
        name: 'Deep Sapphire Blue',
        hex: '#3B4B8B',
        symbolism: 'Wisdom, courage & noble truth',
        image: '/flowers/iris.png'
      },
      {
        name: 'Velvet Purple',
        hex: '#633B78',
        symbolism: 'Regal eloquence & philosophical insight',
        image: '/flowers/iris-purple.png'
      },
      {
        name: 'Golden Amber Iris',
        hex: '#E5A932',
        symbolism: 'High passion & radiant intellect',
        image: '/flowers/iris-yellow.png'
      },
      {
        name: 'Snow White Iris',
        hex: '#FAF9F8',
        symbolism: 'Purity of mind & sacred peace',
        image: '/flowers/iris-white.png'
      }
    ],
    primaryMeaning: 'Wisdom, hope, courage',
    theoreticalPhilosophy: 'Named after the Greek goddess of the rainbow who served as messenger between heaven and earth, the iris represents the courage to hope and the wisdom to endure through challenging transitions.',
    psychologicalResonance: 'Subconsciously communicates: "You possess extraordinary inner strength; believe in the beautiful future ahead."',
    image: '/flowers/iris.png',
    bestOccasions: ['Graduation', 'Congratulations', 'Thinking of You', 'Birthday'],
    inStock: true,
    fragranceLevel: 'Mild',
    stemLengthCm: 55,
  },
{
    id: 'camomile',
    name: 'Wild Chamomile Daisy',
    botanicalName: 'Matricaria chamomilla',
    pricePerStem: 2.50,
    unit: 'bundle',
    colors: [
      {
        name: 'Sunny White',
        hex: '#FDFBF5',
        symbolism: 'Gentle patience & calm reassurance',
        image: '/flowers/camomile.png'
      },
      {
        name: 'Golden Buttercup',
        hex: '#F5CF47',
        symbolism: 'Bright resilience & quiet fortitude',
        image: '/flowers/camomile-yellow.png'
      }
    ],
    primaryMeaning: 'Patience, healing',
    theoreticalPhilosophy: 'In classical European herbal lore, chamomile was revered as the "healer of plants", bringing vitality wherever it took root. It symbolizes patient resilience during adversity and offers soothing emotional sanctuary to tired spirits.',
    psychologicalResonance: 'Subconsciously communicates: "Breathe gently. Take all the time you need; peace and healing are here."',
    image: '/flowers/camomile.png',
    bestOccasions: ['Thinking of You', 'Cheer Up', 'Apology', 'Self-Care'],
    inStock: true,
    fragranceLevel: 'Mild',
    stemLengthCm: 40,
  },
{
    id: 'violet',
    name: 'Sweet Woodland Violet',
    botanicalName: 'Viola odorata',
    pricePerStem: 2.50,
    unit: 'bundle',
    colors: [
      {
        name: 'Imperial Violet',
        hex: '#583D72',
        symbolism: 'Modesty, faithfulness & quiet depth',
        image: '/flowers/violet.png'
      },
      {
        name: 'Velvet Twilight Blue',
        hex: '#3B4E8C',
        symbolism: 'Constancy, trust & loyalty',
        image: '/flowers/violet-blue.png'
      },
      {
        name: 'Porcelain White',
        hex: '#FAF8FB',
        symbolism: 'Candor, innocence & quiet sincerity',
        image: '/flowers/violet-white.png'
      }
    ],
    primaryMeaning: 'Modesty, humility, faithfulness',
    theoreticalPhilosophy: 'Nestled humbly in shaded forest floors, the violet represents quiet virtue that feels no need to boast. It embodies faithfulness that endures without seeking applause or spotlight.',
    psychologicalResonance: 'Subconsciously communicates: "My faithfulness to you is unwavering, gentle, and true."',
    image: '/flowers/violet.png',
    bestOccasions: ['Friendship', 'Just Because', 'Thinking of You', 'Romance'],
    inStock: true,
    fragranceLevel: 'Mild',
    stemLengthCm: 25,
  },
  {
    id: 'tulips',
    name: 'French Tulip',
    botanicalName: 'Tulipa gesneriana',
    pricePerStem: 2.50,
    unit: 'stem',
    colors: [
      {
        name: 'Spring Peach',
        hex: '#F9C1A8',
        symbolism: 'Declaration of love & warmth',
        image: '/flowers/tulips.png'
      },
      {
        name: 'Soft White',
        hex: '#F5F4F0',
        symbolism: 'Fresh new beginning & forgiveness',
        image: '/flowers/tulips-white.png'
      },
      {
        name: 'Dusty Violet',
        hex: '#A88EBD',
        symbolism: 'Poetic spring warmth & royalty',
        image: '/flowers/tulips-violet.png'
      },
      {
        name: 'Crimson Red',
        hex: '#C81D35',
        symbolism: 'Passionate declaration of devotion',
        image: '/flowers/tulips-red.png'
      },
      {
        name: 'Sunshine Yellow',
        hex: '#F4C430',
        symbolism: 'Radiant cheer & hopeful joy',
        image: '/flowers/tulips-yellow.png'
      }
    ],
    primaryMeaning: 'Declaration of love, you make my every day feel like spring',
    theoreticalPhilosophy: 'In historical Persian floriography and Ottoman art, the tulip represents the unvarnished proclamation of genuine affection. It symbolizes the awakening of warmth after cold isolation—reminding the recipient that their presence brings perpetual spring.',
    psychologicalResonance: 'Subconsciously communicates: "Your presence in my life brings lightness, renewal, and effortless joy."',
    image: '/flowers/tulips.png',
    bestOccasions: ['Romance', 'Birthday', 'Just Because', 'Spring Celebration'],
    inStock: true,
    fragranceLevel: 'Mild',
    stemLengthCm: 40,
  },
  {
    id: 'forget-me-not',
    name: 'Woodland Forget-Me-Not',
    botanicalName: 'Myosotis sylvatica',
    pricePerStem: 3.00,
    unit: 'bundle',
    colors: [
      {
        name: 'Sky Azure',
        hex: '#7EA2C6',
        symbolism: 'True love & eternal memory',
        image: '/flowers/forget-me-not.png'
      },
      {
        name: 'Pastel Pink',
        hex: '#E8A5BD',
        symbolism: 'Tender remembrance & sweet affection',
        image: '/flowers/forget-me-not-pink.png'
      },
      {
        name: 'Snow White',
        hex: '#FAF9F7',
        symbolism: 'Innocent bonds & peaceful memory',
        image: '/flowers/forget-me-not-white.png'
      }
    ],
    primaryMeaning: 'Remembrance, true love, loyalty',
    theoreticalPhilosophy: 'According to medieval legend, a knight gathering these small blue blossoms along the Danube called to his beloved "Forget me not" before being swept by the current. It represents lasting remembrance and loyalty that time can never dissolve.',
    psychologicalResonance: 'Subconsciously communicates: "No matter where distance or time takes us, you are never forgotten."',
    image: '/flowers/forget-me-not.png',
    bestOccasions: ['Thinking of You', 'Anniversary', 'Friendship', 'Remembrance'],
    inStock: true,
    fragranceLevel: 'None',
    stemLengthCm: 30,
  },
{
    id: 'purple-dahlias',
    name: 'Purple Dahlia',
    botanicalName: 'Dahlia pinnata',
    pricePerStem: 3.25,
    unit: 'stem',
    colors: [
      {
        name: 'Deep Velvet Purple',
        hex: '#6A2E5B',
        symbolism: 'Singular muse & creative inspiration',
        image: '/flowers/purple-dahlias.png'
      },
      {
        name: 'Plum Violet',
        hex: '#4A1E3D',
        symbolism: 'Inner dignity & unrepeatable bond',
        image: '/flowers/purple-dahlias-plum.png'
      },
      {
        name: 'Blush Peach',
        hex: '#E8A598',
        symbolism: 'Subtle elegance & heartfelt appreciation',
        image: '/flowers/purple-dahlias-peach.png'
      },
      {
        name: 'Ruby Crimson',
        hex: '#7B1832',
        symbolism: 'Fierce commitment & steadfast loyalty',
        image: '/flowers/purple-dahlias-crimson.png'
      }
    ],
    primaryMeaning: 'You are my one and only muse',
    theoreticalPhilosophy: 'Victorian floriography celebrated the dahlia as the badge of unique commitment and profound artistic fascination. It speaks to a bond that elevates the mind, acknowledging the other person as the singular source of one’s creative and emotional inspiration.',
    psychologicalResonance: 'Subconsciously communicates: "You ignite my imagination. In a crowded world, you remain my only true inspiration."',
    image: '/flowers/purple-dahlias.png',
    bestOccasions: ['Romance', 'Anniversary', 'Thinking of You', 'Celebration'],
    inStock: true,
    fragranceLevel: 'Mild',
    stemLengthCm: 45,
  },
{
    id: 'hydrangeas',
    name: 'Cloud Hydrangea',
    botanicalName: 'Hydrangea macrophylla',
    pricePerStem: 5.00,
    unit: 'stem',
    colors: [
      {
        name: 'Soft Cornflower',
        hex: '#9BB8D3',
        symbolism: 'Gratitude for being understood',
        image: '/flowers/hydrangeas.png'
      },
      {
        name: 'Lilac Mist',
        hex: '#BCA8CE',
        symbolism: 'Deep heartfelt apology & empathy',
        image: '/flowers/hydrangeas-purple.png'
      },
      {
        name: 'Blush Pink',
        hex: '#E8A9BA',
        symbolism: 'Sincere romance & feminine grace',
        image: '/flowers/hydrangeas-pink.png'
      },
      {
        name: 'Cloud White',
        hex: '#FAF9F8',
        symbolism: 'Enduring grace & honest abundance',
        image: '/flowers/hydrangeas-white.png'
      }
    ],
    primaryMeaning: 'Sincerity, grace',
    theoreticalPhilosophy: 'With its cloud of countless delicate florets uniting into a harmonious sphere, the hydrangea represents the beauty of emotional honesty. Legend tells of an emperor who presented hydrangeas as a sincere gesture of apology and graceful reconciliation.',
    psychologicalResonance: 'Subconsciously communicates: "I come to you with sincere vulnerability, honoring the grace of our bond."',
    image: '/flowers/hydrangeas.png',
    bestOccasions: ['Apology', 'Gratitude', 'Reconciliation', 'Thinking of You'],
    inStock: true,
    fragranceLevel: 'Mild',
    stemLengthCm: 40,
  },
{
    id: 'lavender',
    name: 'French Meadow Lavender',
    botanicalName: 'Lavandula angustifolia',
    pricePerStem: 5.00,
    unit: 'bundle',
    colors: [
      {
        name: 'Misty Violet',
        hex: '#87749D',
        symbolism: 'Serenity, peace & silent devotion',
        image: '/flowers/lavender.png'
      },
      {
        name: 'Deep Royal Purple',
        hex: '#563777',
        symbolism: 'Meditation, protection & spiritual depth',
        image: '/flowers/lavender-purple.png'
      },
      {
        name: 'Soft Lavender Pink',
        hex: '#C7A5CA',
        symbolism: 'Gentle healing & quiet comfort',
        image: '/flowers/lavender-pink.png'
      }
    ],
    primaryMeaning: 'Serenity, calmness, devotion',
    theoreticalPhilosophy: 'Throughout monastic gardens, lavender stood for contemplative silence and inner peace. It proves that devotion does not require loud gestures, but is found in the calm stillness of shared understanding.',
    psychologicalResonance: 'Subconsciously communicates: "I bring you calm and sanctuary; you are safe and loved in my presence."',
    image: '/flowers/lavender.png',
    bestOccasions: ['Self-Care', 'Thinking of You', 'Apology', 'Graduation'],
    inStock: true,
    fragranceLevel: 'Intense',
    stemLengthCm: 35,
  },
{
    id: 'daisy',
    name: 'English Meadow Daisy',
    botanicalName: 'Bellis perennis',
    pricePerStem: 5.00,
    unit: 'bundle',
    colors: [
      {
        name: 'Pure White Ray',
        hex: '#FAF9F6',
        symbolism: 'Innocence, fresh starts & honest joy',
        image: '/flowers/daisy.png'
      },
      {
        name: 'Pastel Pink Ray',
        hex: '#F0B0C4',
        symbolism: 'Childlike wonder & playful affection',
        image: '/flowers/daisy-pink.png'
      },
      {
        name: 'Sunny Yellow Ray',
        hex: '#F5CE4A',
        symbolism: 'Morning warmth & bright sunshine',
        image: '/flowers/daisy-yellow.png'
      }
    ],
    primaryMeaning: 'Happiness, innocence, simplicity',
    theoreticalPhilosophy: 'Opening its petals as the morning sun rises ("day’s eye"), the daisy represents innocent cheer and unvarnished honesty. It celebrates the simple joys of connection stripped of complicated drama.',
    psychologicalResonance: 'Subconsciously communicates: "You make life simple, bright, and genuinely happy."',
    image: '/flowers/daisy.png',
    bestOccasions: ['Friendship', 'Birthday', 'Just Because', 'Cheer Up'],
    inStock: true,
    fragranceLevel: 'None',
    stemLengthCm: 30,
  },
{
    id: 'peonies',
    name: 'Sarah Bernhardt Peony',
    botanicalName: 'Paeonia lactiflora',
    pricePerStem: 6.00,
    unit: 'stem',
    colors: [
      {
        name: 'Petal Blush',
        hex: '#EEC2CA',
        symbolism: 'Forever captivated by your charm',
        image: '/flowers/peonies.png'
      },
      {
        name: 'Coral Rose',
        hex: '#E78895',
        symbolism: 'Abundant happiness & bashful love',
        image: '/flowers/peonies-coral.png'
      },
      {
        name: 'Ivory Silk White',
        hex: '#FBF8F5',
        symbolism: 'Enduring honor & serene purity',
        image: '/flowers/peonies-white.png'
      },
      {
        name: 'Crimson Wine',
        hex: '#8A1C30',
        symbolism: 'Deep passion & magnetic attraction',
        image: '/flowers/peonies-crimson.png'
      }
    ],
    primaryMeaning: 'Forever captivated by your charm',
    theoreticalPhilosophy: 'Revered as the monarch of romantic blooms in Eastern lore and European botanical gardens, the full-petaled peony symbolizes bashful tenderness and enduring enchantment. It honors the modesty of immense love that holds reverence in quiet contemplation.',
    psychologicalResonance: 'Subconsciously communicates: "My admiration for you grows deeper with every passing day."',
    image: '/flowers/peonies.png',
    bestOccasions: ['Anniversary', 'Romance', 'Celebration', 'Birthday'],
    inStock: true,
    fragranceLevel: 'Moderate',
    stemLengthCm: 45,
  },
{
    id: 'lily-of-the-valley',
    name: 'Lily of the Valley',
    botanicalName: 'Convallaria majalis',
    pricePerStem: 10.00,
    unit: 'bundle',
    colors: [
      {
        name: 'Pristine Bell White',
        hex: '#FAF9F6',
        symbolism: 'Return of happiness & quiet renewal',
        image: '/flowers/lily-of-the-valley.png'
      },
      {
        name: 'Soft Dawn Pink Tint',
        hex: '#F8E6E9',
        symbolism: 'Gentle rebirth & delicate hope',
        image: '/flowers/lily-of-the-valley-pink.png'
      }
    ],
    primaryMeaning: 'Good luck, happiness',
    theoreticalPhilosophy: 'In European spring folklore, gifting Lily of the Valley on the first day of May signifies wishing happiness and good fortune to those you love. Its delicate cascading white bells whisper the return of joy.',
    psychologicalResonance: 'Subconsciously communicates: "May peace, good fortune, and genuine happiness walk beside you always."',
    image: '/flowers/lily-of-the-valley.png',
    bestOccasions: ['Celebration', 'Thinking of You', 'Graduation', 'Birthday'],
    inStock: true,
    fragranceLevel: 'Intense',
    stemLengthCm: 25,
  }
];

export const GREENERY_OPTIONS: GreeneryOption[] = [
  {
    id: 'eucalyptus',
    name: 'Silver Dollar Eucalyptus',
    botanicalName: 'Eucalyptus cinerea',
    price: 1.20,
    symbolism: 'Grounding sanctuary, protection, and psychic clarity',
    image: '/greenery/eucalyptus.jpg',
    visualDescription: 'Rounded, matte silvery-blue coin leaves with aromatic soothing scent and graceful drooping branches that soften bouquet outlines.'
  },
  {
    id: 'ruscus',
    name: 'Italian Ruscus Foliage',
    botanicalName: 'Ruscus hypoglossum',
    price: 1.00,
    symbolism: 'Thoughtfulness, perseverance, and quiet inner strength',
    image: '/greenery/ruscus.jpg',
    visualDescription: 'Deep emerald glossy tapered foliage that cascades elegantly down the sides, offering rich visual contrast to light petals.'
  },
  {
    id: 'fern',
    name: 'Emerald Maidenhair Fern',
    botanicalName: 'Adiantum raddianum',
    price: 0.90,
    symbolism: 'Sincerity, hidden enchantment, and tender bonds',
    image: '/greenery/fern.jpg',
    visualDescription: 'Feathery, lace-like chartreuse fronds that introduce ethereal texture and airy volume around center blooms.'
  },
  {
    id: 'olive',
    name: 'Mediterranean Olive Branch',
    botanicalName: 'Olea europaea',
    price: 1.30,
    symbolism: 'Timeless peace, reconciliation, and sovereign harmony',
    image: '/greenery/olive.jpg',
    visualDescription: 'Dual-toned slender leaves with sage green upper surface and silvery velvet underside, evoking ancient olive groves.'
  }
];

export const WRAPPING_STYLES: WrappingStyle[] = [
  {
    id: 'korean-dual',
    name: 'Korean Dual-Layer Origami',
    description: 'Pleated multi-flap folds framing blooms with inner accent border and outer sculpted wings.',
    visualShape: 'Origami pleated wings'
  },
  {
    id: 'artisan-cone',
    name: 'Artisan French Bouquet Cone',
    description: 'Classic conical silhouette with flared collar highlighting bloom heads.',
    visualShape: 'Flared boutique cone'
  }
];

export const WRAPPING_OPTIONS: WrappingOption[] = [
  // Category 1: Glossy & Frosted Waterproof Film
  {
    id: 'glossy-blush',
    name: 'Blush Frosted Waterproof Film',
    category: 'glossy',
    categoryLabel: 'Glossy & Frosted Film',
    colorHex: '#E8B7BD',
    colorName: 'Dusty Pink',
    finish: 'Semi-translucent waterproof sheen with pearlescent rim',
    price: 0.50
  },
  {
    id: 'glossy-cream',
    name: 'Warm Cream Jelly Film',
    category: 'glossy',
    categoryLabel: 'Glossy & Frosted Film',
    colorHex: '#F5EDE7',
    colorName: 'Warm Cream',
    finish: 'Milky frosted Korean jelly wrap with soft luminous reflection',
    price: 0.50
  },
  {
    id: 'glossy-sage',
    name: 'Misty Sage Frosted Wrap',
    category: 'glossy',
    categoryLabel: 'Glossy & Frosted Film',
    colorHex: '#8D9B7A',
    colorName: 'Sage Green',
    finish: 'Translucent soft green dew film',
    price: 0.50
  },
  {
    id: 'glossy-espresso',
    name: 'Smoked Obsidian Gloss Film',
    category: 'glossy',
    categoryLabel: 'Glossy & Frosted Film',
    colorHex: '#453A38',
    colorName: 'Deep Brown',
    finish: 'Editorial smoked dark sheen for dramatic visual contrast',
    price: 0.50
  },

  // Category 2: Khaki & Earth Kraft Paper
  {
    id: 'khaki-natural',
    name: 'Raw Natural Earth Khaki',
    category: 'khaki',
    categoryLabel: 'Khaki & Kraft Paper',
    colorHex: '#CBB499',
    colorName: 'Rustic Khaki',
    finish: 'Organic textured recycled fiber with crisp structural crease',
    price: 0.50
  },
  {
    id: 'khaki-sand',
    name: 'Desert Sand Vintage Kraft',
    category: 'khaki',
    categoryLabel: 'Khaki & Kraft Paper',
    colorHex: '#DFD2C0',
    colorName: 'Warm Sand',
    finish: 'Pale earthen kraft paper with vintage tactile handfeel',
    price: 0.50
  },
  {
    id: 'khaki-coffee',
    name: 'Roasted Mocha Heavy Kraft',
    category: 'khaki',
    categoryLabel: 'Khaki & Kraft Paper',
    colorHex: '#8C7461',
    colorName: 'Mocha Khaki',
    finish: 'Heavyweight brown paper with artisanal durability',
    price: 0.50
  },
  {
    id: 'khaki-terracotta',
    name: 'Terracotta Clay Earth Kraft',
    category: 'khaki',
    categoryLabel: 'Khaki & Kraft Paper',
    colorHex: '#C87D65',
    colorName: 'Warm Terracotta',
    finish: 'Warm reddish earth tone textured paper',
    price: 0.50
  },

  // Category 3: Matte Korean Film
  {
    id: 'matte-cream',
    name: 'Seoul Frosted Matte Cream',
    category: 'matte-korean',
    categoryLabel: 'Matte Korean Paper',
    colorHex: '#FAF5F1',
    colorName: 'Ivory Cream',
    finish: 'Silky non-reflective matte finish favored by Gangnam florists',
    price: 0.50
  },
  {
    id: 'matte-pink',
    name: 'Rose Dust Korean Matte',
    category: 'matte-korean',
    categoryLabel: 'Matte Korean Paper',
    colorHex: '#EEC2CA',
    colorName: 'Petal Pink',
    finish: 'Velvety touch matte film in soft pastel blush',
    price: 0.50
  },
  {
    id: 'matte-sage',
    name: 'Eucalyptus Matte Tissue',
    category: 'matte-korean',
    categoryLabel: 'Matte Korean Paper',
    colorHex: '#A2B093',
    colorName: 'Pale Sage',
    finish: 'Soothing organic matte film',
    price: 0.50
  },
  {
    id: 'matte-lavender',
    name: 'Lilac Haze Korean Matte',
    category: 'matte-korean',
    categoryLabel: 'Matte Korean Paper',
    colorHex: '#C5B5D5',
    colorName: 'Misty Lavender',
    finish: 'Delicate dreamy matte purple tone',
    price: 0.50
  },

  // Category 4: Organic Linen & Fabric Wrap
  {
    id: 'linen-blush',
    name: 'Woven Blush Cotton Linen',
    category: 'linen',
    categoryLabel: 'Linen & Fabric Wrap',
    colorHex: '#E8B7BD',
    colorName: 'Dusty Pink',
    finish: 'Natural textile weave with frayed soft edge aesthetic',
    price: 0.50
  },
  {
    id: 'linen-cream',
    name: 'French Oat Unbleached Linen',
    category: 'linen',
    categoryLabel: 'Linen & Fabric Wrap',
    colorHex: '#ECE4DA',
    colorName: 'Oatmeal',
    finish: 'Textured artisanal woven flax with breathable organic drape',
    price: 0.50
  },
  {
    id: 'linen-sage',
    name: 'Herbal Garden Washed Linen',
    category: 'linen',
    categoryLabel: 'Linen & Fabric Wrap',
    colorHex: '#8D9B7A',
    colorName: 'Sage Green',
    finish: 'Soft stonewashed cotton-linen blend',
    price: 0.50
  },

  // Category 5: Pearl & Metallic Shimmer Paper
  {
    id: 'pearl-gold-rim',
    name: 'Champagne Pearl Gold-Rimmed Paper',
    category: 'pearl-metallic',
    categoryLabel: 'Pearl & Shimmer Paper',
    colorHex: '#F7F3E9',
    colorName: 'Champagne Shimmer',
    finish: 'Subtle metallic iridescent surface with gilded foil edge border',
    price: 0.50
  },
  {
    id: 'pearl-rose',
    name: 'Rose Gold Metallic Accent Film',
    category: 'pearl-metallic',
    categoryLabel: 'Pearl & Shimmer Paper',
    colorHex: '#D6A6A9',
    colorName: 'Rose Gold',
    finish: 'Soft metallic satin sheen capturing candlelight beautifully',
    price: 0.50
  },
  {
    id: 'pearl-charcoal',
    name: 'Midnight Bronze Luster Film',
    category: 'pearl-metallic',
    categoryLabel: 'Pearl & Shimmer Paper',
    colorHex: '#3D3432',
    colorName: 'Bronze Espresso',
    finish: 'Deep metallic luster with gold accents',
    price: 0.50
  }
];

export const RIBBON_OPTIONS: RibbonOption[] = [
  {
    id: 'ribbon-pink-satin',
    name: 'Blush Double-Faced Silk Satin',
    colorHex: '#E8B7BD',
    colorName: 'Dusty Pink',
    material: 'Double-faced Soft Silk Satin',
    price: 0.25
  },
  {
    id: 'ribbon-sage-velvet',
    name: 'Sage French Velvet',
    colorHex: '#8D9B7A',
    colorName: 'Sage Green',
    material: 'Plush European Velvet',
    price: 0.25
  },
  {
    id: 'ribbon-espresso-grosgrain',
    name: 'Deep Espresso Textured Grosgrain',
    colorHex: '#453A38',
    colorName: 'Deep Brown',
    material: 'Ribbed Heritage Grosgrain',
    price: 0.25
  },
  {
    id: 'ribbon-cream-organza',
    name: 'Ivory Chiffon Sheer Organza',
    colorHex: '#FAF5F1',
    colorName: 'Warm Cream',
    material: 'Featherlight Translucent Chiffon',
    price: 0.25
  },
  {
    id: 'ribbon-gold-shimmer',
    name: 'Champagne Luster Thread Ribbon',
    colorHex: '#D4AF37',
    colorName: 'Champagne Gold',
    material: 'Fine Metallic Weave',
    price: 0.25
  },
  {
    id: 'ribbon-twine-jute',
    name: 'Artisan Natural Jute Twine',
    colorHex: '#A89279',
    colorName: 'Natural Jute',
    material: 'Organic Handspun Twine',
    price: 0.25
  },
  {
    id: 'ribbon-wine-velvet',
    name: 'Burgundy Wine Velvet Ribbon',
    colorHex: '#6B1D2F',
    colorName: 'Wine Red',
    material: 'Deep Pile European Velvet',
    price: 0.25
  },
  {
    id: 'ribbon-sky-mist',
    name: 'Misty Blue Silk Ribbon',
    colorHex: '#9BB8D3',
    colorName: 'Sky Mist',
    material: 'Soft Flowing Silk',
    price: 0.25
  },
  {
    id: 'ribbon-terracotta',
    name: 'Terracotta Raw Edge Cotton',
    colorHex: '#C87D65',
    colorName: 'Terracotta',
    material: 'Hand-torn Artisan Cotton',
    price: 0.25
  }
];

export const BOUQUET_SIZES: BouquetSizeOption[] = [
  {
    id: 'small',
    name: 'Small',
    tagline: 'Petite & Intimate',
    description: 'A delicate, compact bouquet ideal for subtle desk gestures or bedside vases.',
    dimensions: '24cm × 34cm',
    recommendedStems: '1 – 6 stems',
    scaleFactor: 0.85,
    priceAdjustment: -3.00,
  },
  {
    id: 'medium',
    name: 'Medium',
    tagline: 'Classic & Balanced',
    description: 'A harmonious everyday bouquet with balanced volume, gracious folds, and elegant presence.',
    dimensions: '32cm × 42cm',
    recommendedStems: '5 – 12 stems',
    scaleFactor: 0.94,
    priceAdjustment: -1.50,
  },
  {
    id: 'large',
    name: 'Large',
    tagline: 'Grand & Signature',
    description: 'Our full-scale signature bouquet boasting rich volume, dramatic origami wings, and generous blooms.',
    dimensions: '40cm × 52cm',
    recommendedStems: '10 – 24+ stems',
    scaleFactor: 1.00,
    priceAdjustment: 0.00,
  },
];
