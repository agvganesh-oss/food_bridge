import { Donation, User } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'USR-001',
    name: 'Suresh Kumar',
    email: 'donor@foodbridge.org',
    role: 'donor',
    organization: 'Green Leaf Restaurant',
    phone: '+91 98765 43210',
    location: 'MVP Colony, Visakhapatnam',
    joinedAt: 'Aug 2026',
    status: 'Active'
  },
  {
    id: 'USR-002',
    name: 'Ramesh Varma',
    email: 'canteen@college.edu',
    role: 'donor',
    organization: 'Sai College Canteen & Mess',
    phone: '+91 98480 12345',
    location: 'Siripuram Junction, Visakhapatnam',
    joinedAt: 'Sep 2026',
    status: 'Active'
  },
  {
    id: 'USR-003',
    name: 'Anita Roy',
    email: 'heritage@bakers.in',
    role: 'donor',
    organization: 'Heritage Bakers & Cafe',
    phone: '+91 97000 55443',
    location: 'Gajuwaka Main Road, Visakhapatnam',
    joinedAt: 'Sep 2026',
    status: 'Active'
  },
  {
    id: 'USR-004',
    name: 'Priya Sharma',
    email: 'ngo@foodbridge.org',
    role: 'ngo',
    organization: 'Community Care Foundation',
    phone: '+91 91234 56789',
    location: 'Dwaraka Nagar, Visakhapatnam',
    joinedAt: 'Jul 2026',
    status: 'Active'
  },
  {
    id: 'USR-005',
    name: 'Arjun Das',
    email: 'hope@volunteers.org',
    role: 'ngo',
    organization: 'Hope & Meal Volunteers',
    phone: '+91 92345 67890',
    location: 'MVP Sector 6, Visakhapatnam',
    joinedAt: 'Aug 2026',
    status: 'Active'
  },
  {
    id: 'USR-006',
    name: 'Kavita Reddy',
    email: 'annapurna@trust.org',
    role: 'ngo',
    organization: 'Annapurna Youth Trust',
    phone: '+91 93456 78901',
    location: 'Beach Road Ward 14, Visakhapatnam',
    joinedAt: 'Sep 2026',
    status: 'Active'
  },
  {
    id: 'USR-007',
    name: 'Prof. R. V. Rao',
    email: 'admin@foodbridge.org',
    role: 'admin',
    organization: 'B.Tech CSE DPTL Project Cell',
    phone: '+91 90000 11223',
    location: 'Campus Engineering Block',
    joinedAt: 'Jun 2026',
    status: 'Active'
  }
];

export const INITIAL_DONATIONS: Donation[] = [
  {
    id: 'FB-001',
    foodName: '50 Meal Packets (Veg Pulao & Curd)',
    quantity: '50 packed boxes',
    servings: 50,
    foodType: 'Vegetarian',
    description: 'Freshly prepared vegetarian meal packets with vegetable pulao, dal tadka, and chilled curd cups. Packed hygienically in food-grade boxes.',
    location: 'MVP Colony, Sector 3, Visakhapatnam',
    availableUntil: '8:00 PM Today',
    contactName: 'Suresh Kumar',
    contactPhone: '+91 98765 43210',
    donorOrg: 'Green Leaf Restaurant',
    donorEmail: 'donor@foodbridge.org',
    status: 'Available',
    createdAt: 'Today, 2:30 PM',
    trackingHistory: [
      {
        status: 'Available',
        timestamp: 'Today, 2:30 PM',
        actor: 'Green Leaf Restaurant',
        note: 'Surplus lunch boxes listed for immediate pickup.'
      }
    ]
  },
  {
    id: 'FB-002',
    foodName: 'Surplus Chapati & Mixed Vegetable Curry',
    quantity: '120 pieces chapati + 15 kg sabzi',
    servings: 60,
    foodType: 'Vegetarian',
    description: 'Hot wheat chapatis wrapped in silver foil along with fresh mixed vegetable curry prepared for an afternoon college seminar.',
    location: 'Siripuram Junction, Near Campus Gate',
    availableUntil: '9:30 PM Today',
    contactName: 'Ramesh Varma',
    contactPhone: '+91 98480 12345',
    donorOrg: 'Sai College Canteen & Mess',
    donorEmail: 'canteen@college.edu',
    status: 'Accepted',
    acceptedByOrg: 'Community Care Foundation',
    acceptedAt: 'Today, 3:15 PM',
    createdAt: 'Today, 1:45 PM',
    trackingHistory: [
      {
        status: 'Available',
        timestamp: 'Today, 1:45 PM',
        actor: 'Sai College Canteen',
        note: 'Seminar surplus food posted.'
      },
      {
        status: 'Accepted',
        timestamp: 'Today, 3:15 PM',
        actor: 'Community Care Foundation',
        note: 'Accepted by Priya Sharma for distribution at Anand Shelter.'
      }
    ]
  },
  {
    id: 'FB-003',
    foodName: 'Assorted Sandwich Trays & Fruit Bowls',
    quantity: '35 snack boxes',
    servings: 35,
    foodType: 'Vegetarian',
    description: 'Unopened club veg sandwiches and sliced melon fruit boxes stored under refrigeration at 4°C.',
    location: 'Gajuwaka Main Road, City Plaza',
    availableUntil: '10:00 PM Today',
    contactName: 'Anita Roy',
    contactPhone: '+91 97000 55443',
    donorOrg: 'Heritage Bakers & Cafe',
    donorEmail: 'heritage@bakers.in',
    status: 'Pickup Scheduled',
    acceptedByOrg: 'Hope & Meal Volunteers',
    acceptedAt: 'Today, 12:00 PM',
    createdAt: 'Today, 11:15 AM',
    trackingHistory: [
      {
        status: 'Available',
        timestamp: 'Today, 11:15 AM',
        actor: 'Heritage Bakers',
        note: 'End-of-shift fresh bakery inventory.'
      },
      {
        status: 'Accepted',
        timestamp: 'Today, 12:00 PM',
        actor: 'Hope & Meal Volunteers',
        note: 'Accepted by Volunteer Team Alpha.'
      },
      {
        status: 'Pickup Scheduled',
        timestamp: 'Today, 1:30 PM',
        actor: 'Hope & Meal Volunteers',
        note: 'Pickup scheduled with e-auto van at 4:30 PM.'
      }
    ]
  },
  {
    id: 'FB-004',
    foodName: 'Steamed Rice, Sambar & Boiled Eggs',
    quantity: '25 kg cooked food in 3 vessels',
    servings: 80,
    foodType: 'Non-Vegetarian',
    description: 'High-protein lunch buffet surplus with warm steamed rice, piping hot sambar, and boiled eggs.',
    location: 'Beach Road, Novotel Circle',
    availableUntil: '7:30 PM Today',
    contactName: 'Chef Mohan',
    contactPhone: '+91 99887 66554',
    donorOrg: 'Silver Oak Banquet Hall',
    donorEmail: 'silveroak@events.com',
    status: 'Distributed',
    acceptedByOrg: 'Annapurna Youth Trust',
    acceptedAt: 'Today, 10:00 AM',
    createdAt: 'Today, 9:00 AM',
    trackingHistory: [
      {
        status: 'Available',
        timestamp: 'Today, 9:00 AM',
        actor: 'Silver Oak Banquet Hall',
        note: 'Morning corporate seminar surplus.'
      },
      {
        status: 'Accepted',
        timestamp: 'Today, 10:00 AM',
        actor: 'Annapurna Youth Trust',
        note: 'Assigned to Ward 14 relief team.'
      },
      {
        status: 'Pickup Scheduled',
        timestamp: 'Today, 10:30 AM',
        actor: 'Annapurna Youth Trust',
        note: 'Dispatching insulated collection container.'
      },
      {
        status: 'Collected',
        timestamp: 'Today, 11:15 AM',
        actor: 'Annapurna Youth Trust',
        note: 'Food collected and temperature verified (62°C).'
      },
      {
        status: 'Distributed',
        timestamp: 'Today, 1:00 PM',
        actor: 'Annapurna Youth Trust',
        note: '80 warm meals served to daily-wage workers at Port construction colony.'
      }
    ]
  }
];
