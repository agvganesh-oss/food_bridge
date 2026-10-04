import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, RefreshCw, LogOut } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, resetDemoData, currentUser, logout } = useApp();

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Academic brief */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-md bg-[#166534] flex items-center justify-center text-white font-bold text-sm">
                F
              </span>
              <span className="text-lg font-bold text-white tracking-tight">FoodBridge</span>
              {currentUser && (
                <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-stone-800 text-emerald-400 border border-stone-700">
                  {currentUser.role} portal
                </span>
              )}
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-md">
              A Web-Based Surplus Food Donation and Distribution System developed for B.Tech Computer Science & Engineering 
              under the Design and Prototyping Thinking Lab (DPTL).
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium pt-1">
              <span>UN Sustainable Development Goal</span>
              <span aria-hidden="true">·</span>
              <span>SDG 2: Zero Hunger</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-wider mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              {currentUser?.role === 'donor' && (
                <>
                  <li>
                    <button onClick={() => navigateTo('donor-dashboard')} className="hover:text-white transition-colors">
                      Donor Dashboard
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('post-donation')} className="hover:text-white transition-colors">
                      Post Surplus Food
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('my-donations')} className="hover:text-white transition-colors">
                      My Donations
                    </button>
                  </li>
                </>
              )}

              {currentUser?.role === 'ngo' && (
                <>
                  <li>
                    <button onClick={() => navigateTo('ngo-dashboard')} className="hover:text-white transition-colors">
                      NGO Dashboard
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('available')} className="hover:text-white transition-colors">
                      Available Food Feed
                    </button>
                  </li>
                </>
              )}

              {currentUser?.role === 'admin' && (
                <>
                  <li>
                    <button onClick={() => navigateTo('admin-dashboard')} className="hover:text-white transition-colors">
                      Admin Dashboard
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('donation-management')} className="hover:text-white transition-colors">
                      Donation Management
                    </button>
                  </li>
                  <li>
                    <button onClick={() => navigateTo('user-management')} className="hover:text-white transition-colors">
                      User Management
                    </button>
                  </li>
                </>
              )}

              <li>
                <button onClick={() => navigateTo('track')} className="hover:text-white transition-colors">
                  Track Donation Status
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  About & Help
                </button>
              </li>
              <li>
                <button onClick={logout} className="hover:text-red-400 transition-colors flex items-center gap-1">
                  <LogOut className="w-3 h-3" />
                  <span>Logout to Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Prototype note */}
          <div>
            <h4 className="text-xs font-semibold text-stone-200 uppercase tracking-wider mb-3">
              Prototype Control
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-3">
              Fictional sample data (Green Leaf Restaurant, Community Care Foundation) for college lab demonstration.
            </p>
            <button
              onClick={resetDemoData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-300 bg-stone-800 hover:bg-stone-700 rounded-md transition-colors border border-stone-700"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset Demo Records
            </button>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
          <p>© {new Date().getFullYear()} FoodBridge · B.Tech CSE DPTL Academic Project.</p>
          <div className="flex items-center gap-1">
            <span>Built with commitment for</span>
            <Heart className="w-3.5 h-3.5 text-orange-500 inline fill-orange-500 mx-0.5" />
            <span>Zero Hunger</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
