// All site copy and data in one place. Edit here; the components read from it.
const BASE = import.meta.env.BASE_URL;
export const media = (name) => `${BASE}media/${name}`;
export const still = (name) => `${BASE}media/stills/${name}.jpg`; // frames taken from the sample videos
export const asset = (name) => `${BASE}${name}`;

export const LINKS = {
  message: 'https://ig.me/m/pixelayers_com', // opens an Instagram chat with Pixelayers
  instagram: 'https://www.instagram.com/pixelayers_com/',
  handle: '@pixelayers_com',
};

export const NAV = [
  { href: '#why', label: 'Why video' },
  { href: '#how', label: 'How it works' },
  { href: '#samples', label: 'Samples' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

export const HERO = {
  badge: 'Free 30-second preview for your business',
  title: ['Promo videos', 'people', 'actually watch.'],
  sub: 'Most small businesses post shaky phone clips that get scrolled past. We turn your website into polished, animated promo videos for Reels, Stories and your feed.',
};

// "Why video": the scroll wipes from the left column to the right one.
export const BEFORE_AFTER = {
  before: { label: 'What most shops post', title: 'Shaky phone clips get scrolled past.', notes: ['Handheld and shaky', 'Dim, cluttered shots', 'No clear message'] },
  after: { label: 'What we make', title: 'Animated promos stop the scroll.', notes: ['Your logo and colors', 'Clear on-screen captions', 'Original music'] },
};

// "From your website": the pieces lifted off a site and placed into the video.
export const PIPELINE = {
  title: 'Your website already has everything we need.',
  sub: 'Your photos, logo and colors are all on your website. We take it from there, so there’s nothing to film and nothing to edit.',
  pieces: ['Your photos', 'Your logo', 'Your colors', 'Your message'],
  site: { name: 'Luma', full: 'Luma Hair Studio', url: 'lumahairstudio.com', headline: 'Colour, cut & care in the heart of town.' },
};

export const BUSINESS_TYPES = ['Cafés', 'Salons', 'Boutiques', 'Bakeries', 'Med spas', 'Gyms', 'Florists', 'Gift shops', 'Remodelers', 'Local services'];

// The free preview, in three steps (matches the Instagram carousel).
export const STEPS = [
  { title: 'Tap Send message', text: 'It opens a chat with us on Instagram.', tone: 'lilac' },
  { title: 'Share your website', text: 'We use your photos, logo and colors.', tone: 'peach' },
  { title: 'Get your free preview', text: 'A 30-second promo in the same chat, with our watermark.', tone: 'mint' },
];

export const KEEP_IT = {
  label: 'Like it? Keep it.',
  title: 'Love it? Get the full version.',
  text: 'Pick a plan in the chat and we send it without the watermark.',
};

// Concept samples: every business here is fictional.
export const SAMPLES = [
  { id: 'salon', name: 'Luma Hair Studio', kind: 'Salon', style: 'Photo-based', tone: 'peach' },
  { id: 'cafe', name: 'Ember & Oat Café', kind: 'Café', style: 'Animated', tone: 'butter' },
  { id: 'medspa', name: 'Alder Aesthetics', kind: 'Med spa', style: 'Photo-based', tone: 'mint' },
  { id: 'kitchen', name: 'Hearthline Kitchen & Bath', kind: 'Remodeling', style: 'Photo-based', tone: 'sky' },
  { id: 'giftshop', name: 'Sprucewick Gift Shop', kind: 'Gift shop', style: 'Animated', tone: 'lilac' },
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
    'Made from your website, photos and logo',
    'Sized for Reels, Stories and posts, with a feed cover',
    'Original music and on-screen captions',
    'Planning, design and animation by our team',
  ],
  note: 'Prices are in US dollars, per month, for 10 videos. 60-second videos cost 50% more.',
};

export const FAQ = [
  { q: 'Is the preview really free?', a: 'Yes. There’s no cost and no commitment. You see a 30-second promo for your own business before you decide anything.' },
  { q: 'What do you need from me?', a: 'Your business name and a link to your website. We use the photos, logo and colors that are already there.' },
  { q: 'Do I need a website?', a: 'No. A social page or a few photos is enough.' },
  { q: 'Do I need to film anything?', a: 'No. We work with what you already have.' },
  { q: 'Do I need to learn any software?', a: 'No. Pixelayers is a service, not an app. Our team handles everything for you.' },
  { q: 'What happens after the preview?', a: 'If you love it, pick a plan in the chat and we send the full version without the watermark. Your plan includes 10 ready-to-post videos every month.' },
];
