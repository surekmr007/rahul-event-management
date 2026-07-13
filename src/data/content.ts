import {
  Sparkles,
  Calendar,
  Users,
  Heart,
  Award,
  Clock,
  Search,
  Palette,
  CheckSquare,
  Mic2,
  PartyPopper,
  Camera,
} from 'lucide-react';

export const services = [
  {
    icon: Search,
    title: 'Concept & Ideation',
    description:
      'We begin with your story. Our creative team translates your vision into a cohesive concept, mood, and narrative that guides every decision.',
    duration: '2–3 weeks',
  },
  {
    icon: Palette,
    title: 'Design & Styling',
    description:
      'From palette to props, we craft immersive environments. Every surface, texture, and light is considered — no detail is too small.',
    duration: '3–4 weeks',
  },
  {
    icon: Users,
    title: 'Vendor Curation',
    description:
      'We partner with the finest florists, caterers, and technicians across the region. Your event is staffed by trusted specialists.',
    duration: 'Ongoing',
  },
  {
    icon: Calendar,
    title: 'Logistics & Planning',
    description:
      'Timelines, floor plans, permits, and contingencies. We manage the invisible scaffolding that makes the visible effortless.',
    duration: '8–12 weeks',
  },
  {
    icon: Mic2,
    title: 'Production & AV',
    description:
      'Sound, lighting, video, and stagecraft. Our production team delivers technical excellence that never overshadows the moment.',
    duration: 'Event day',
  },
  {
    icon: Camera,
    title: 'On-Site Direction',
    description:
      'On the day, we are the first to arrive and the last to leave. You enjoy your event while we orchestrate every beat behind the scenes.',
    duration: 'Event day',
  },
];

export const stats = [
  { value: 250, suffix: '+', label: 'Events Produced' },
  { value: 14, suffix: ' yrs', label: 'Of Experience' },
  { value: 98, suffix: '%', label: 'Client Referrals' },
  { value: 40, suffix: '+', label: 'Industry Awards' },
];

export const portfolio = [
  {
    title: 'Maison du Soir',
    category: 'Gala Dinner',
    location: 'Paris, France',
    image: 'https://images.pexels.com/photos/2606877/pexels-photo-2606877.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'A black-tie gala for 300 guests in a restored 18th-century ballroom.',
  },
  {
    title: 'Coastal Vows',
    category: 'Wedding',
    location: 'Amalfi, Italy',
    image: 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'An intimate cliffside ceremony with locally sourced florals.',
  },
  {
    title: 'Nordic Launch',
    category: 'Corporate',
    location: 'Copenhagen, Denmark',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Product launch for a Scandinavian design house, 500 attendees.',
  },
  {
    title: 'Garden of Lights',
    category: 'Private',
    location: 'Marrakech, Morocco',
    image: 'https://images.pexels.com/photos/1683809/pexels-photo-1683809.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'A 40th birthday celebration under lantern-lit olive trees.',
  },
  {
    title: 'The Atelier Awards',
    category: 'Award Ceremony',
    location: 'London, UK',
    image: 'https://images.pexels.com/photos/787961/pexels-photo-787961.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'Annual industry awards with 600 guests and live broadcast.',
  },
  {
    title: 'Vineyard Harvest',
    category: 'Corporate Retreat',
    location: 'Bordeaux, France',
    image: 'https://images.pexels.com/photos/1404126/pexels-photo-1404126.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: 'A three-day leadership retreat across working vineyards.',
  },
];

export const process = [
  {
    step: '01',
    title: 'Discovery',
    description:
      'We meet, listen, and learn. This is where we understand your goals, audience, and the feeling you want guests to carry home.',
    icon: Sparkles,
  },
  {
    step: '02',
    title: 'Concept',
    description:
      'Our designers present a creative direction — mood boards, palette, spatial flow, and a narrative arc for the evening.',
    icon: Palette,
  },
  {
    step: '03',
    title: 'Planning',
    description:
      'Budgets, timelines, vendor contracts, and floor plans are locked. You receive a living document that tracks every detail.',
    icon: CheckSquare,
  },
  {
    step: '04',
    title: 'Production',
    description:
      'Setup, rehearsals, and on-the-day direction. We run the show so you can be present with your guests, fully.',
    icon: PartyPopper,
  },
];

export const testimonials = [
  {
    quote:
      'They did not just plan our wedding — they understood it. Every guest told us it was the most beautiful event they had ever attended.',
    name: 'Eleanor & James Whitfield',
    role: 'Wedding, Tuscany',
    rating: 5,
  },
  {
    quote:
      'Our product launch had to feel like art, not a keynote. Atelier Lumière delivered something our guests are still talking about months later.',
    name: 'Marcus Voss',
    role: 'VP Brand, Nordic Studios',
    rating: 5,
  },
  {
    quote:
      'The attention to detail is unreal. They thought of things we did not know to think of. Worth every penny.',
    name: 'Priya Anand',
    role: 'Gala Chair, Foundation for Arts',
    rating: 5,
  },
];

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'process', label: 'Process' },
  { id: 'testimonials', label: 'Voices' },
  { id: 'contact', label: 'Enquire' },
];

export const featureIcons = [Award, Heart, Clock, Sparkles];
