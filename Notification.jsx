import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

let _notifyId = 0;

export function useNotification() {
  const [notifications, setNotifications] = useState([]);

  const notify = (message, type = 'success') => {
    const id = ++_notifyId;
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const remove = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return { notifications, notify, remove };
}

export function NotificationStack({ notifications, onRemove }) {
  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2">
      {notifications.map(n => (
        <div
          key={n.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border backdrop-blur-sm animate-slide-in-left
            ${n.type === 'success' ? 'bg-cream border-muted-green/30 text-deep-green' : 'bg-cream border-accent-gold/30 text-dark-brown'}`}
        >
          {n.type === 'success'
            ? <CheckCircle className="w-5 h-5 text-muted-green shrink-0" />
            : <AlertCircle className="w-5 h-5 text-accent-gold shrink-0" />
          }
          <span className="text-sm font-medium">{n.message}</span>
          <button onClick={() => onRemove(n.id)} className="ml-2 text-muted-green hover:text-dark-brown">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
