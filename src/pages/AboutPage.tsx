import React from 'react';
import { useApp } from '../context/AppContext';
import { Target, BookOpen, HeartHandshake, ShieldCheck, ArrowRight, Utensils } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-12">
      {/* Page Header */}
      <div className="border-b border-stone-200 pb-5">
        <div className="text-xs font-semibold text-[#14532d] uppercase tracking-wider">
          Project Information & SDG Context
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight mt-1">
          About FoodBridge
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-2">
          A Web-Based Surplus Food Donation and Distribution System for SDG 2 – Zero Hunger.
        </p>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-8">
        {/* Section 1: What is FoodBridge? */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-3">
          <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
            <span className="w-2 h-5 bg-[#14532d] rounded-full inline-block" />
            What is FoodBridge?
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            FoodBridge is a web-based platform that connects people and organizations who have surplus edible food (such as restaurants, banquet halls, caterers, college messes, and food outlets) with local non-governmental organizations (NGOs) and volunteer groups who can collect and distribute it to people in need.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            Rather than letting safe, high-quality cooked food get discarded at the end of shifts, FoodBridge provides a streamlined digital channel to find, claim, and dispatch food quickly while it is fresh.
          </p>
        </div>

        {/* Section 2: Why was it created? */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-3">
          <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
            <span className="w-2 h-5 bg-[#ea580c] rounded-full inline-block" />
            Why was it created?
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Every day, food establishments prepare large batches of meals. When attendance fluctuates or weather changes, substantial quantities of wholesome food remain unserved. Simultaneously, shelters, orphanages, elder care centers, and daily-wage colonies face ongoing food shortages.
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            The core challenge has traditionally been <strong>the coordination gap</strong>: donors do not know which NGO has volunteers available right now, and NGOs do not know who has surplus food before it spoils. FoodBridge was created to make coordination simple, fast, and transparent:
          </p>
          <div className="bg-[#fcfbf9] p-4 rounded-xl border border-stone-200 text-xs font-semibold text-stone-800 flex items-center justify-center gap-2">
            <span>Donate</span>
            <span className="text-stone-300">→</span>
            <span>Find</span>
            <span className="text-stone-300">→</span>
            <span>Accept</span>
            <span className="text-stone-300">→</span>
            <span>Collect</span>
            <span className="text-stone-300">→</span>
            <span>Distribute</span>
          </div>
        </div>

        {/* Section 3: SDG 2 – Zero Hunger */}
        <div className="bg-[#14532d] text-white rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>UN Sustainable Development Goal</span>
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            SDG 2 – Zero Hunger
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            FoodBridge is directly aligned with United Nations Sustainable Development Goal 2: <em>"End hunger, achieve food security and improved nutrition and promote sustainable agriculture."</em>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
            <div className="bg-white/10 p-3.5 rounded-xl border border-white/15 space-y-1">
              <span className="font-bold text-amber-300">Target 2.1: End Hunger</span>
              <p className="text-emerald-100">
                Ensuring access by all people, in particular the poor and people in vulnerable situations, to safe, nutritious and sufficient food all year round.
              </p>
            </div>
            <div className="bg-white/10 p-3.5 rounded-xl border border-white/15 space-y-1">
              <span className="font-bold text-amber-300">Target 12.3: Food Loss Reduction</span>
              <p className="text-emerald-100">
                Halving per capita global food waste at the retail and consumer levels and reducing food losses along production and supply chains.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Academic Prototype Notice */}
        <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 space-y-2 text-xs text-stone-600">
          <div className="flex items-center gap-2 font-bold text-stone-800 text-sm">
            <BookOpen className="w-4 h-4 text-stone-600" />
            <span>Academic Project Prototype Notice</span>
          </div>
          <p className="leading-relaxed">
            This application is designed and implemented as an academic laboratory project for <strong>B.Tech Computer Science and Engineering (CSE)</strong> under the <strong>Design and Prototyping Thinking Lab (DPTL)</strong> curriculum.
          </p>
          <p className="leading-relaxed text-stone-500">
            All organizations and donor entities featured in the demonstration data (such as "Green Leaf Restaurant" and "Community Care Foundation") are fictional demo profiles configured to illustrate the operational workflow.
          </p>
        </div>
      </div>

      {/* Quick Nav Links */}
      <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => navigateTo('donate')}
          className="px-5 py-2.5 bg-[#14532d] hover:bg-[#166534] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
        >
          <Utensils className="w-3.5 h-3.5" />
          <span>Post Food Donation</span>
        </button>
        <button
          onClick={() => navigateTo('available')}
          className="px-5 py-2.5 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold rounded-lg transition-colors border border-stone-300"
        >
          Browse Available Food
        </button>
      </div>
    </div>
  );
};
