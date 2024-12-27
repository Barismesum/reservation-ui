import React from 'react';
import { ChevronDown } from 'lucide-react';
import type { PassengerFormData } from '../types/passenger';

interface Props {
  passengerNumber: number;
  seatNumber: string;
  isOpen: boolean;
  onToggle: () => void;
  onChange: (data: PassengerFormData) => void;
  formData: PassengerFormData;
  errors: Record<string, string>;
}

export default function PassengerForm({ 
  passengerNumber, 
  seatNumber, 
  isOpen, 
  onToggle,
  onChange,
  formData,
  errors
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value });
  };

  return (
    <div className="bg-gray-100 rounded-lg mb-4">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex justify-between items-center"
      >
        <div>
          <span className="font-medium">{passengerNumber}. Yolcu</span>
          <span className="ml-2 text-sm text-gray-500">Koltuk: {seatNumber}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      
      {isOpen && (
        <div className="px-6 pb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">İsim</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                type="text"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">Soyisim</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                type="text"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">Telefon</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="tel"
                placeholder="5XX XXX XX XX"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">E-Posta</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">Cinsiyet</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.gender ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Seçiniz</option>
                <option value="male">Erkek</option>
                <option value="female">Kadın</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">Doğum Tarihi</label>
              <input
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                type="date"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                  errors.birthDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.birthDate && (
                <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}