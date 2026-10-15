import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, Heart, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(({ id, message, type }) => {
        let Icon = CheckCircle2;
        let toastClass = 'toast-success';

        if (type === 'error') {
          Icon = AlertCircle;
          toastClass = 'toast-error';
        } else if (type === 'info') {
          Icon = Info;
          toastClass = 'toast-info';
        } else if (type === 'love') {
          Icon = Heart;
          toastClass = 'toast-love';
        }

        return (
          <div key={id} className={`toast-card ${toastClass}`}>
            <Icon size={18} className="toast-icon" />
            <span className="toast-message">{message}</span>
            <button
              onClick={() => removeToast(id)}
              className="toast-close"
              aria-label="Закрыть"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

