import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DonationStatus } from '../types';
import { TrackingTimeline } from '../components/TrackingTimeline';
import { Search, MapPin, Clock, Utensils, CheckCircle2, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

export const DonationTrackingPage: React.FC = () => {
  const { donations, selectedDonationId, updateStatus, openDonationDetails } = useApp();

  const [activeTrackingId, setActiveTrackingId] = useState<string>(
    selectedDonationId || (donations[0]?.id ?? 'FB-001')
  );
  const [searchInput, setSearchInput] = useState('');

  const currentDonation = donations.find((d) => d.id === activeTrackingId) || donations[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchInput.trim().toUpperCase();
    const found = donations.find((d) => d.id.toUpperCase() === clean);
    if (found) {
      setActiveTrackingId(found.id);
    }
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

  const nextStatus = currentDonation ? getNextStatus(currentDonation.status) : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-5">
        <div className="text-xs font-semibold text-[#14532d] uppercase tracking-wider">
          Real-Time Tracking Engine
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
          Donation Tracking
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Trace the step-by-step physical status of surplus food from donor listing to beneficiary distribution.
        </p>
      </div>

      {/* ID Search & Quick Pills */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Enter Donation ID (e.g. FB-001, FB-002, FB-003)..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:border-[#14532d] focus:ring-1 focus:ring-[#14532d] outline-none font-mono"
            >
            </input>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Track ID
          </button>
        </form>

        <div className="flex items-center gap-2 flex-wrap pt-1">
          <span className="text-[11px] text-stone-500 font-medium">Quick select:</span>
          {donations.map((d) => (
            <button
              key={d.id}
              onClick={() => setActiveTrackingId(d.id)}
              className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-colors border ${
                activeTrackingId === d.id
                  ? 'bg-[#14532d] text-white border-[#14532d] font-bold shadow-xs'
                  : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
              }`}
            >
              {d.id} ({d.status})
            </button>
          ))}
        </div>
      </div>

      {/* Tracking Card */}
      {currentDonation ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          {/* Card Top Details */}
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold bg-stone-100 text-stone-800 px-2.5 py-1 rounded-md">
                  {currentDonation.id}
                </span>
                <span className="text-xs text-stone-500">
                  {currentDonation.foodType} · {currentDonation.servings} Servings
                </span>
              </div>
              <h2 className="text-xl font-bold text-stone-900 mt-2">
                {currentDonation.foodName}
              </h2>
              <div className="flex items-center gap-4 text-xs text-stone-600 mt-2">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  {currentDonation.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  Until {currentDonation.availableUntil}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] uppercase font-semibold text-stone-400 block mb-1">
                Current Status
              </span>
              <span
                className={`inline-block text-xs font-bold px-3 py-1 rounded-lg border ${
                  currentDonation.status === 'Available'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : currentDonation.status === 'Distributed'
                    ? 'bg-stone-100 text-stone-700 border-stone-300'
                    : 'bg-amber-50 text-amber-800 border-amber-300'
                }`}
              >
                {currentDonation.status}
              </span>
            </div>
          </div>

          {/* Timeline Display */}
          <div className="py-2">
            <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-4">
              Status Progression Timeline
            </h3>
            <div className="bg-[#fcfbf9] p-5 sm:p-6 rounded-2xl border border-stone-200">
              <TrackingTimeline
                currentStatus={currentDonation.status}
                history={currentDonation.trackingHistory}
              />
            </div>
          </div>

          {/* Interactive Demo Progress Controls */}
          <div className="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-0.5 text-left w-full sm:w-auto">
              <span className="text-xs font-bold text-stone-800">
                Interactive DPTL Lab Control
              </span>
              <p className="text-[11px] text-stone-500">
                Test the tracking lifecycle progression live for your college viva demonstration.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {nextStatus ? (
                <button
                  onClick={() => updateStatus(currentDonation.id, nextStatus)}
                  className="px-4 py-2 text-xs font-bold text-white bg-[#ea580c] hover:bg-[#c2410c] rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                >
                  <span>Advance Status to: {nextStatus}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Cycle Completed (Distributed)</span>
                </div>
              )}

              <button
                onClick={() => openDonationDetails(currentDonation.id)}
                className="px-3.5 py-2 text-xs font-medium text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl transition-colors"
              >
                View Full Details
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center">
          <p className="text-sm text-stone-600">No donation found for ID "{activeTrackingId}".</p>
        </div>
      )}
    </div>
  );
};
