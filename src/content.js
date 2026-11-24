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

// Credit-based plans. 1 credit = 1 second of standard video.
export const PRICING = {
  intro: 'Designed promo videos and image posts, built from your own website, photos and reviews.',
  plans: [
    {
      id: 'starter', name: 'Starter', price: 30, priceNote: 'first month', then: 59, credits: 450,
      makes: [
        { label: 'Standard video', value: '7 min 30 s', share: 1 },
        { label: 'AI presenter', value: '1 min 52 s', share: 0.25 },
        { label: 'AI cinematic footage', value: '1 min 52 s', share: 0.25 },
        { label: 'Image posts', value: '90 posts', share: 1, dashed: true },
      ],
      perks: ['Up to 90 s per video', '9:16 or 16:9', '5 revision rounds', 'Cancel anytime'],
    },
    {
      id: 'growth', name: 'Growth', price: 99, badge: 'Best value', credits: 900, featured: true,
      makes: [
        { label: 'Standard video', value: '15 min', share: 1 },
        { label: 'AI presenter', value: '3 min 45 s', share: 0.25 },
        { label: 'AI cinematic footage', value: '3 min 45 s', share: 0.25 },
        { label: 'Image posts', value: '180 posts', share: 1, dashed: true },
      ],
      perks: ['Everything in Starter', 'Both 9:16 and 16:9', 'Priority queue', '1-month rollover'],
    },
  ],
  topUp: { credits: 250, price: 35, text: 'Add any month, on either plan.', strong: 'Never expires.', note: 'Up to 4 min 10 s of standard video.' },
  everyPlan: [
    { title: 'Video and post ideas', text: 'Fresh ideas for you every month' },
    { title: 'Content planning', text: 'A monthly plan for your socials' },
    { title: 'Social integration', text: 'Connect and post automatically' },
    { title: 'Your face and voice', text: 'Cloned for your AI presenter' },
    { title: 'Your material', text: 'Built from your photos and reviews' },
    { title: 'Voice and motion', text: 'Voiceover, music, motion graphics' },
  ],
  rates: [
    { n: 1, unit: 'sec', title: 'Standard video', text: 'Motion graphics, voiceover and music' },
    { n: 4, unit: 'sec', title: 'AI presenter', text: 'Your cloned face and voice, or a stock presenter' },
    { n: 4, unit: 'sec', title: 'AI cinematic footage', text: 'Generated scenes of your work' },
    { n: 5, unit: 'post', title: 'Image post', text: 'A designed post for your feed' },
  ],
  // bars are drawn in seconds (light = standard, dark = AI); the number is credits
  costs: [
    { label: 'Image post', std: 3, ai: 0, credits: 5 },
    { label: '30 s Reel', std: 30, ai: 0, credits: 30 },
    { label: '60 s brand film', std: 60, ai: 0, credits: 60 },
    { label: '30 s Reel, 15 s presenter', std: 15, ai: 15, credits: 75 },
    { label: '30 s Reel, 12 s AI footage', std: 18, ai: 12, credits: 66 },
  ],
  goodToKnow: [
    { title: 'Revisions', text: 'Five rounds per video, free.' },
    { title: 'Unused credits', text: 'Starter resets monthly. Growth rolls over one month.' },
    { title: 'Top-ups', text: '250 credits for $35. They never expire.' },
    { title: 'Change or cancel', text: 'Anytime, from your next billing month.' },
  ],
};

export const FAQ = [
  { q: 'Is the preview really free?', a: 'Yes. There’s no cost and no commitment. You see a 30-second promo for your own business before you decide anything.' },
  { q: 'What do you need from me?', a: 'Your business name and whatever you have: a website, an Instagram or Facebook page, some photos or short phone clips.' },
  { q: 'Do I need a website?', a: 'No. A social page, a few photos or some phone clips are enough.' },
  { q: 'Are the videos only vertical?', a: 'No. We make vertical 9:16 videos for Reels, Stories and TikTok, and wide 16:9 ones for YouTube or your website. Starter includes one format, Growth includes both. Plans also include designed image posts for your feed.' },
  { q: 'How do credits work?', a: 'One credit is one second of standard video. AI presenter and AI cinematic footage use 4 credits a second, and an image post uses 5. You can mix them in one video; only the AI seconds count at the higher rate.' },
  { q: 'Do I need to film anything?', a: 'No. We work with what you already have.' },
  { q: 'Do I need to learn any software?', a: 'No. Pixelayers is a service, not an app. Our team handles everything for you.' },
  { q: 'What happens after the preview?', a: 'If you love it, pick a plan in the chat and we send the full version without the watermark. Plans start at $30 for your first month.' },
];
