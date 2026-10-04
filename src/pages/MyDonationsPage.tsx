import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, MapPin, Clock, Utensils, CheckCircle2, Eye, ArrowRight } from 'lucide-react';

export const MyDonationsPage: React.FC = () => {
  const { donations, currentUser, navigateTo, openDonationDetails } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const myDonations = donations;

  const filtered = myDonations.filter((d) => {
    if (filterStatus === 'All') return true;
    if (filterStatus === 'Available') return d.status === 'Available';
    if (filterStatus === 'In Progress') return d.status === 'Accepted' || d.status === 'Pickup Scheduled' || d.status === 'Collected';
    if (filterStatus === 'Completed') return d.status === 'Distributed';
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="text-xs font-semibold text-[#14532d] uppercase tracking-wider">
            Donor Records
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
            My Posted Donations
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Track and monitor the real-time status of all surplus food you have posted.
          </p>
        </div>

        <button
          onClick={() => navigateTo('post-donation')}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#14532d] hover:bg-[#166534] rounded-xl transition-all shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Post New Donation</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {['All', 'Available', 'In Progress', 'Completed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilterStatus(tab)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all ${
              filterStatus === tab
                ? 'bg-[#14532d] text-white border-[#14532d] shadow-2xs'
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            {tab} ({
              tab === 'All'
                ? myDonations.length
                : tab === 'Available'
                ? myDonations.filter((d) => d.status === 'Available').length
                : tab === 'In Progress'
                ? myDonations.filter((d) => d.status === 'Accepted' || d.status === 'Pickup Scheduled' || d.status === 'Collected').length
                : myDonations.filter((d) => d.status === 'Distributed').length
            })
          </button>
        ))}
      </div>

      {/* Donations List / Cards */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-10 text-center space-y-3">
          <Utensils className="w-8 h-8 text-stone-300 mx-auto" />
          <h3 className="text-sm font-bold text-stone-800">No donations in this category</h3>
          <p className="text-xs text-stone-500">Post surplus food to start helping local communities.</p>
          <button
            onClick={() => navigateTo('post-donation')}
            className="px-4 py-2 bg-[#14532d] text-white text-xs font-semibold rounded-lg"
          >
            Post Food Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between hover:border-stone-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                    {item.id}
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                      item.status === 'Available'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : item.status === 'Distributed'
                        ? 'bg-stone-100 text-stone-600 border-stone-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-stone-900 leading-snug">
                  {item.foodName}
                </h3>

                <div className="flex items-center gap-2 text-xs text-stone-600 mt-2 font-medium">
                  <span>{item.servings} Servings</span>
                  <span aria-hidden="true">·</span>
                  <span className={item.foodType === 'Vegetarian' ? 'text-emerald-700' : 'text-amber-800'}>
                    {item.foodType}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{item.quantity}</span>
                </div>

                <div className="mt-3 pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>Until {item.availableUntil}</span>
                  </div>
                </div>

                {item.acceptedByOrg && (
                  <div className="mt-2 text-[11px] text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                    Claimed by: <span className="font-semibold">{item.acceptedByOrg}</span>
                  </div>
                )}
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={() => openDonationDetails(item.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-50 hover:bg-stone-100 rounded-lg border border-stone-200 transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={() => navigateTo('track', item.id)}
                  className="px-3 py-1.5 text-xs font-semibold text-[#14532d] hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-1"
                >
                  <span>Track Status</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
