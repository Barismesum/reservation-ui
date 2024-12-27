"use client"
import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const isSuccess = message.includes('başarı');

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
        isSuccess ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
      }`}>
        {isSuccess ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <AlertCircle className="w-5 h-5" />
        )}
        <span>{message}</span>
        <button
          onClick={onClose}
          className={`ml-2 ${
            isSuccess ? 'text-green-600 hover:text-green-800' : 'text-red-600 hover:text-red-800'
          }`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}