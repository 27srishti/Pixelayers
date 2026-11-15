// All site copy and data in one place. Edit here; the components read from it.
const BASE = import.meta.env.BASE_URL;
export const media = (name) => `${BASE}media/${name}`;
export const asset = (name) => `${BASE}${name}`;

export const LINKS = {
  message: 'https://ig.me/m/pixelayers_com', // opens an Instagram chat with Pixelayers
  instagram: 'https://www.instagram.com/pixelayers_com/',
  handle: '@pixelayers_com',
};

export const NAV = [
  { href: '#why', label: 'Why us' },
  { href: '#how', label: 'How it works' },
  { href: '#samples', label: 'Samples' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

export const BUSINESS_TYPES = [
  'Cafés', 'Salons', 'Med spas', 'Boutiques', 'Bakeries', 'Remodelers', 'Gift shops', 'Clinics', 'Studios', 'Local services',
];

export const STEPS = [
  { title: 'Send us a message', text: 'Share your business name, a link to your website or social page, and any photos you have.' },
  { title: 'Get a free sample video', text: 'We make a sample promo for your business, so you see the quality first. No cost, no commitment.' },
  { title: 'Choose your plan', text: 'Pick 30-second or 60-second videos. One simple monthly price.' },
  { title: 'Receive 10 videos a month', text: 'Ready to post on Reels, Stories and your feed, delivered in our chat.' },
];

// Concept samples: every business here is fictional.
export const SAMPLES = [
  { id: 'salon', name: 'Luma Hair Studio', kind: 'Salon', style: 'Photo-based' },
  { id: 'cafe', name: 'Ember & Oat Café', kind: 'Café', style: 'Animated' },
  { id: 'medspa', name: 'Alder Aesthetics', kind: 'Med spa', style: 'Photo-based' },
  { id: 'kitchen', name: 'Hearthline Kitchen & Bath', kind: 'Remodeling', style: 'Photo-based' },
  { id: 'giftshop', name: 'Sprucewick Gift Shop', kind: 'Gift shop', style: 'Animated' },
];

export const NOT_NEEDED = ['No filming', 'No software to learn', 'No prompts to write', 'No editing'];

export const CHAT = [
  { from: 'you', text: 'Hi! I run a small café. Here’s our page and a few photos.' },
  { from: 'us', text: 'Thanks! We’ll take it from there. Your free sample video is on its way.' },
  { from: 'us', video: 'cafe', text: 'Your sample is ready.' },
  { from: 'you', text: 'Love it. Let’s start the monthly plan.' },
];

export const PRICING = {
  lengths: [
    { id: '30', label: '30-second videos' },
    { id: '60', label: '60-second videos' },
  ],
  plans: [
    { id: 'first', title: 'First month', tag: 'Introductory price', price: { 30: 30, 60: 45 }, featured: true },
    { id: 'regular', title: 'From the second month', tag: 'Regular monthly price', price: { 30: 60, 60: 90 } },
  ],
  included: [
    '10 ready-to-post promo videos every month',
    'Made from your photos, website or social page',
    'Sized for Reels, Stories and posts, with a feed cover',
    'Original music and on-screen captions',
    'Planning, design and animation by our team',
  ],
  note: 'Prices are in US dollars, per month, for 10 videos. 60-second videos cost 50% more.',
};

export const FAQ = [
  { q: 'Is the sample video really free?', a: 'Yes. There’s no cost and no commitment. You see a sample for your own business before you decide anything.' },
  { q: 'What do you need from me?', a: 'Your business name, a link to your website or social page, and any photos you have. That’s all.' },
  { q: 'Do I need a website?', a: 'No. A social page or a few photos is enough.' },
  { q: 'Do I need to film anything?', a: 'No. We work with what you already have.' },
  { q: 'Do I need to learn any software?', a: 'No. Pixelayers is a service, not an app. Our team handles everything for you.' },
  { q: 'What happens after the sample?', a: 'If you like it, choose a plan and receive 10 ready-to-post videos every month.' },
];

export const COMPARE = {
  old: { title: 'Hiring per video', rows: ['Book a shoot or film it yourself', 'Brief and review every edit', 'Pay again for every new video'] },
  ours: { title: 'With a Pixelayers plan', rows: ['No filming: we use what you already have', 'One message, and we take it from there', '10 ready-to-post videos on one plan', 'Start with a free sample video'] },
};
