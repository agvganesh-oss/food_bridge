import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { 
  Utensils, 
  HeartHandshake, 
  Shield, 
  ArrowLeft, 
  LogIn, 
  Sparkles, 
  Building2,
  CheckCircle2
} from 'lucide-react';

export const LoginPortal: React.FC = () => {
  const { loginAs } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123');

  const roleDetails: Record<UserRole, { title: string; subtitle: string; org: string; email: string; icon: any; desc: string }> = {
    donor: {
      title: 'Donor',
      subtitle: 'Restaurants, Caterers & Hostels',
      org: 'Green Leaf Restaurant',
      email: 'donor@foodbridge.org',
      icon: Utensils,
      desc: 'List excess food, manage pickups, and monitor surplus food donation lifecycles.'
    },
    ngo: {
      title: 'NGO / Volunteer',
      subtitle: 'Relief Teams & Youth Volunteers',
      org: 'Community Care Foundation',
      email: 'ngo@foodbridge.org',
      icon: HeartHandshake,
      desc: 'Browse available food, claim donations with one click, and deliver meals to beneficiaries.'
    },
    admin: {
      title: 'Admin',
      subtitle: 'Faculty & Project Coordinator',
      org: 'B.Tech CSE DPTL Project Cell',
      email: 'admin@foodbridge.org',
      icon: Shield,
      desc: 'Monitor user verification, review food donation metrics, and evaluate system efficiency.'
    }
  };

  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(roleDetails[role].email);
    setPassword('password123');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    loginAs(selectedRole, email, roleDetails[selectedRole].org);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-900 flex flex-col justify-center py-10 px-4 sm:px-6">
      {/* Main Container */}
      <div className="max-w-2xl w-full mx-auto py-6">
        {/* Brand Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center justify-center gap-2 mb-1">
            <span className="w-10 h-10 rounded-xl bg-[#14532d] flex items-center justify-center text-white font-black text-xl shadow-xs">
              F
            </span>
            <span className="text-3xl font-extrabold text-[#14532d] tracking-tight">
              FoodBridge
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-stone-900">
            “Turn Surplus Food Into Someone’s Next Meal.”
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
            A Web-Based Surplus Food Donation and Distribution System
          </p>
        </div>

        {/* Conditional Screen: Role Selection vs Login Form */}
        {!selectedRole ? (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-sm font-bold text-stone-800 uppercase tracking-wider">
                Select Your Role to Continue
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Choose how you wish to access the FoodBridge network
              </p>
            </div>

            {/* 3 Role Option Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* 1. Donor */}
              <button
                onClick={() => handleSelectRole('donor')}
                className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:border-[#14532d] hover:shadow-md transition-all text-left flex flex-col justify-between group focus:outline-none"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#14532d] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Utensils className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-[#14532d] transition-colors">
                    1. Donor
                  </h3>
                  <p className="text-xs font-medium text-stone-500 mt-0.5">
                    Restaurants & Caterers
                  </p>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    Post surplus food, track donations, and coordinate pickup.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center text-xs font-bold text-[#14532d]">
                  <span>Proceed as Donor →</span>
                </div>
              </button>

              {/* 2. NGO / Volunteer */}
              <button
                onClick={() => handleSelectRole('ngo')}
                className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:border-[#ea580c] hover:shadow-md transition-all text-left flex flex-col justify-between group focus:outline-none"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#ea580c] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-[#ea580c] transition-colors">
                    2. NGO / Volunteer
                  </h3>
                  <p className="text-xs font-medium text-stone-500 mt-0.5">
                    Relief Organizations
                  </p>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    View available food, claim donations, and deliver meals.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center text-xs font-bold text-[#ea580c]">
                  <span>Proceed as NGO →</span>
                </div>
              </button>

              {/* 3. Admin */}
              <button
                onClick={() => handleSelectRole('admin')}
                className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs hover:border-stone-800 hover:shadow-md transition-all text-left flex flex-col justify-between group focus:outline-none"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-stone-800 transition-colors">
                    3. Admin
                  </h3>
                  <p className="text-xs font-medium text-stone-500 mt-0.5">
                    Academic Evaluation
                  </p>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    Monitor users, verify donations, and check lab metrics.
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center text-xs font-bold text-stone-800">
                  <span>Proceed as Admin →</span>
                </div>
              </button>
            </div>
          </div>
        ) : (
          /* Role-Specific Login Form */
          <div className="max-w-md mx-auto bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
            {/* Back Button */}
            <button
              onClick={() => setSelectedRole(null)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Role Selection</span>
            </button>

            {/* Role Header Banner */}
            <div className="flex items-center gap-3 p-3.5 bg-stone-50 rounded-2xl border border-stone-200">
              <div className="w-10 h-10 rounded-xl bg-white text-[#14532d] shadow-2xs border border-stone-200 flex items-center justify-center shrink-0">
                {selectedRole === 'donor' && <Utensils className="w-5 h-5 text-[#14532d]" />}
                {selectedRole === 'ngo' && <HeartHandshake className="w-5 h-5 text-[#ea580c]" />}
                {selectedRole === 'admin' && <Shield className="w-5 h-5 text-stone-800" />}
              </div>
              <div>
                <h2 className="text-sm font-bold text-stone-900 capitalize">
                  {roleDetails[selectedRole].title} Login
                </h2>
                <p className="text-[11px] text-stone-500">
                  Demo Org: {roleDetails[selectedRole].org}
                </p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-xl focus:border-[#14532d] focus:ring-1 focus:ring-[#14532d] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-stone-300 rounded-xl focus:border-[#14532d] focus:ring-1 focus:ring-[#14532d] outline-none"
                />
                <p className="text-[10px] text-stone-400 mt-1">
                  (Demo password pre-filled for prototype examination)
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 text-xs font-bold text-white bg-[#14532d] hover:bg-[#166534] rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Log In to {roleDetails[selectedRole].title} Dashboard</span>
              </button>
            </form>

            <div className="pt-2 text-center">
              <button
                onClick={() => setSelectedRole(null)}
                className="text-xs text-stone-500 hover:text-stone-800 underline"
              >
                Switch to a different role
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
