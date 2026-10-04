import React from 'react';
import { useApp } from '../context/AppContext';
import { Utensils, Search, Truck, Heart, ArrowRight } from 'lucide-react';

export const HowItWorksPage: React.FC = () => {
  const { navigateTo } = useApp();

  const steps = [
    {
      number: '1',
      title: 'Donate',
      subtitle: 'Donor posts surplus food',
      description: 'A restaurant, caterer, hostel, or individual posts details about surplus food including servings, vegetarian/non-vegetarian type, pickup address, and expiry cutoff.',
      icon: Utensils,
      color: 'bg-emerald-50 text-[#14532d]',
      action: 'Post Food Now',
      actionPage: 'donate'
    },
    {
      number: '2',
      title: 'Connect',
      subtitle: 'NGOs find available food',
      description: 'Verified NGOs and student volunteers browse the live donation feed, filter by area and food type, and locate nearby food ready for collection.',
      icon: Search,
      color: 'bg-emerald-50 text-[#14532d]',
      action: 'View Donations',
      actionPage: 'available'
    },
    {
      number: '3',
      title: 'Collect',
      subtitle: 'Volunteers accept & collect',
      description: 'An NGO claims the donation with one click. The status updates in real time to "Accepted", and the volunteer team schedules and collects the food parcels.',
      icon: Truck,
      color: 'bg-orange-50 text-[#ea580c]',
      action: 'NGO Dashboard',
      actionPage: 'ngo-dashboard'
    },
    {
      number: '4',
      title: 'Distribute',
      subtitle: 'Delivered to people in need',
      description: 'The food is swiftly transported and distributed to shelters, community centers, or daily-wage colonies before quality degrades. The status updates to "Distributed".',
      icon: Heart,
      color: 'bg-orange-50 text-[#ea580c]',
      action: 'Track Lifecycle',
      actionPage: 'track'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="text-xs font-semibold text-[#14532d] uppercase tracking-wider">
          Simple 4-Step Process
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          How FoodBridge Works
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed">
          From surplus kitchen to someone’s meal table in 4 transparent, verified steps.
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.number}
              className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between hover:border-stone-300 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-2xl font-black text-stone-300">
                    0{s.number}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-[#14532d] uppercase tracking-wider">
                    Step {s.number}
                  </span>
                  <h2 className="text-xl font-bold text-stone-900">{s.title}</h2>
                  <p className="text-xs font-medium text-stone-500">{s.subtitle}</p>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 mt-4 leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={() => navigateTo(s.actionPage)}
                  className="text-xs font-semibold text-[#14532d] hover:underline flex items-center gap-1.5"
                >
                  <span>{s.action}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA block */}
      <div className="bg-[#fcfbf9] p-8 rounded-2xl border border-stone-200 text-center space-y-4 max-w-3xl mx-auto">
        <h3 className="text-lg font-bold text-stone-900">Ready to test the flow?</h3>
        <p className="text-xs text-stone-600 max-w-lg mx-auto">
          Post a sample food item or accept an existing listing to see the tracking timeline advance in real time.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => navigateTo('donate')}
            className="px-5 py-2.5 bg-[#14532d] hover:bg-[#166534] text-white text-xs font-bold rounded-lg transition-colors"
          >
            Post Food Donation
          </button>
          <button
            onClick={() => navigateTo('available')}
            className="px-5 py-2.5 bg-white hover:bg-stone-50 text-stone-800 text-xs font-semibold rounded-lg transition-colors border border-stone-300"
          >
            Browse Available Food
          </button>
        </div>
      </div>
    </div>
  );
};
