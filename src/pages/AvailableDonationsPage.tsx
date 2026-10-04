import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FoodType, DonationStatus } from '../types';
import { Search, MapPin, Clock, Utensils, Filter, Plus } from 'lucide-react';

export const AvailableDonationsPage: React.FC = () => {
  const { donations, openDonationDetails, navigateTo } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedFoodType, setSelectedFoodType] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Extract unique locations from donations
  const locations = useMemo(() => {
    const set = new Set<string>();
    donations.forEach((d) => {
      // get primary neighborhood
      const parts = d.location.split(',');
      if (parts[0]) set.add(parts[0].trim());
    });
    return ['All', ...Array.from(set)];
  }, [donations]);

  // Filtered donations
  const filteredDonations = useMemo(() => {
    return donations.filter((item) => {
      // Search
      const matchesSearch =
        item.foodName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.donorOrg.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase());

      // Location
      const matchesLocation =
        selectedLocation === 'All' || item.location.includes(selectedLocation);

      // Food Type
      const matchesFoodType =
        selectedFoodType === 'All' || item.foodType === selectedFoodType;

      // Status
      const matchesStatus =
        selectedStatus === 'All' ||
        (selectedStatus === 'Available Only' ? item.status === 'Available' : item.status === selectedStatus);

      return matchesSearch && matchesLocation && matchesFoodType && matchesStatus;
    });
  }, [donations, searchQuery, selectedLocation, selectedFoodType, selectedStatus]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Available Food Donations
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Browse surplus food posted by local establishments, available for NGO and volunteer pickup.
          </p>
        </div>

        <button
          onClick={() => navigateTo('donate')}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#14532d] hover:bg-[#166534] rounded-lg transition-colors shrink-0 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Post Food Donation</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by food name, location, or donor organization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-xl focus:border-[#14532d] focus:ring-1 focus:ring-[#14532d] outline-none"
          />
        </div>

        {/* Filter Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Location Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">
              Location Filter
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full text-xs py-2 px-3 bg-stone-50 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:border-[#14532d]"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc === 'All' ? 'All Locations' : loc}
                </option>
              ))}
            </select>
          </div>

          {/* Food Type Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">
              Food Type
            </label>
            <select
              value={selectedFoodType}
              onChange={(e) => setSelectedFoodType(e.target.value)}
              className="w-full text-xs py-2 px-3 bg-stone-50 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:border-[#14532d]"
            >
              <option value="All">All Types</option>
              <option value="Vegetarian">Vegetarian Only</option>
              <option value="Non-Vegetarian">Non-Vegetarian Only</option>
            </select>
          </div>

          {/* Availability Status Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-stone-600 mb-1">
              Availability Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full text-xs py-2 px-3 bg-stone-50 border border-stone-300 rounded-lg text-stone-800 focus:outline-none focus:border-[#14532d]"
            >
              <option value="All">All Statuses</option>
              <option value="Available Only">Available Only (Ready to claim)</option>
              <option value="Accepted">Accepted</option>
              <option value="Pickup Scheduled">Pickup Scheduled</option>
              <option value="Distributed">Distributed (Completed)</option>
            </select>
          </div>
        </div>

        {/* Active filter count / clear */}
        {(searchQuery || selectedLocation !== 'All' || selectedFoodType !== 'All' || selectedStatus !== 'All') && (
          <div className="flex items-center justify-between text-xs text-stone-500 pt-1 border-t border-stone-100">
            <span>Showing {filteredDonations.length} matching result(s)</span>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedLocation('All');
                setSelectedFoodType('All');
                setSelectedStatus('All');
              }}
              className="text-[#14532d] hover:underline font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Cards Grid */}
      {filteredDonations.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center space-y-3">
          <Utensils className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="text-base font-bold text-stone-800">No food donations match your criteria</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try adjusting your search terms or filters to view other available or completed donations.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedLocation('All');
              setSelectedFoodType('All');
              setSelectedStatus('All');
            }}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDonations.map((item) => {
            const isAvailable = item.status === 'Available';

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-[#14532d]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top metadata line: ID and Status */}
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-mono font-semibold text-stone-500">
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

                  {/* Food Title */}
                  <h3 className="text-base font-bold text-stone-900 leading-snug line-clamp-2">
                    {item.foodName}
                  </h3>

                  {/* Core details as unboxed text */}
                  <div className="flex items-center gap-2 text-xs text-stone-600 mt-2 font-medium">
                    <span>{item.servings} servings</span>
                    <span aria-hidden="true">·</span>
                    <span className={item.foodType === 'Vegetarian' ? 'text-emerald-700' : 'text-amber-800'}>
                      {item.foodType}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{item.quantity}</span>
                  </div>

                  {/* Location & Time */}
                  <div className="mt-4 pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
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

                {/* Footer with donor org and View Details action */}
                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-stone-500 truncate max-w-[140px]">
                    {item.donorOrg}
                  </span>

                  <button
                    onClick={() => openDonationDetails(item.id)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${
                      isAvailable
                        ? 'bg-[#14532d] text-white hover:bg-[#166534] border-[#14532d]'
                        : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border-stone-300'
                    }`}
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
