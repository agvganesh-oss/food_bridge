export type FoodType = 'Vegetarian' | 'Non-Vegetarian';

export type DonationStatus = 
  | 'Available' 
  | 'Accepted' 
  | 'Pickup Scheduled' 
  | 'Collected' 
  | 'Distributed';

export type UserRole = 'donor' | 'ngo' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organization: string;
  phone: string;
  location?: string;
  joinedAt?: string;
  status?: 'Active' | 'Pending Verification';
}

export interface TrackingHistoryItem {
  status: DonationStatus;
  timestamp: string;
  actor: string;
  note?: string;
}

export interface Donation {
  id: string;
  foodName: string;
  quantity: string;
  servings: number;
  foodType: FoodType;
  description: string;
  location: string;
  availableUntil: string;
  contactName: string;
  contactPhone: string;
  donorOrg: string;
  donorEmail: string;
  acceptedByOrg?: string;
  acceptedAt?: string;
  status: DonationStatus;
  createdAt: string;
  trackingHistory: TrackingHistoryItem[];
}
