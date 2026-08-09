export const CATEGORY_LIST = [
  { slug: "electrician", label: "Electrician" },
  { slug: "plumber", label: "Plumber" },
  { slug: "ac", label: "AC Technician" },
  { slug: "generator", label: "Generator Repair" },
  { slug: "carpenter", label: "Carpenter" },
  { slug: "painter", label: "Painter" },
] as const;

export const LAGOS_AREAS = ["Lekki", "Ikeja", "Yaba", "Surulere", "Victoria Island", "Ajah"];

export const CALC_BASE: Record<string, [number, number]> = {
  electrician: [4500, 15000],
  plumber: [4000, 12000],
  ac: [8000, 25000],
  generator: [6000, 20000],
  carpenter: [7000, 22000],
  painter: [15000, 45000],
};

export const URGENCY_OPTIONS = ["Standard", "Same day", "Emergency"] as const;
export const URGENCY_MULT: Record<string, number> = { Standard: 1, "Same day": 1.25, Emergency: 1.6 };

export const FAQS = [
  {
    q: "Is my payment safe?",
    a: "Yes. When you book, your payment is held in escrow by FixIt — the artisan is only paid once you confirm the job is complete. If something goes wrong, your money stays protected.",
  },
  {
    q: "How are artisans verified?",
    a: "Every artisan submits a government-issued ID and proof of skill or training, which our team reviews before they can accept jobs. Verified artisans carry a blue badge on their profile.",
  },
  {
    q: "Can I cancel a booking?",
    a: "You can cancel free of charge any time before the artisan is en route. After that, a small call-out fee may apply to cover the time they set aside for you.",
  },
  {
    q: "What happens if a job goes wrong?",
    a: "Do not release the payment. Open a dispute from the order screen and our support team steps in to mediate — with your funds still safely held in escrow until it is resolved.",
  },
];

type HowItWorksStep = { num: string; title: string; text: string; image?: string; imagePosition?: string };

export const HIW_CUSTOMER: HowItWorksStep[] = [
  { num: "1", title: "Search for what you need", text: "Enter the problem and your area. Browse verified artisans matched to your job, with prices and ratings shown upfront.", image: "/images/search-screen.png" },
  { num: "2", title: "Compare and book", text: "Check portfolios, reviews and response times. Book the artisan you trust and choose a time that works.", image: "/images/profile-screen.png" },
  { num: "3", title: "Pay into escrow", text: "Your payment is held safely by FixIt. The artisan sees it is secured and arrives to do the work.", image: "/images/booking-screen.png" },
  { num: "4", title: "Confirm and release", text: "Track progress and chat in-app. When the job is done to your satisfaction, release the payment with one tap.", image: "/images/tracking-screen.png", imagePosition: "center 12%" },
];

export const HIW_ARTISAN: HowItWorksStep[] = [
  { num: "1", title: "Apply and get verified", text: "Submit your ID and trade certification. Once approved, your verified profile goes live to thousands of customers.", image: "/images/apply-screen.png" },
  { num: "2", title: "Receive job requests", text: "Get matched with nearby customers who need your skills. Review the details and accept the jobs you want.", image: "/images/requests-screen.png" },
  { num: "3", title: "Do great work", text: "The payment is already secured in escrow before you start — so you can focus entirely on the job.", image: "/images/job-screen.png" },
  { num: "4", title: "Get paid instantly", text: "Once the customer confirms, funds are released straight to you. Build ratings that win you even more work.", image: "/images/payout-screen.png" },
];

export const TEAM = [
  { name: "Chidera Obi", role: "Co-founder & CEO", image: "/images/founder-1.png" },
  { name: "Yusuf Bello", role: "Co-founder & CTO", image: "/images/founder-2.png" },
  { name: "Amara Nnaji", role: "Head of Trust & Safety", image: "/images/founder-3.png" },
  { name: "Tobi Adewale", role: "Head of Artisan Growth", image: "/images/founder-4.png" },
];

export const MILESTONES = [
  { year: "2023", title: "The idea is born", text: "After one too many bad repair experiences, the founders sketch out a trust-first artisan platform for Lagos." },
  { year: "2024", title: "FixIt launches in Lekki", text: "The first 120 verified artisans go live. Escrow payments protect every job from day one." },
  { year: "2025", title: "Across the city", text: "Coverage expands to six Lagos zones. The community passes 10,000 completed jobs." },
  { year: "2026", title: "2,400+ artisans strong", text: "FixIt becomes the trusted way Lagos residents find and pay skilled artisans." },
];

export const TESTIMONIALS = [
  { stars: 5, text: "My generator died the night before an event. Booked at 8am, fixed by noon — and I only paid once it was actually running.", name: "Adaeze M.", area: "Surulere" },
  { stars: 5, text: "No more haggling or being overcharged. The price range was clear upfront and the escrow gave me real peace of mind.", name: "Olumide K.", area: "Lekki" },
  { stars: 4, text: "The verification badge is why I trusted it. Saw his ID was checked, past jobs, real reviews — then booked with confidence.", name: "Fatima B.", area: "Ikeja" },
];

export const SERVICE_SUGGESTIONS = [
  "AC repair",
  "AC installation",
  "AC gas refill",
  "Generator servicing",
  "Generator repair",
  "Plumbing repair",
  "Pipe leak fix",
  "Blocked drain",
  "Electrical wiring",
  "Socket & switch repair",
  "Ceiling fan installation",
  "Water heater repair",
  "Carpentry & furniture",
  "Door & lock repair",
  "Interior painting",
  "Inverter installation",
];
