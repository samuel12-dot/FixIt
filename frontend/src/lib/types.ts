export type Category = {
  _id: string;
  slug: string;
  label: string;
  abbr: string;
  desc: string;
  longDesc: string;
  iconBg: string;
  iconColor: string;
  priceRange: string;
  response: string;
  duration: string;
  available: number;
};

export type PortfolioItem = { title: string; desc: string };
export type AvailabilitySlot = { time: string; disabled: boolean };
export type AvailabilityDay = { day: string; slots: AvailabilitySlot[] };

export type Artisan = {
  _id: string;
  name: string;
  category: string;
  area: string;
  distance: number;
  rating: number;
  reviewsCount: number;
  jobsCount: number;
  priceMin: number;
  priceMax: number;
  response: string;
  verifiedId: boolean;
  portfolio: PortfolioItem[];
  availability: AvailabilityDay[];
};

export type Review = {
  _id: string;
  customerName: string;
  stars: number;
  text: string;
  createdAt: string;
};

export type BookingStatus =
  | "pending"
  | "accepted"
  | "en_route"
  | "in_progress"
  | "completed"
  | "cancelled"
  | "disputed";

export type Booking = {
  _id: string;
  orderCode: string;
  customer: string;
  artisan: Artisan;
  category: string;
  issueDesc: string;
  urgency: "Standard" | "Same day" | "Emergency";
  slotLabel: string;
  address: string;
  phone: string;
  calloutFee: number;
  status: BookingStatus;
  paymentReleased: boolean;
  createdAt: string;
  releasedAt?: string;
};

export type ChatMessage = {
  _id: string;
  booking: string;
  from: "customer" | "artisan";
  text: string;
  createdAt: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "artisan" | "admin";
};

export type BlogPost = {
  _id: string;
  cat: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  read: string;
};

export type HelpArticle = {
  _id: string;
  cat: string;
  title: string;
  body: string;
  popular?: boolean;
};
