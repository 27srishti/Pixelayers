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
  { href: '#how', label: 'How it works' },
  { href: '#send', label: 'What to send' },
  { href: '#samples', label: 'Samples' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
];

export const HERO = {
  badge: 'Free 30-second preview for your business',
  title: ['Promo videos', 'people', 'actually watch.'],
  sub: 'Most small businesses post shaky phone clips that get scrolled past. Send us a link, a few photos or some clips, and we turn them into polished, animated promo videos.',
};

// "Send us whatever you have": the inputs fly into one video, which then reshapes into each format.
export const PIPELINE = {
  title: 'Send us whatever you have.',
  sub: 'A website, an Instagram or Facebook page, a few photos or some phone clips. Any one of them is enough. Nothing to film, nothing to edit.',
  sources: [
    { id: 'web', label: 'Website', detail: 'lumahairstudio.com' },
    { id: 'insta', label: 'Instagram', detail: '@lumahairstudio' },
    { id: 'fb', label: 'Facebook page', detail: 'Luma Hair Studio' },
    { id: 'photos', label: 'Photos', detail: 'From your camera roll' },
    { id: 'clips', label: 'Phone clips', detail: 'Even shaky ones' },
  ],
  formats: [
    { id: '9:16', w: 9, h: 16, label: 'Reels, Stories, TikTok' },
    { id: '1:1', w: 1, h: 1, label: 'Feed posts' },
    { id: '16:9', w: 16, h: 9, label: 'YouTube & your website' },
  ],
  site: { url: 'lumahairstudio.com' },
};

export const BUSINESS_TYPES = ['Cafés', 'Salons', 'Boutiques', 'Bakeries', 'Med spas', 'Gyms', 'Florists', 'Gift shops', 'Remodelers', 'Local services'];

// The free preview, in three steps (matches the Instagram carousel).
export const STEPS = [
  { title: 'Tap Send message', text: 'It opens a chat with us on Instagram.', tone: 'lilac' },
  { title: 'Share what you have', text: 'A website, a social page, photos or clips. Whatever you have.', tone: 'peach' },
  { title: 'Get your free preview', text: 'A 30-second promo in the same chat, with our watermark.', tone: 'mint' },
  { title: 'Love it? Keep it.', text: 'Pick a plan in the chat and we send the full version, without the watermark.', tone: 'sky' },
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
    'Made from your links, photos or clips',
    'Vertical, square or wide, sized for wherever you post',
    'Original music and on-screen captions',
    'Planning, design and animation by our team',
  ],
  note: 'Prices are in US dollars, per month, for 10 videos. 60-second videos cost 50% more.',
};

export const FAQ = [
  { q: 'Is the preview really free?', a: 'Yes. There’s no cost and no commitment. You see a 30-second promo for your own business before you decide anything.' },
  { q: 'What do you need from me?', a: 'Your business name and whatever you have: a website, an Instagram or Facebook page, some photos or short phone clips.' },
  { q: 'Do I need a website?', a: 'No. A social page, a few photos or some phone clips are enough.' },
  { q: 'Are the videos only vertical?', a: 'No. We make vertical videos for Reels, Stories and TikTok, square ones for feed posts, and wide ones for YouTube or your website.' },
  { q: 'Do I need to film anything?', a: 'No. We work with what you already have.' },
  { q: 'Do I need to learn any software?', a: 'No. Pixelayers is a service, not an app. Our team handles everything for you.' },
  { q: 'What happens after the preview?', a: 'If you love it, pick a plan in the chat and we send the full version without the watermark. Your plan includes 10 ready-to-post videos every month.' },
];
