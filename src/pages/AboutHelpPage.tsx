import React from 'react';
import { useApp } from '../context/AppContext';
import { Target, BookOpen, HeartHandshake, ShieldCheck, ArrowRight, Utensils, HelpCircle, RefreshCw } from 'lucide-react';

export const AboutHelpPage: React.FC = () => {
  const { navigateTo, resetDemoData, currentUser } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-12">
      {/* Page Header */}
      <div className="border-b border-stone-200 pb-5">
        <div className="text-xs font-semibold text-[#14532d] uppercase tracking-wider">
          System Documentation & Support
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-1">
          About & Help Center
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-2">
          FoodBridge · A Web-Based Surplus Food Donation and Distribution System for SDG 2 – Zero Hunger.
        </p>
      </div>

      <div className="space-y-8">
        {/* Section 1: What is FoodBridge? */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-3">
          <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
            <span className="w-2 h-5 bg-[#14532d] rounded-full inline-block" />
            What is FoodBridge?
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            FoodBridge is a web-based surplus food coordination platform developed to connect donors (restaurants, caterers, college canteens, banquet halls) with local non-governmental organizations (NGOs) and volunteer groups who collect and distribute available meals to communities facing food insecurity.
          </p>
          <div className="bg-[#fcfbf9] p-4 rounded-xl border border-stone-200 text-xs font-semibold text-stone-800 flex flex-wrap items-center justify-center gap-2 text-center">
            <span>Donor Posts Food</span>
            <span className="text-stone-300">→</span>
            <span>Appears in Available Feed</span>
            <span className="text-stone-300">→</span>
            <span>NGO Accepts</span>
            <span className="text-stone-300">→</span>
            <span>Pickup & Transit</span>
            <span className="text-stone-300">→</span>
            <span>Distributed</span>
          </div>
        </div>

        {/* Section 2: Why was it created? */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-3">
          <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
            <span className="w-2 h-5 bg-[#ea580c] rounded-full inline-block" />
            Why was it created?
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Every day, commercial kitchens, hostels, and weddings produce surplus meals that are fresh, safe, and nutritious. However, due to lack of an organized local coordination mechanism, edible food often ends up in municipal landfills.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            FoodBridge was designed to eliminate phone call delays and WhatsApp group chaos by providing clear real-time statuses, instant one-click acceptance, and an end-to-end audit trail.
          </p>
        </div>

        {/* Section 3: SDG 2 – Zero Hunger */}
        <div className="bg-[#14532d] text-white rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>Sustainable Development Goal Alignment</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            SDG 2 – Zero Hunger
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            FoodBridge aligns with United Nations Sustainable Development Goal 2 to end hunger, achieve food security, and improve nutrition through local community action.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
            <div className="bg-white/10 p-3.5 rounded-xl border border-white/15 space-y-1">
              <span className="font-bold text-amber-300">Target 2.1: Universal Access</span>
              <p className="text-emerald-100">
                Directing safe meals to shelters, orphanages, and low-income colonies.
              </p>
            </div>
            <div className="bg-white/10 p-3.5 rounded-xl border border-white/15 space-y-1">
              <span className="font-bold text-amber-300">Target 12.3: Food Waste Reduction</span>
              <p className="text-emerald-100">
                Preventing wholesome prepared meals from decaying in landfills.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Operational Help & FAQs */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-stone-700" />
            <span>How to Demonstrate the System (Viva / Lab Guide)</span>
          </h2>

          <div className="space-y-3 text-xs text-stone-600">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <span className="font-bold text-stone-900">1. How does a donor post food?</span>
              <p>Log in as Donor → Navigate to "Post Donation" → Fill in food name, servings, and location → Click "Post Donation". A tracking ID (e.g. FB-005) is generated instantly.</p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <span className="font-bold text-stone-900">2. How does an NGO accept food?</span>
              <p>Switch/Log in as NGO → Click "Available Food" → Locate the newly posted donation → Click "View Details" → Click "Accept Donation". The status changes to "Accepted" in real time.</p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <span className="font-bold text-stone-900">3. How does tracking work?</span>
              <p>Navigate to "Track Status" → Enter or select any ID → Watch the 5-stage timeline: Posted → Accepted → Pickup Scheduled → Collected → Distributed.</p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
              <span className="font-bold text-stone-900">4. What does the Admin role do?</span>
              <p>Log in as Admin → Access Admin Dashboard, User Management, and Donation Management to review metrics, register users, and inspect listings.</p>
            </div>
          </div>
        </div>

        {/* Academic Prototype Notice */}
        <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 space-y-3 text-xs text-stone-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-stone-800 text-sm">
              <BookOpen className="w-4 h-4 text-stone-600" />
              <span>Academic Prototype Notice</span>
            </div>
            <button
              onClick={resetDemoData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg text-stone-700 font-semibold"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Demo Records</span>
            </button>
          </div>
          <p className="leading-relaxed">
            Developed for <strong>B.Tech Computer Science and Engineering (CSE)</strong> under the <strong>Design and Prototyping Thinking Lab (DPTL)</strong> curriculum.
          </p>
          <p className="leading-relaxed text-stone-500">
            Fictional organizations (Green Leaf Restaurant, Community Care Foundation, etc.) are configured for demonstration purposes.
          </p>
        </div>
      </div>
    </div>
  );
};
