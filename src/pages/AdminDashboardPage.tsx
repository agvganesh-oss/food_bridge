import React from 'react';
import { useApp } from '../context/AppContext';
import { Users, Package, Clock, CheckCheck, RefreshCw, ArrowRight, UserPlus, FileText } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { donations, users, openDonationDetails, navigateTo, resetDemoData } = useApp();

  const totalUsers = users.length;
  const totalDonations = donations.length;
  const activeDonations = donations.filter((d) => d.status !== 'Distributed').length;
  const completedDonations = donations.filter((d) => d.status === 'Distributed').length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="text-xs font-semibold text-[#14532d] uppercase tracking-wider">
            Academic Lab Administration
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
            Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            B.Tech CSE DPTL Project Monitoring Console · SDG 2: Zero Hunger
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('donation-management')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-[#14532d] hover:bg-[#166534] rounded-xl transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Manage Donations</span>
          </button>
          <button
            onClick={() => navigateTo('user-management')}
            className="px-3.5 py-2 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Manage Users</span>
          </button>
          <button
            onClick={resetDemoData}
            className="p-2 text-stone-500 hover:text-stone-800 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl transition-colors"
            title="Reset Demo Records"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Admin Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <div 
          onClick={() => navigateTo('user-management')}
          className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1 hover:border-stone-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider group-hover:text-stone-900">Total Users</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
            {totalUsers}
          </div>
          <p className="text-[11px] text-stone-500">Donors, NGOs, and staff →</p>
        </div>

        {/* Total Donations */}
        <div 
          onClick={() => navigateTo('donation-management')}
          className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1 hover:border-stone-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider group-hover:text-stone-900">Total Donations</span>
            <Package className="w-4 h-4 text-stone-600" />
          </div>
          <div className="text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
            {totalDonations}
          </div>
          <p className="text-[11px] text-stone-500">All surplus listings →</p>
        </div>

        {/* Active Donations */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Donations</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold text-amber-800 font-mono tabular-nums">
            {activeDonations}
          </div>
          <p className="text-[11px] text-stone-500">In pickup or distribution</p>
        </div>

        {/* Completed Donations */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Completed Donations</span>
            <CheckCheck className="w-4 h-4 text-[#14532d]" />
          </div>
          <div className="text-3xl font-extrabold text-[#14532d] font-mono tabular-nums">
            {completedDonations}
          </div>
          <p className="text-[11px] text-stone-500">Successfully distributed</p>
        </div>
      </div>

      {/* Quick Action Navigation Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#fcfbf9] p-5 rounded-2xl border border-stone-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-stone-900">Donation Lifecycle Management</h3>
            <p className="text-xs text-stone-500 mt-0.5">Audit listings, override status, or remove test entries.</p>
          </div>
          <button
            onClick={() => navigateTo('donation-management')}
            className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1 shrink-0"
          >
            <span>Open</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-[#fcfbf9] p-5 rounded-2xl border border-stone-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-stone-900">User & Partner Roster</h3>
            <p className="text-xs text-stone-500 mt-0.5">Register new food donors or verify NGO organizations.</p>
          </div>
          <button
            onClick={() => navigateTo('user-management')}
            className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1 shrink-0"
          >
            <span>Open</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Simple List of Recent Donations */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-stone-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-stone-900">Recent Food Donations</h2>
          <button
            onClick={() => navigateTo('donation-management')}
            className="text-xs font-semibold text-[#14532d] hover:underline"
          >
            View All ({donations.length}) →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fcfbf9] text-stone-500 uppercase tracking-wider text-[11px] border-b border-stone-200">
              <tr>
                <th className="py-3 px-4 font-semibold">ID</th>
                <th className="py-3 px-4 font-semibold">Food Item</th>
                <th className="py-3 px-4 font-semibold">Donor Organization</th>
                <th className="py-3 px-4 font-semibold">Servings</th>
                <th className="py-3 px-4 font-semibold">Location</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {donations.slice(0, 5).map((item) => (
                <tr key={item.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-stone-800">
                    {item.id}
                  </td>
                  <td className="py-3 px-4 font-semibold text-stone-900">
                    {item.foodName}
                  </td>
                  <td className="py-3 px-4 text-stone-700">
                    {item.donorOrg}
                  </td>
                  <td className="py-3 px-4 font-mono text-stone-700">
                    {item.servings}
                  </td>
                  <td className="py-3 px-4 text-stone-600 truncate max-w-[160px]">
                    {item.location}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                        item.status === 'Available'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : item.status === 'Distributed'
                          ? 'bg-stone-100 text-stone-600 border-stone-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => openDonationDetails(item.id)}
                      className="px-2.5 py-1 text-xs font-semibold text-[#14532d] hover:bg-emerald-50 rounded-md transition-colors"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
