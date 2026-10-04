import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { LogOut, User as UserIcon, RefreshCw, ChevronDown, Menu, X, Shield, Utensils, HeartHandshake } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, activePage, navigateTo, logout, loginAs, resetDemoData } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  if (!currentUser) return null;

  // Role-based links
  const getNavLinks = (role: UserRole) => {
    switch (role) {
      case 'donor':
        return [
          { label: 'Dashboard', page: 'donor-dashboard' },
          { label: 'Post Donation', page: 'post-donation' },
          { label: 'My Donations', page: 'my-donations' },
          { label: 'Track Status', page: 'track' },
          { label: 'About / Help', page: 'about' },
        ];
      case 'ngo':
        return [
          { label: 'Dashboard', page: 'ngo-dashboard' },
          { label: 'Available Food', page: 'available' },
          { label: 'Track Status', page: 'track' },
          { label: 'About / Help', page: 'about' },
        ];
      case 'admin':
        return [
          { label: 'Dashboard', page: 'admin-dashboard' },
          { label: 'Donation Management', page: 'donation-management' },
          { label: 'User Management', page: 'user-management' },
          { label: 'Track Status', page: 'track' },
          { label: 'About / Help', page: 'about' },
        ];
    }
  };

  const navLinks = getNavLinks(currentUser.role);

  return (
    <header className="sticky top-0 z-40 bg-[#fcfbf9]/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => {
              if (currentUser.role === 'donor') navigateTo('donor-dashboard');
              else if (currentUser.role === 'ngo') navigateTo('ngo-dashboard');
              else navigateTo('admin-dashboard');
            }}
            className="flex items-center gap-2 text-left group focus-visible:outline-none"
          >
            <span className="w-8 h-8 rounded-lg bg-[#14532d] flex items-center justify-center text-white font-bold text-lg shadow-2xs">
              F
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold tracking-tight text-[#14532d] group-hover:text-[#166534] transition-colors">
                FoodBridge
              </span>
              <span className="hidden sm:inline-block text-[11px] font-semibold uppercase px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200">
                {currentUser.role}
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((item) => {
              const isActive = activePage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => navigateTo(item.page)}
                  className={`text-xs font-semibold tracking-wide transition-colors hover:text-[#14532d] ${
                    isActive
                      ? 'text-[#14532d] underline underline-offset-8 decoration-2 decoration-[#14532d]'
                      : 'text-stone-600'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: User Details & Logout */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Switch Persona for Lab Evaluator */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-stone-200"
                title="Switch persona for evaluation"
              >
                <span className="font-medium truncate max-w-[120px]">{currentUser.organization || currentUser.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-stone-200 py-1.5 z-50">
                  <div className="px-3 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    Switch Demo Persona
                  </div>
                  <button
                    onClick={() => {
                      loginAs('donor');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-stone-50 ${
                      currentUser.role === 'donor' ? 'bg-emerald-50 text-[#14532d] font-semibold' : 'text-stone-700'
                    }`}
                  >
                    <Utensils className="w-3.5 h-3.5" />
                    <span>Donor (Green Leaf)</span>
                  </button>
                  <button
                    onClick={() => {
                      loginAs('ngo');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-stone-50 ${
                      currentUser.role === 'ngo' ? 'bg-emerald-50 text-[#14532d] font-semibold' : 'text-stone-700'
                    }`}
                  >
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>NGO (Community Care)</span>
                  </button>
                  <button
                    onClick={() => {
                      loginAs('admin');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 hover:bg-stone-50 ${
                      currentUser.role === 'admin' ? 'bg-emerald-50 text-[#14532d] font-semibold' : 'text-stone-700'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Admin (CSE Project Cell)</span>
                  </button>
                  <div className="border-t border-stone-100 my-1" />
                  <button
                    onClick={() => {
                      resetDemoData();
                      setRoleDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-1 text-xs text-stone-500 hover:text-red-700 hover:bg-stone-50 flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Reset Demo Data
                  </button>
                </div>
              )}
            </div>

            {/* Logout button */}
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 hover:text-red-700 bg-white hover:bg-red-50 rounded-lg transition-colors border border-stone-300"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={logout}
              className="px-2 py-1 text-xs font-medium text-stone-600 hover:text-red-700 border border-stone-200 rounded-md"
            >
              Logout
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-stone-600 rounded-lg hover:bg-stone-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-[#fcfbf9] px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((item) => (
            <button
              key={item.page}
              onClick={() => {
                navigateTo(item.page);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-lg ${
                activePage === item.page
                  ? 'bg-emerald-50 text-[#14532d]'
                  : 'text-stone-700 hover:bg-stone-100'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-xs">
            <span className="text-stone-500">User: {currentUser.name}</span>
            <button
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
              className="text-red-700 font-bold"
            >
              Logout to Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
