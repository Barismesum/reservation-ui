"use client"
import React, { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  onContinue: () => void;
}

export default function InactivityWarning({ onContinue }: Props) {
  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  // Prevent any background interaction while warning is shown
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 animate-slide-in">
        <div className="flex items-start mb-4">
          <AlertTriangle className="w-6 h-6 text-amber-500 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">İşleme devam etmek istiyor musunuz?</h3>
            <p className="text-gray-600 mt-1">
              30 saniye boyunca herhangi bir işlem yapılmadı. 10 saniye içinde yanıt vermezseniz seçimleriniz sıfırlanacak.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Sıfırla
          </button>
          <button
            onClick={onContinue}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Devam Et
          </button>
        </div>
      </div>
    </div>
  );
}