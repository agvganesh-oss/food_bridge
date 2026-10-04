import React, { createContext, useContext, useState, useEffect } from 'react';
import { Donation, DonationStatus, User, UserRole } from '../types';
import { INITIAL_DONATIONS, INITIAL_USERS } from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  donations: Donation[];
  users: User[];
  activePage: string;
  selectedDonationId: string | null;
  notification: string | null;
  navigateTo: (page: string, donationId?: string) => void;
  openDonationDetails: (id: string) => void;
  closeDonationDetails: () => void;
  loginAs: (role: UserRole, customEmail?: string, customOrg?: string) => void;
  logout: () => void;
  postDonation: (newDonation: Omit<Donation, 'id' | 'status' | 'createdAt' | 'trackingHistory'>) => string;
  acceptDonation: (id: string) => boolean;
  updateStatus: (id: string, newStatus: DonationStatus, note?: string) => void;
  deleteDonation: (id: string) => void;
  addUser: (user: Omit<User, 'id' | 'joinedAt'>) => void;
  deleteUser: (id: string) => void;
  resetDemoData: () => void;
  clearNotification: () => void;
}

const STORAGE_KEY_DONATIONS = 'foodbridge_donations_v2';
const STORAGE_KEY_USERS = 'foodbridge_users_v2';
const STORAGE_KEY_CURRENT_USER = 'foodbridge_auth_user_v2';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Start with null to strictly fulfill: "The login portal must be the very first screen when the website opens."
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY_CURRENT_USER);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback to null
    }
    return null;
  });

  const [donations, setDonations] = useState<Donation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DONATIONS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_DONATIONS;
  });

  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_USERS;
  });

  const [activePage, setActivePage] = useState<string>('dashboard');
  const [selectedDonationId, setSelectedDonationId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Sync donations
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DONATIONS, JSON.stringify(donations));
    } catch (e) {
      console.error(e);
    }
  }, [donations]);

  // Sync users
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
    } catch (e) {
      console.error(e);
    }
  }, [users]);

  // Sync current user to session storage
  useEffect(() => {
    try {
      if (currentUser) {
        sessionStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(currentUser));
      } else {
        sessionStorage.removeItem(STORAGE_KEY_CURRENT_USER);
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 4500);
  };

  const clearNotification = () => setNotification(null);

  const navigateTo = (page: string, donationId?: string) => {
    setActivePage(page);
    if (donationId !== undefined) {
      setSelectedDonationId(donationId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDonationDetails = (id: string) => {
    setSelectedDonationId(id);
  };

  const closeDonationDetails = () => {
    setSelectedDonationId(null);
  };

  const loginAs = (role: UserRole, customEmail?: string, customOrg?: string) => {
    // Find matching default or create custom
    const match = users.find((u) => u.role === role);
    let loggedUser: User;

    if (customEmail) {
      loggedUser = {
        id: `USR-${Date.now().toString().slice(-4)}`,
        name: customEmail.split('@')[0],
        email: customEmail,
        role,
        organization: customOrg || (role === 'donor' ? 'Green Leaf Restaurant' : role === 'ngo' ? 'Community Care Foundation' : 'DPTL Academic Cell'),
        phone: '+91 98765 00000',
        location: 'Visakhapatnam',
        joinedAt: 'Today',
        status: 'Active'
      };
    } else if (match) {
      loggedUser = match;
    } else {
      loggedUser = INITIAL_USERS[0];
    }

    setCurrentUser(loggedUser);
    
    // Redirect to appropriate dashboard based on role:
    if (role === 'donor') {
      setActivePage('donor-dashboard');
    } else if (role === 'ngo') {
      setActivePage('ngo-dashboard');
    } else if (role === 'admin') {
      setActivePage('admin-dashboard');
    }

    showNotification(`Logged in successfully as ${loggedUser.name} (${loggedUser.role.toUpperCase()})`);
  };

  const logout = () => {
    setCurrentUser(null);
    setActivePage('dashboard');
    setSelectedDonationId(null);
    showNotification('Logged out successfully. Returned to login portal.');
  };

  const postDonation = (data: Omit<Donation, 'id' | 'status' | 'createdAt' | 'trackingHistory'>): string => {
    const nextNum = donations.length + 1;
    const newId = `FB-${String(nextNum).padStart(3, '0')}`;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newEntry: Donation = {
      ...data,
      id: newId,
      status: 'Available',
      createdAt: `Today, ${nowTime}`,
      trackingHistory: [
        {
          status: 'Available',
          timestamp: `Today, ${nowTime}`,
          actor: data.donorOrg || currentUser?.organization || 'Green Leaf Restaurant',
          note: 'Surplus food posted and ready for collection.'
        }
      ]
    };

    setDonations((prev) => [newEntry, ...prev]);
    showNotification(`Donation ${newId} posted successfully!`);
    return newId;
  };

  const acceptDonation = (id: string): boolean => {
    const target = donations.find((d) => d.id === id);
    if (!target) return false;
    if (target.status !== 'Available') {
      showNotification(`Donation ${id} has already been accepted.`);
      return false;
    }

    const ngoName = currentUser?.organization || 'Community Care Foundation';
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setDonations((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          return {
            ...d,
            status: 'Accepted',
            acceptedByOrg: ngoName,
            acceptedAt: `Today, ${nowTime}`,
            trackingHistory: [
              ...d.trackingHistory,
              {
                status: 'Accepted',
                timestamp: `Today, ${nowTime}`,
                actor: ngoName,
                note: `Accepted by ${currentUser?.name || 'NGO Representative'} (${ngoName}) for distribution.`
              }
            ]
          };
        }
        return d;
      })
    );

    showNotification(`Donation ${id} accepted! Status updated to Accepted.`);
    return true;
  };

  const updateStatus = (id: string, newStatus: DonationStatus, note?: string) => {
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const actorName = currentUser?.organization || currentUser?.name || 'Authorized Volunteer';

    setDonations((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const autoNotes: Record<DonationStatus, string> = {
            'Available': 'Surplus food listed for pickup.',
            'Accepted': `Claimed by ${actorName}.`,
            'Pickup Scheduled': 'Transport vehicle and pickup window scheduled.',
            'Collected': 'Food verified and collected from donor location.',
            'Distributed': 'Food distributed to beneficiaries. Zero Hunger achieved!'
          };

          return {
            ...d,
            status: newStatus,
            trackingHistory: [
              ...d.trackingHistory,
              {
                status: newStatus,
                timestamp: `Today, ${nowTime}`,
                actor: actorName,
                note: note || autoNotes[newStatus]
              }
            ]
          };
        }
        return d;
      })
    );

    showNotification(`Donation ${id} status updated to "${newStatus}"`);
  };

  const deleteDonation = (id: string) => {
    setDonations((prev) => prev.filter((d) => d.id !== id));
    showNotification(`Donation ${id} removed from system.`);
  };

  const addUser = (userData: Omit<User, 'id' | 'joinedAt'>) => {
    const newUser: User = {
      ...userData,
      id: `USR-${String(users.length + 1).padStart(3, '0')}`,
      joinedAt: 'Today',
      status: 'Active'
    };
    setUsers((prev) => [...prev, newUser]);
    showNotification(`User ${newUser.name} added successfully.`);
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    showNotification(`User account removed.`);
  };

  const resetDemoData = () => {
    setDonations(INITIAL_DONATIONS);
    setUsers(INITIAL_USERS);
    localStorage.removeItem(STORAGE_KEY_DONATIONS);
    localStorage.removeItem(STORAGE_KEY_USERS);
    sessionStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    showNotification('Reset all demo data to default.');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        donations,
        users,
        activePage,
        selectedDonationId,
        notification,
        navigateTo,
        openDonationDetails,
        closeDonationDetails,
        loginAs,
        logout,
        postDonation,
        acceptDonation,
        updateStatus,
        deleteDonation,
        addUser,
        deleteUser,
        resetDemoData,
        clearNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
