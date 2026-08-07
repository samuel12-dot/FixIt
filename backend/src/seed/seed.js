import 'dotenv/config';
import { connectDB } from '../db.js';
import mongoose from 'mongoose';
import Category from '../models/Category.js';
import Artisan from '../models/Artisan.js';
import Review from '../models/Review.js';
import BlogPost from '../models/BlogPost.js';
import HelpArticle from '../models/HelpArticle.js';

const CATEGORY_DEFS = [
  { slug: 'electrician', label: 'Electrician', abbr: 'E', desc: 'Wiring, sockets, lighting', iconBg: 'oklch(96% 0.05 75)', iconColor: 'oklch(55% 0.14 70)', priceRange: '₦4,500 – ₦15,000', response: '~30 min', duration: '1–3 hrs', available: 212, longDesc: "From tripping breakers to full rewiring — certified electricians for safe, reliable power at home or work." },
  { slug: 'plumber', label: 'Plumber', abbr: 'P', desc: 'Pipes, leaks, installs', iconBg: 'oklch(95% 0.04 230)', iconColor: 'oklch(52% 0.14 240)', priceRange: '₦4,000 – ₦12,000', response: '~45 min', duration: '1–2 hrs', available: 168, longDesc: 'Leaks, blockages, installations and repairs. Fast, clean plumbing work with no mess left behind.' },
  { slug: 'ac', label: 'AC Technician', abbr: 'AC', desc: 'Install, service, gas refill', iconBg: 'oklch(95% 0.04 200)', iconColor: 'oklch(52% 0.12 210)', priceRange: '₦8,000 – ₦25,000', response: '~1 hr', duration: '1–3 hrs', available: 96, longDesc: 'Installation, servicing, gas refills and repairs for split units and central AC — stay cool all year.' },
  { slug: 'generator', label: 'Generator Repair', abbr: 'G', desc: 'Repairs, servicing, install', iconBg: 'oklch(95% 0.045 158)', iconColor: 'oklch(40% 0.12 158)', priceRange: '₦6,000 – ₦20,000', response: '~1.5 hr', duration: '2–4 hrs', available: 74, longDesc: 'Keep the lights on. Servicing, fault diagnosis and repairs for all common generator brands in Lagos.' },
  { slug: 'carpenter', label: 'Carpenter', abbr: 'C', desc: 'Furniture, doors, fittings', iconBg: 'oklch(95% 0.04 40)', iconColor: 'oklch(52% 0.13 35)', priceRange: '₦7,000 – ₦22,000', response: '~1 hr', duration: '2–6 hrs', available: 120, longDesc: 'Custom furniture, fittings, door and lock repairs — skilled woodwork finished to a high standard.' },
  { slug: 'painter', label: 'Painter', abbr: 'Pt', desc: 'Interior & exterior', iconBg: 'oklch(95% 0.04 155)', iconColor: 'oklch(48% 0.12 155)', priceRange: '₦15,000 – ₦45,000', response: '~3 hr', duration: '1–3 days', available: 58, longDesc: 'Interior and exterior painting with clean lines and quality finishes for homes and offices.' },
];

const RAW_ARTISANS = [
  { name: 'Tunde Adeyemi', category: 'electrician', area: 'Lekki', distance: 2.1, rating: 4.9, reviewsCount: 132, jobsCount: 210, priceMin: 5000, priceMax: 15000, response: '30 min', verifiedId: true },
  { name: 'Blessing Okafor', category: 'plumber', area: 'Yaba', distance: 3.4, rating: 4.8, reviewsCount: 98, jobsCount: 156, priceMin: 4000, priceMax: 12000, response: '45 min', verifiedId: true },
  { name: 'Musa Ibrahim', category: 'ac', area: 'Ikeja', distance: 5.0, rating: 4.7, reviewsCount: 74, jobsCount: 120, priceMin: 8000, priceMax: 25000, response: '1 hr', verifiedId: true },
  { name: 'Chidi Nwosu', category: 'generator', area: 'Surulere', distance: 4.2, rating: 4.6, reviewsCount: 61, jobsCount: 95, priceMin: 6000, priceMax: 20000, response: '1.5 hr', verifiedId: true },
  { name: 'Femi Ogundele', category: 'electrician', area: 'Ajah', distance: 6.8, rating: 4.5, reviewsCount: 45, jobsCount: 70, priceMin: 4500, priceMax: 13000, response: '2 hr', verifiedId: false },
  { name: 'Kemi Balogun', category: 'carpenter', area: 'Ikoyi', distance: 3.9, rating: 4.9, reviewsCount: 88, jobsCount: 140, priceMin: 7000, priceMax: 22000, response: '1 hr', verifiedId: true },
  { name: 'Ade Salako', category: 'painter', area: 'Gbagada', distance: 4.6, rating: 4.4, reviewsCount: 39, jobsCount: 60, priceMin: 15000, priceMax: 45000, response: '3 hr', verifiedId: true },
  { name: 'Ngozi Eze', category: 'plumber', area: 'Victoria Island', distance: 1.8, rating: 4.9, reviewsCount: 110, jobsCount: 180, priceMin: 5000, priceMax: 14000, response: '30 min', verifiedId: true },
];

const CAT_NOUN = { electrician: 'wiring', plumber: 'pipework', ac: 'AC unit', generator: 'generator', carpenter: 'furniture', painter: 'painting' };

function buildArtisan(a) {
  const t = CAT_NOUN[a.category] || 'job';
  return {
    ...a,
    portfolio: [
      { title: `Full ${t} rewire`, desc: `Completed in ${a.area}, 2 days.` },
      { title: `Emergency ${t} repair`, desc: 'Same-day fix, no return visits.' },
      { title: 'New installation', desc: `Fresh ${t} setup, 3-bed flat.` },
    ],
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => ({
      day,
      slots: [
        { time: '9:00 AM', disabled: i % 3 === 0 },
        { time: '2:00 PM', disabled: i % 4 === 1 },
      ],
    })),
  };
}

const REVIEW_TEMPLATES = [
  { name: 'Amaka O.', stars: 5, text: 'Showed up on time and fixed the issue fast. Very professional.' },
  { name: 'David T.', stars: 5, text: 'Clear about pricing from the start, no surprises after.' },
  { name: 'Funmi A.', stars: 4, text: 'Good work, arrived a little late but communicated well.' },
];

const BLOG_POSTS = [
  { cat: 'Home Guides', title: '5 signs your generator needs servicing before it fails', excerpt: 'Strange noises, black smoke, hard starts — spot the warning signs early and avoid being left in the dark.', date: 'Mar 12, 2026', read: '4 min', content: 'Strange noises, black smoke, hard starts — spot the warning signs early and avoid being left in the dark. Regular servicing every 200 hours of use keeps your generator reliable when you need it most.' },
  { cat: 'Trust & Safety', title: 'How FixIt verifies every artisan on the platform', excerpt: 'A look behind the green badge: ID checks, skill certification and the ongoing review process.', date: 'Mar 6, 2026', read: '5 min', content: 'A look behind the green badge: ID checks, skill certification and the ongoing review process every artisan goes through before they can accept a job on FixIt.' },
  { cat: 'Money', title: 'What a fair price for AC servicing looks like in Lagos', excerpt: 'We broke down thousands of jobs to show you honest price ranges by area and unit type.', date: 'Feb 27, 2026', read: '6 min', content: 'We broke down thousands of jobs to show you honest price ranges by area and unit type, so you know what to expect before you book.' },
  { cat: 'Home Guides', title: 'Prevent the most common household plumbing leaks', excerpt: 'Simple checks that save you from a flooded kitchen and an emergency call-out.', date: 'Feb 18, 2026', read: '3 min', content: 'Simple checks that save you from a flooded kitchen and an emergency call-out — inspect joints, hoses and valves every few months.' },
  { cat: 'For Artisans', title: 'How top-rated artisans grow their business on FixIt', excerpt: 'Real habits from artisans earning the most: fast replies, clear quotes, great photos.', date: 'Feb 9, 2026', read: '5 min', content: 'Real habits from artisans earning the most: fast replies, clear quotes, great photos, and always confirming price before starting work.' },
  { cat: 'Money', title: 'Escrow, explained simply for first-time customers', excerpt: 'Why holding payment until the job is done protects both you and the artisan.', date: 'Jan 30, 2026', read: '4 min', content: 'Why holding payment until the job is done protects both you and the artisan — and how to release funds once you are satisfied.' },
];

const HELP_ARTICLES = [
  { cat: 'payments', title: 'How does escrow protect my payment?', body: 'When you book, your payment is held securely by FixIt and only released to the artisan once you confirm the job is complete.', popular: true },
  { cat: 'payments', title: 'When is the artisan actually paid?', body: 'The artisan is paid the moment you tap "Confirm complete & release payment" on your order tracking screen.' },
  { cat: 'payments', title: 'What payment methods can I use?', body: 'You can pay by card, bank transfer, or USSD at checkout. All methods are held in escrow the same way.', popular: true },
  { cat: 'verification', title: 'What does the green verified badge mean?', body: 'It means the artisan’s government ID and trade certification have been checked by our trust & safety team.', popular: true },
  { cat: 'verification', title: 'How do you check an artisan’s ID?', body: 'We verify government-issued ID and, where applicable, trade certifications before an artisan can accept jobs.' },
  { cat: 'bookings', title: 'How do I reschedule or cancel a booking?', body: 'Open your order from the tracking screen and choose reschedule or cancel. Cancelling before the artisan is en route is free.', popular: true },
  { cat: 'bookings', title: 'What happens after I book an artisan?', body: 'The artisan is notified immediately, confirms the job, and you can track their status and chat in real time.' },
  { cat: 'disputes', title: 'A job went wrong — how do I open a dispute?', body: 'Do not release payment. Open a dispute from the order screen and our support team will step in to mediate.' },
  { cat: 'disputes', title: 'How long do refunds take?', body: 'Approved refunds are typically processed back to your original payment method within 3-5 business days.' },
  { cat: 'getting-started', title: 'How do I find the right artisan for my job?', body: 'Use the search bar on the homepage, describe the job and your area, then compare verified artisans by price and rating.', popular: true },
  { cat: 'getting-started', title: 'Creating your FixIt account', body: 'Sign up with your name, email, phone number and a password — it takes less than a minute.' },
  { cat: 'artisans', title: 'How and when do I get paid as an artisan?', body: 'Funds are released to your account instantly once the customer confirms the job is complete.' },
];

async function seed() {
  await connectDB();

  await Promise.all([
    Category.deleteMany({}),
    Artisan.deleteMany({}),
    Review.deleteMany({}),
    BlogPost.deleteMany({}),
    HelpArticle.deleteMany({}),
  ]);

  await Category.insertMany(CATEGORY_DEFS);
  const artisans = await Artisan.insertMany(RAW_ARTISANS.map(buildArtisan));

  const reviewDocs = [];
  for (const artisan of artisans) {
    for (const r of REVIEW_TEMPLATES) {
      reviewDocs.push({
        booking: new mongoose.Types.ObjectId(),
        artisan: artisan._id,
        customer: new mongoose.Types.ObjectId(),
        customerName: r.name,
        stars: r.stars,
        text: r.text,
      });
    }
  }
  await Review.insertMany(reviewDocs);

  await BlogPost.insertMany(BLOG_POSTS);
  await HelpArticle.insertMany(HELP_ARTICLES);

  console.log(`Seeded ${CATEGORY_DEFS.length} categories, ${artisans.length} artisans, ${reviewDocs.length} reviews, ${BLOG_POSTS.length} blog posts, ${HELP_ARTICLES.length} help articles.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
