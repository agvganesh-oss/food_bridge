import React from 'react';
import { useApp } from '../context/AppContext';
import { DonationStatus } from '../types';
import { TrackingTimeline } from './TrackingTimeline';
import { 
  X, 
  MapPin, 
  Clock, 
  Users, 
  Utensils, 
  Phone, 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const DonationDetailsModal: React.FC = () => {
  const { 
    selectedDonationId, 
    closeDonationDetails, 
    donations, 
    acceptDonation, 
    updateStatus, 
    currentUser,
    navigateTo 
  } = useApp();

  if (!selectedDonationId) return null;

  const donation = donations.find((d) => d.id === selectedDonationId);
  if (!donation) return null;

  const handleAccept = () => {
    acceptDonation(donation.id);
  };

  const getNextStatus = (current: DonationStatus): DonationStatus | null => {
    switch (current) {
      case 'Available':
        return 'Accepted';
      case 'Accepted':
        return 'Pickup Scheduled';
      case 'Pickup Scheduled':
        return 'Collected';
      case 'Collected':
        return 'Distributed';
      default:
        return null;
    }
  };

  const nextStatus = getNextStatus(donation.status);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#fcfbf9] border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold px-2.5 py-1 bg-stone-200 text-stone-800 rounded-md">
              {donation.id}
            </span>
            <span className="text-xs text-stone-500">
              {donation.foodType} · {donation.servings} Servings
            </span>
          </div>

          <button
            onClick={closeDonationDetails}
            className="text-stone-400 hover:text-stone-700 p-1.5 rounded-lg hover:bg-stone-100 transition-colors"
            aria-label="Close details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Main Title & Status bar */}
          <div>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h2 className="text-xl font-bold text-stone-900 leading-snug">
                {donation.foodName}
              </h2>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${
                  donation.status === 'Available'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : donation.status === 'Distributed'
                    ? 'bg-stone-100 text-stone-700 border-stone-300'
                    : 'bg-amber-50 text-amber-800 border-amber-300'
                }`}
              >
                Status: {donation.status}
              </span>
            </div>

            {donation.description && (
              <p className="text-sm text-stone-600 mt-2 leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-100">
                {donation.description}
              </p>
            )}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1">
              <div className="flex items-center gap-1.5 text-stone-500 font-medium">
                <Utensils className="w-4 h-4 text-[#14532d]" />
                <span>Quantity & Servings</span>
              </div>
              <p className="font-semibold text-stone-800 text-sm">{donation.quantity}</p>
              <p className="text-stone-500">{donation.servings} people can be fed</p>
            </div>

            <div className="p-3 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1">
              <div className="flex items-center gap-1.5 text-stone-500 font-medium">
                <Clock className="w-4 h-4 text-orange-600" />
                <span>Availability Window</span>
              </div>
              <p className="font-semibold text-stone-800 text-sm">{donation.availableUntil}</p>
              <p className="text-stone-500">Posted: {donation.createdAt}</p>
            </div>

            <div className="p-3 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1">
              <div className="flex items-center gap-1.5 text-stone-500 font-medium">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>Pickup Location</span>
              </div>
              <p className="font-semibold text-stone-800 text-sm">{donation.location}</p>
              <p className="text-stone-500">Coordinate directly before dispatch</p>
            </div>

            <div className="p-3 rounded-xl border border-stone-200 bg-stone-50/50 space-y-1">
              <div className="flex items-center gap-1.5 text-stone-500 font-medium">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>Donor Contact</span>
              </div>
              <p className="font-semibold text-stone-800 text-sm">{donation.donorOrg}</p>
              <p className="text-stone-600">
                {donation.contactName} · {donation.contactPhone}
              </p>
            </div>
          </div>

          {donation.acceptedByOrg && (
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <div>
                  <span className="font-semibold text-emerald-900">Claimed by NGO / Volunteer: </span>
                  <span className="text-emerald-800">{donation.acceptedByOrg}</span>
                  {donation.acceptedAt && <span className="text-emerald-700"> ({donation.acceptedAt})</span>}
                </div>
              </div>
            </div>
          )}

          {/* Tracking Timeline */}
          <div className="border-t border-stone-200 pt-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-stone-900">Donation Lifecycle Progress</h3>
              <button
                onClick={() => {
                  closeDonationDetails();
                  navigateTo('track', donation.id);
                }}
                className="text-xs text-[#14532d] hover:underline font-medium"
              >
                Full Tracking Page →
              </button>
            </div>
            <div className="bg-[#fcfbf9] p-4 rounded-xl border border-stone-200">
              <TrackingTimeline currentStatus={donation.status} history={donation.trackingHistory} />
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-[#fcfbf9] border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-stone-500">
            Current user: <span className="font-semibold text-stone-700 capitalize">{currentUser?.role || 'User'}</span>
          </div>

          <div className="flex items-center gap-2">
            {donation.status === 'Available' ? (
              <button
                onClick={handleAccept}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#14532d] hover:bg-[#166534] rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                Accept Donation
              </button>
            ) : nextStatus ? (
              <button
                onClick={() => updateStatus(donation.id, nextStatus)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#ea580c] hover:bg-[#c2410c] rounded-lg transition-colors shadow-sm flex items-center gap-1"
                title="Advance progress for demonstration"
              >
                <span>Advance to: {nextStatus}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-lg">
                ✓ Distribution Completed
              </span>
            )}

            <button
              onClick={closeDonationDetails}
              className="px-4 py-2 text-xs font-medium text-stone-600 bg-white hover:bg-stone-100 rounded-lg transition-colors border border-stone-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
