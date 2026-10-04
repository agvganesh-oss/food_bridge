import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DonationStatus } from '../types';
import { Search, Trash2, Eye, Filter, CheckCircle2, ArrowRight } from 'lucide-react';

export const DonationManagementPage: React.FC = () => {
  const { donations, updateStatus, deleteDonation, openDonationDetails, navigateTo } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = donations.filter((d) => {
    const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
    const matchesSearch =
      d.foodName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.donorOrg.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statuses: DonationStatus[] = [
    'Available',
    'Accepted',
    'Pickup Scheduled',
    'Collected',
    'Distributed'
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-5">
        <div className="text-xs font-semibold text-[#14532d] uppercase tracking-wider">
          Admin Operations
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
          Donation Management
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">
          Inspect, override status lifecycles, and audit surplus food records across the network.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by food, donor, ID, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-lg focus:border-[#14532d] outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {['All', 'Available', 'Accepted', 'Pickup Scheduled', 'Collected', 'Distributed'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all shrink-0 ${
                statusFilter === s
                  ? 'bg-[#14532d] text-white border-[#14532d]'
                  : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-stone-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-stone-900">
            All Surplus Food Records ({filtered.length})
          </h2>
          <span className="text-xs text-stone-400">Total Entries: {donations.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fcfbf9] text-stone-500 uppercase tracking-wider text-[11px] border-b border-stone-200">
              <tr>
                <th className="py-3 px-4 font-semibold">ID</th>
                <th className="py-3 px-4 font-semibold">Food Details</th>
                <th className="py-3 px-4 font-semibold">Donor Organization</th>
                <th className="py-3 px-4 font-semibold">Servings</th>
                <th className="py-3 px-4 font-semibold">Current Status</th>
                <th className="py-3 px-4 font-semibold">Update Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-stone-800">
                    {item.id}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-stone-900">{item.foodName}</p>
                    <p className="text-[11px] text-stone-500">{item.foodType} · {item.quantity}</p>
                  </td>
                  <td className="py-3 px-4 text-stone-700">
                    <p className="font-medium">{item.donorOrg}</p>
                    <p className="text-[11px] text-stone-400">{item.location}</p>
                  </td>
                  <td className="py-3 px-4 font-mono text-stone-800">
                    {item.servings}
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
                  <td className="py-3 px-4">
                    <select
                      value={item.status}
                      onChange={(e) => updateStatus(item.id, e.target.value as DonationStatus)}
                      className="text-xs py-1 px-2 border border-stone-300 rounded-md bg-stone-50 focus:border-[#14532d] outline-none"
                    >
                      {statuses.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right space-x-1.5">
                    <button
                      onClick={() => openDonationDetails(item.id)}
                      className="px-2 py-1 text-xs font-semibold text-[#14532d] hover:bg-emerald-50 rounded-md transition-colors"
                    >
                      Inspect
                    </button>
                    <button
                      onClick={() => navigateTo('track', item.id)}
                      className="px-2 py-1 text-xs font-semibold text-stone-700 hover:bg-stone-100 rounded-md transition-colors"
                    >
                      Timeline
                    </button>
                    <button
                      onClick={() => deleteDonation(item.id)}
                      className="text-stone-400 hover:text-red-700 p-1 rounded transition-colors inline-block"
                      title="Delete record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
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
