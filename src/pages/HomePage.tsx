import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  HeartHandshake, 
  ArrowRight, 
  Utensils, 
  Truck, 
  Users, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Sparkles,
  Leaf,
  Target
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo, donations, openDonationDetails } = useApp();

  const activeDonationsCount = donations.filter((d) => d.status === 'Available').length;
  const totalServingsCount = donations.reduce((acc, curr) => acc + curr.servings, 0);

  // Take 2 recent available donations for the preview
  const recentAvailable = donations.filter((d) => d.status === 'Available').slice(0, 2);

  return (
    <div className="space-y-16 py-6 md:py-10">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6">
        {/* Academic Project Kicker */}
        <div className="text-xs font-semibold text-[#14532d] uppercase tracking-wider">
          B.Tech CSE DPTL Project · SDG 2: Zero Hunger
        </div>

        {/* Hero Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15] max-w-4xl mx-auto text-balance">
          Turn Surplus Food Into Someone’s Next Meal.
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
          FoodBridge connects surplus food donors with NGOs and volunteers who can help collect and distribute available food.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => navigateTo('donate')}
            className="px-6 py-3 text-sm font-semibold text-white bg-[#14532d] hover:bg-[#166534] rounded-xl transition-all shadow-sm hover:shadow flex items-center gap-2"
          >
            <Utensils className="w-4 h-4" />
            <span>Donate Food</span>
          </button>

          <button
            onClick={() => navigateTo('available')}
            className="px-6 py-3 text-sm font-semibold text-stone-800 bg-white hover:bg-stone-50 rounded-xl transition-all border border-stone-300 shadow-sm flex items-center gap-2"
          >
            <Users className="w-4 h-4 text-[#ea580c]" />
            <span>Find Food Donations</span>
          </button>
        </div>

        {/* Flow Strip */}
        <div className="pt-8">
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs max-w-3xl mx-auto">
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3 text-center">
              The 4-Step Lifesaving Cycle
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-stone-800 font-bold text-xs sm:text-sm tracking-wide">
              <div className="flex items-center justify-center gap-2 bg-[#fcfbf9] py-2 px-3 rounded-lg border border-stone-200">
                <span className="w-5 h-5 rounded-full bg-[#14532d] text-white text-[11px] flex items-center justify-center">1</span>
                <span>DONATE</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-[#fcfbf9] py-2 px-3 rounded-lg border border-stone-200">
                <span className="w-5 h-5 rounded-full bg-[#14532d] text-white text-[11px] flex items-center justify-center">2</span>
                <span>CONNECT</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-[#fcfbf9] py-2 px-3 rounded-lg border border-stone-200">
                <span className="w-5 h-5 rounded-full bg-[#14532d] text-white text-[11px] flex items-center justify-center">3</span>
                <span>COLLECT</span>
              </div>
              <div className="flex items-center justify-center gap-2 bg-[#fcfbf9] py-2 px-3 rounded-lg border border-stone-200">
                <span className="w-5 h-5 rounded-full bg-[#ea580c] text-white text-[11px] flex items-center justify-center">4</span>
                <span>DISTRIBUTE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Available Food Spotlight (Adjacency & Purpose) */}
      {recentAvailable.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-stone-900">Current Available Donations</h2>
              <p className="text-xs text-stone-500">Ready for immediate pickup and distribution</p>
            </div>
            <button
              onClick={() => navigateTo('available')}
              className="text-xs font-semibold text-[#14532d] hover:underline flex items-center gap-1"
            >
              <span>View All ({activeDonationsCount})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentAvailable.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs hover:border-[#14532d]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                    <span className="font-mono font-semibold text-stone-700">{item.id}</span>
                    <span>{item.foodType} · {item.servings} Servings</span>
                  </div>
                  <h3 className="text-base font-bold text-stone-900 leading-snug">{item.foodName}</h3>
                  <div className="mt-3 space-y-1.5 text-xs text-stone-600">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span>Available until {item.availableUntil}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs text-stone-500">By {item.donorOrg}</span>
                  <button
                    onClick={() => openDonationDetails(item.id)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-[#14532d] bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
                  >
                    View Details & Accept
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Why FoodBridge Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight">Why FoodBridge?</h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Millions of tons of edible food go to waste daily from weddings, messes, and eateries, while community shelters struggle for regular meals. FoodBridge bridges that gap.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#14532d] flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Prevents Food Wastage</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Provides food businesses with a rapid, reliable channel to divert surplus edible meals to people instead of city dumpsites.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#ea580c] flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Swift Local Coordination</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Eliminates chaotic WhatsApp calls. Transparent real-time statuses ensure NGOs pick up food while it is warm and safe to eat.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900">Direct Social Impact</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Feeds daily-wage workers, homeless shelters, orphanage homes, and eldercare residences with dignity and care.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-stone-100/70 border-y border-stone-200 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-3">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 tracking-tight">How It Works</h2>
              <p className="text-xs sm:text-sm text-stone-600">Simple 4-stage workflow designed for fast turnaround</p>
            </div>
            <button
              onClick={() => navigateTo('how-it-works')}
              className="text-xs font-semibold text-[#14532d] hover:underline"
            >
              Learn More Details →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-[#14532d] uppercase">Step 1</span>
              <h3 className="text-base font-bold text-stone-900">Donate</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                A donor posts surplus food with quantity, location, and expiry window.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-[#14532d] uppercase">Step 2</span>
              <h3 className="text-base font-bold text-stone-900">Connect</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Registered NGOs and volunteers review available food donations nearby.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-[#14532d] uppercase">Step 3</span>
              <h3 className="text-base font-bold text-stone-900">Collect</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                The volunteer team accepts the donation and collects the food parcels.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2">
              <span className="text-xs font-bold text-[#ea580c] uppercase">Step 4</span>
              <h3 className="text-base font-bold text-stone-900">Distribute</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Food is safely delivered to beneficiaries and marked as distributed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl font-bold text-stone-900 tracking-tight">Who Uses FoodBridge?</h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Designed for collaboration across donors, volunteers, and administrative coordinators.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-stone-900">1. Food Donors</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Restaurants, caterers, college hostels, banquet halls, and households with wholesome surplus meals to give away.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('donor-dashboard')}
                className="text-xs font-semibold text-[#14532d] hover:underline"
              >
                Go to Donor Hub →
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-stone-900">2. NGOs & Volunteers</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Charitable foundations, youth volunteer corps, and community kitchens that have the logistics to pick up and distribute food.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('ngo-dashboard')}
                className="text-xs font-semibold text-[#14532d] hover:underline"
              >
                Go to NGO Hub →
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-stone-900">3. College Project Admin</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Faculty mentors and student coordinators monitoring total users, system turnaround, and active donation lifecycles.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('admin-dashboard')}
                className="text-xs font-semibold text-[#14532d] hover:underline"
              >
                Go to Admin Overview →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SDG 2 – Zero Hunger Spotlight Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-[#14532d] text-white rounded-3xl p-8 sm:p-10 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-lg text-xs font-semibold text-emerald-200">
                <Target className="w-3.5 h-3.5" />
                <span>United Nations Sustainable Development Goal</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                SDG 2: Zero Hunger
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed max-w-xl">
                Goal 2 aims to end hunger, achieve food security and improved nutrition, and promote sustainable agriculture. FoodBridge applies technology to reduce food loss and ensure safe excess meals reach people facing food insecurity.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-emerald-200">
                <span>Target 2.1: Universal Access to Food</span>
                <span aria-hidden="true">·</span>
                <span>Target 12.3: Halving Food Waste</span>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-6 border border-white/20 text-center space-y-2">
              <span className="text-4xl font-extrabold text-amber-300 font-mono tabular-nums">
                {totalServingsCount}+
              </span>
              <p className="text-xs text-white font-medium">
                Servings Logged in Current Academic Prototype
              </p>
              <button
                onClick={() => navigateTo('about')}
                className="mt-3 px-4 py-2 bg-white text-[#14532d] text-xs font-bold rounded-lg hover:bg-stone-100 transition-colors w-full"
              >
                View Project Details
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
