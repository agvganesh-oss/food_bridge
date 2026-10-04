import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Donation } from '../types';
import { Package, CheckCircle2, CheckCheck, MapPin, Clock, Utensils, ArrowRight } from 'lucide-react';

export const NgoDashboardPage: React.FC = () => {
  const { donations, openDonationDetails, currentUser, navigateTo } = useApp();

  const [activeTab, setActiveTab] = useState<'available' | 'accepted' | 'completed'>('available');

  const availableList = donations.filter((d) => d.status === 'Available');
  const acceptedList = donations.filter((d) => d.status === 'Accepted' || d.status === 'Pickup Scheduled' || d.status === 'Collected');
  const completedList = donations.filter((d) => d.status === 'Distributed');

  const currentList =
    activeTab === 'available'
      ? availableList
      : activeTab === 'accepted'
      ? acceptedList
      : completedList;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-5">
        <div className="text-xs font-semibold text-[#14532d] uppercase tracking-wider">
          NGO & Volunteer Operations Hub
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
          NGO / Volunteer Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Operating as <span className="font-semibold text-stone-800">{currentUser?.organization || 'Community Care Foundation'}</span>
        </p>
      </div>

      {/* 3 Summary Cards (also acting as clickable tabs) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Available Donations */}
        <button
          onClick={() => setActiveTab('available')}
          className={`p-5 rounded-2xl border text-left transition-all shadow-xs ${
            activeTab === 'available'
              ? 'bg-emerald-50/70 border-[#14532d] ring-1 ring-[#14532d]'
              : 'bg-white border-stone-200 hover:border-stone-300'
          }`}
        >
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Available Donations</span>
            <Package className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-3xl font-extrabold text-[#14532d] mt-1 font-mono tabular-nums">
            {availableList.length}
          </div>
          <p className="text-[11px] text-stone-500 mt-1">Ready for pickup & distribution</p>
        </button>

        {/* Accepted Donations */}
        <button
          onClick={() => setActiveTab('accepted')}
          className={`p-5 rounded-2xl border text-left transition-all shadow-xs ${
            activeTab === 'accepted'
              ? 'bg-amber-50/70 border-amber-600 ring-1 ring-amber-600'
              : 'bg-white border-stone-200 hover:border-stone-300'
          }`}
        >
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Accepted Donations</span>
            <CheckCircle2 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold text-amber-800 mt-1 font-mono tabular-nums">
            {acceptedList.length}
          </div>
          <p className="text-[11px] text-stone-500 mt-1">Scheduled or in-transit</p>
        </button>

        {/* Completed Donations */}
        <button
          onClick={() => setActiveTab('completed')}
          className={`p-5 rounded-2xl border text-left transition-all shadow-xs ${
            activeTab === 'completed'
              ? 'bg-stone-100 border-stone-600 ring-1 ring-stone-600'
              : 'bg-white border-stone-200 hover:border-stone-300'
          }`}
        >
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Completed Donations</span>
            <CheckCheck className="w-4 h-4 text-stone-600" />
          </div>
          <div className="text-3xl font-extrabold text-stone-900 mt-1 font-mono tabular-nums">
            {completedList.length}
          </div>
          <p className="text-[11px] text-stone-500 mt-1">Distributed to people in need</p>
        </button>
      </div>

      {/* Donation Cards Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-stone-900 capitalize">
          {activeTab} Donations ({currentList.length})
        </h2>
        {activeTab !== 'available' && (
          <button
            onClick={() => setActiveTab('available')}
            className="text-xs font-semibold text-[#14532d] hover:underline"
          >
            Switch to Available
          </button>
        )}
      </div>

      {/* Donation Cards List */}
      {currentList.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-10 text-center space-y-3">
          <p className="text-sm font-semibold text-stone-700">No {activeTab} donations at this moment.</p>
          {activeTab === 'available' ? (
            <button
              onClick={() => navigateTo('donate')}
              className="px-4 py-2 bg-[#14532d] text-white text-xs font-semibold rounded-lg"
            >
              Post a Test Food Donation
            </button>
          ) : (
            <button
              onClick={() => setActiveTab('available')}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg"
            >
              Check Available Food
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs flex flex-col justify-between hover:border-stone-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-mono font-semibold text-stone-500">{item.id}</span>
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

                <h3 className="text-base font-bold text-stone-900 leading-snug line-clamp-2">
                  {item.foodName}
                </h3>

                <div className="mt-2 text-xs text-stone-600 font-medium">
                  <span>Quantity: {item.quantity}</span>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span>{item.servings} Servings</span>
                </div>

                <div className="mt-3 pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>Available until {item.availableUntil}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-500 truncate max-w-[130px]">
                  Donor: {item.donorOrg}
                </span>

                <button
                  onClick={() => openDonationDetails(item.id)}
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#14532d] hover:bg-[#166534] text-white transition-colors shadow-xs"
                >
                  {item.status === 'Available' ? 'View & Accept' : 'Manage Status'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
