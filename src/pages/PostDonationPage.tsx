import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FoodType } from '../types';
import { CheckCircle2, ArrowRight, Utensils, MapPin, Clock, Phone, Building2, AlertCircle } from 'lucide-react';

export const PostDonationPage: React.FC = () => {
  const { postDonation, currentUser, navigateTo, openDonationDetails } = useApp();

  // Form states
  const [foodName, setFoodName] = useState('');
  const [foodType, setFoodType] = useState<FoodType>('Vegetarian');
  const [quantity, setQuantity] = useState('');
  const [servings, setServings] = useState<number>(50);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(currentUser?.location || 'MVP Colony, Visakhapatnam');
  const [availableUntil, setAvailableUntil] = useState('8:30 PM Today');
  const [contactName, setContactName] = useState(currentUser?.name || 'Suresh Kumar');
  const [contactPhone, setContactPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [donorOrg, setDonorOrg] = useState(currentUser?.organization || 'Green Leaf Restaurant');

  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!foodName.trim()) {
      setErrorMsg('Please enter the food name.');
      return;
    }
    if (!quantity.trim()) {
      setErrorMsg('Please specify the quantity (e.g., 50 meal packets, 15 kg).');
      return;
    }
    if (!servings || servings <= 0) {
      setErrorMsg('Please specify a valid number of servings.');
      return;
    }
    if (!location.trim()) {
      setErrorMsg('Please provide the pickup location.');
      return;
    }
    if (!availableUntil.trim()) {
      setErrorMsg('Please specify until what time the food is available.');
      return;
    }

    const newId = postDonation({
      foodName: foodName.trim(),
      foodType,
      quantity: quantity.trim(),
      servings: Number(servings),
      description: description.trim(),
      location: location.trim(),
      availableUntil: availableUntil.trim(),
      contactName: contactName.trim(),
      contactPhone: contactPhone.trim(),
      donorOrg: donorOrg.trim(),
      donorEmail: currentUser?.email || 'donor@foodbridge.org',
    });

    setSubmittedId(newId);
  };

  const handleResetForm = () => {
    setFoodName('');
    setQuantity('');
    setServings(50);
    setDescription('');
    setSubmittedId(null);
    setErrorMsg(null);
  };

  // If submitted successfully, show clear success view
  if (submittedId) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-10 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#14532d] flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#14532d] uppercase tracking-wider">
              Ready for Collection
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Donation Posted Successfully
            </h1>
            <p className="text-sm text-stone-600 max-w-md mx-auto">
              Your surplus food has been posted and is now live in Available Donations for NGOs to accept.
            </p>
          </div>

          <div className="bg-[#fcfbf9] border border-stone-200 rounded-2xl p-4 max-w-sm mx-auto space-y-1">
            <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
              Generated Tracking ID
            </span>
            <div className="font-mono text-3xl font-black text-[#14532d]">
              {submittedId}
            </div>
            <p className="text-xs text-stone-500">
              Assigned for real-time pickup & delivery tracking.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button
              onClick={() => openDonationDetails(submittedId)}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-[#14532d] hover:bg-[#166534] rounded-xl transition-colors shadow-sm"
            >
              View Donation Details
            </button>

            <button
              onClick={() => navigateTo('track', submittedId)}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-stone-800 bg-white hover:bg-stone-50 rounded-xl transition-colors border border-stone-300"
            >
              Track in Real-Time
            </button>

            <button
              onClick={() => navigateTo('my-donations')}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors"
            >
              Go to My Donations
            </button>

            <button
              onClick={handleResetForm}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-medium text-stone-600 hover:text-stone-900 rounded-xl transition-colors"
            >
              + Post Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 md:py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-5">
        <div className="text-xs font-semibold text-[#14532d] uppercase tracking-wider">
          Donation Submission Form
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
          Post Surplus Food
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Enter details of surplus food available for immediate NGO collection.
        </p>
      </div>

      {errorMsg && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-3.5 rounded-xl text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
        {/* Food Name */}
        <div>
          <label className="block text-xs font-bold text-stone-800 mb-1.5">
            Food Item Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. 50 Meal Packets (Veg Pulao & Curd) or Steamed Rice & Dal"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-xl focus:border-[#14532d] focus:ring-1 focus:ring-[#14532d] outline-none"
          />
        </div>

        {/* Food Type & Servings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1.5">
              Food Type <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFoodType('Vegetarian')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors ${
                  foodType === 'Vegetarian'
                    ? 'bg-emerald-50 text-[#14532d] border-[#14532d]'
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                }`}
              >
                Vegetarian
              </button>
              <button
                type="button"
                onClick={() => setFoodType('Non-Vegetarian')}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors ${
                  foodType === 'Non-Vegetarian'
                    ? 'bg-amber-50 text-amber-900 border-amber-600'
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                }`}
              >
                Non-Vegetarian
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1.5">
              Estimated Servings <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              min={1}
              max={2000}
              placeholder="e.g. 50"
              value={servings}
              onChange={(e) => setServings(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-xl focus:border-[#14532d] focus:ring-1 focus:ring-[#14532d] outline-none"
            />
          </div>
        </div>

        {/* Quantity & Available Until */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1.5">
              Quantity / Container Description <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 50 packed boxes, 15 kg in 2 large vessels"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-xl focus:border-[#14532d] focus:ring-1 focus:ring-[#14532d] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1.5">
              Available Until (Expiry Window) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 8:30 PM Today, or Within 3 hours"
              value={availableUntil}
              onChange={(e) => setAvailableUntil(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-xl focus:border-[#14532d] focus:ring-1 focus:ring-[#14532d] outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-stone-800 mb-1.5">
            Description & Quality Notes
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Prepared at 1:00 PM for afternoon event. Sealed hygienically. Clean and untouched."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3.5 py-2 text-xs sm:text-sm border border-stone-300 rounded-xl focus:border-[#14532d] focus:ring-1 focus:ring-[#14532d] outline-none resize-none"
          />
        </div>

        {/* Pickup Location */}
        <div>
          <label className="block text-xs font-bold text-stone-800 mb-1.5">
            Pickup Location / Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. MVP Colony, Sector 3, Visakhapatnam"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-xl focus:border-[#14532d] focus:ring-1 focus:ring-[#14532d] outline-none"
          />
        </div>

        {/* Contact Info */}
        <div className="border-t border-stone-100 pt-5 space-y-4">
          <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
            Contact Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                Donor Organization
              </label>
              <input
                type="text"
                required
                value={donorOrg}
                onChange={(e) => setDonorOrg(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:border-[#14532d] outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                Contact Person
              </label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:border-[#14532d] outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg focus:border-[#14532d] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3 px-6 text-sm font-bold text-white bg-[#14532d] hover:bg-[#166534] rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-2"
          >
            <Utensils className="w-4 h-4" />
            <span>Post Donation</span>
          </button>
        </div>
      </form>
    </div>
  );
};
