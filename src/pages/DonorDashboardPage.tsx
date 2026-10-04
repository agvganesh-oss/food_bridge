import React from 'react';
import { useApp } from '../context/AppContext';
import { Plus, Package, Clock, CheckCircle, CheckCheck, ArrowRight, Utensils, MapPin } from 'lucide-react';

export const DonorDashboardPage: React.FC = () => {
  const { donations, currentUser, navigateTo, openDonationDetails } = useApp();

  const donorDonations = donations;

  const totalCount = donorDonations.length;
  const pendingCount = donorDonations.filter((d) => d.status === 'Available').length;
  const acceptedCount = donorDonations.filter((d) => d.status === 'Accepted' || d.status === 'Pickup Scheduled' || d.status === 'Collected').length;
  const completedCount = donorDonations.filter((d) => d.status === 'Distributed').length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="text-xs font-semibold text-[#14532d] uppercase tracking-wider">
            Donor Control Panel
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
            Donor Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Welcome, <span className="font-semibold text-stone-800">{currentUser?.name}</span> · Organization: <span className="font-semibold text-[#14532d]">{currentUser?.organization}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('post-donation')}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#14532d] hover:bg-[#166534] rounded-xl transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Post Surplus Food</span>
          </button>
          <button
            onClick={() => navigateTo('my-donations')}
            className="px-3.5 py-2.5 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-300 rounded-xl transition-colors shadow-2xs"
          >
            My Donations ({donorDonations.length})
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Donations */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Donations</span>
            <Package className="w-4 h-4 text-stone-400" />
          </div>
          <div className="text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
            {totalCount}
          </div>
          <p className="text-[11px] text-stone-500">All surplus food posted</p>
        </div>

        {/* Pending (Available) */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-800 font-mono tabular-nums">
            {pendingCount}
          </div>
          <p className="text-[11px] text-stone-500">Available for NGO collection</p>
        </div>

        {/* Accepted / In Transit */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Accepted</span>
            <CheckCircle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-extrabold text-amber-800 font-mono tabular-nums">
            {acceptedCount}
          </div>
          <p className="text-[11px] text-stone-500">Assigned / In transit</p>
        </div>

        {/* Completed (Distributed) */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-stone-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Completed</span>
            <CheckCheck className="w-4 h-4 text-stone-700" />
          </div>
          <div className="text-3xl font-extrabold text-stone-900 font-mono tabular-nums">
            {completedCount}
          </div>
          <p className="text-[11px] text-stone-500">Distributed to beneficiaries</p>
        </div>
      </div>

      {/* Recent Donations Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-stone-200 flex items-center justify-between">
          <h2 className="text-base font-bold text-stone-900">Recent Surplus Donations</h2>
          <button
            onClick={() => navigateTo('my-donations')}
            className="text-xs font-semibold text-[#14532d] hover:underline"
          >
            View All My Donations →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fcfbf9] text-stone-500 uppercase tracking-wider text-[11px] border-b border-stone-200">
              <tr>
                <th className="py-3 px-4 font-semibold">ID</th>
                <th className="py-3 px-4 font-semibold">Food Item</th>
                <th className="py-3 px-4 font-semibold">Servings</th>
                <th className="py-3 px-4 font-semibold">Location</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Accepted NGO</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {donorDonations.slice(0, 5).map((item) => (
                <tr key={item.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-stone-800">
                    {item.id}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-stone-900">{item.foodName}</p>
                    <p className="text-[11px] text-stone-500">{item.quantity} · {item.foodType}</p>
                  </td>
                  <td className="py-3 px-4 font-mono text-stone-700">
                    {item.servings}
                  </td>
                  <td className="py-3 px-4 text-stone-600 truncate max-w-[150px]">
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
                  <td className="py-3 px-4 text-stone-600">
                    {item.acceptedByOrg ? (
                      <span className="font-medium text-stone-800">{item.acceptedByOrg}</span>
                    ) : (
                      <span className="text-stone-400 italic">Waiting for pickup</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => openDonationDetails(item.id)}
                      className="px-2.5 py-1 text-xs font-semibold text-[#14532d] hover:bg-emerald-50 rounded-md transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => navigateTo('track', item.id)}
                      className="px-2.5 py-1 text-xs font-semibold text-stone-700 hover:bg-stone-100 rounded-md transition-colors"
                    >
                      Track
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
