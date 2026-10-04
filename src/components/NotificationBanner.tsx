import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, X } from 'lucide-react';

export const NotificationBanner: React.FC = () => {
  const { notification, clearNotification } = useApp();

  if (!notification) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 max-w-md animate-fade-in">
      <div className="bg-stone-900 text-white px-4 py-3 rounded-xl shadow-xl border border-stone-700 flex items-center gap-3">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        <p className="text-xs text-stone-200 font-medium leading-snug flex-1">{notification}</p>
        <button
          onClick={clearNotification}
          className="text-stone-400 hover:text-white p-1 rounded-md transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
