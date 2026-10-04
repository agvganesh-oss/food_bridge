import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, UserRole } from '../types';
import { Users, UserPlus, Trash2, Shield, Utensils, HeartHandshake, Search } from 'lucide-react';

export const UserManagementPage: React.FC = () => {
  const { users, addUser, deleteUser } = useApp();

  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New user form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('donor');
  const [newOrg, setNewOrg] = useState('');
  const [newPhone, setNewPhone] = useState('+91 ');
  const [newLocation, setNewLocation] = useState('Visakhapatnam');

  const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.organization.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail || !newOrg) return;

    addUser({
      name: newName,
      email: newEmail,
      role: newRole,
      organization: newOrg,
      phone: newPhone,
      location: newLocation,
      status: 'Active'
    });

    // Reset
    setNewName('');
    setNewEmail('');
    setNewOrg('');
    setShowAddModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="text-xs font-semibold text-[#14532d] uppercase tracking-wider">
            Admin Directory
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-1">
            User Management
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Manage donors, NGOs, volunteer networks, and system administrators.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#14532d] hover:bg-[#166534] rounded-xl transition-all shadow-sm shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Add New User</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, or organization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-lg focus:border-[#14532d] outline-none"
          />
        </div>

        {/* Role Filters */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {['All', 'donor', 'ngo', 'admin'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize border transition-all ${
                roleFilter === r
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
              }`}
            >
              {r === 'All' ? 'All Roles' : r === 'ngo' ? 'NGO / Volunteer' : r}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-stone-200 flex items-center justify-between">
          <h2 className="text-sm font-bold text-stone-900">
            Registered Users ({filteredUsers.length})
          </h2>
          <span className="text-xs text-stone-400">DPTL Authorized Roster</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#fcfbf9] text-stone-500 uppercase tracking-wider text-[11px] border-b border-stone-200">
              <tr>
                <th className="py-3 px-4 font-semibold">User ID</th>
                <th className="py-3 px-4 font-semibold">Name & Email</th>
                <th className="py-3 px-4 font-semibold">Role</th>
                <th className="py-3 px-4 font-semibold">Organization</th>
                <th className="py-3 px-4 font-semibold">Phone / Location</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-stone-700">
                    {u.id}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-stone-900">{u.name}</p>
                    <p className="text-[11px] text-stone-500 font-mono">{u.email}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                        u.role === 'donor'
                          ? 'bg-emerald-50 text-[#14532d] border-emerald-200'
                          : u.role === 'ngo'
                          ? 'bg-orange-50 text-[#ea580c] border-orange-200'
                          : 'bg-stone-100 text-stone-800 border-stone-300'
                      }`}
                    >
                      {u.role === 'donor' && <Utensils className="w-3 h-3" />}
                      {u.role === 'ngo' && <HeartHandshake className="w-3 h-3" />}
                      {u.role === 'admin' && <Shield className="w-3 h-3" />}
                      <span className="capitalize">{u.role === 'ngo' ? 'NGO / Volunteer' : u.role}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-stone-800 font-medium">
                    {u.organization}
                  </td>
                  <td className="py-3 px-4 text-stone-600">
                    <p>{u.phone}</p>
                    <p className="text-[11px] text-stone-400">{u.location || 'Visakhapatnam'}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Active
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {u.role !== 'admin' && (
                      <button
                        onClick={() => deleteUser(u.id)}
                        className="text-stone-400 hover:text-red-700 p-1.5 rounded-md hover:bg-red-50 transition-colors"
                        title="Delete user"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-base font-bold text-stone-900">Add New User</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">User Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Gupta"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg outline-none focus:border-[#14532d]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. rahul@kitchen.in"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg outline-none focus:border-[#14532d]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Role</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg outline-none focus:border-[#14532d] bg-white"
                >
                  <option value="donor">Donor (Restaurant/Caterer)</option>
                  <option value="ngo">NGO / Volunteer</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Organization Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annapurna Meals Trust"
                  value={newOrg}
                  onChange={(e) => setNewOrg(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg outline-none focus:border-[#14532d]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg outline-none focus:border-[#14532d]"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Location / Area</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg outline-none focus:border-[#14532d]"
                />
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-1.5 text-stone-600 hover:bg-stone-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#14532d] hover:bg-[#166534] text-white font-semibold rounded-lg shadow-2xs"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
