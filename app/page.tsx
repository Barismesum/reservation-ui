"use client"
import React, { useState } from 'react';
import AirplaneSeatMap from './components/AirplaneSeatMap';
import PassengerForm from './components/PassengerForm';
import InactivityWarning from './components/InactivityWarning';
import { usePersistedState } from './hooks/usePersistedState';
import { useInactivityWarning } from './hooks/useInactivityWarning';
import { useToast } from './hooks/useToast';
import type { PassengerFormData } from './types/passenger';
import Toast from './components/Toast';

const emptyFormData: PassengerFormData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  gender: '',
  birthDate: ''
};

function App() {
  const [selectedSeats, setSelectedSeats] = usePersistedState<string[]>('selectedSeats', []);
  const [openPassenger, setOpenPassenger] = usePersistedState<number>('openPassenger', 1);
  const { showWarning, handleContinue, startMonitoring } = useInactivityWarning();
  const { isVisible, message, showToast, hideToast } = useToast();
  
  const [passengerForms, setPassengerForms] = useState<Record<string, PassengerFormData>>({});
  const [formErrors, setFormErrors] = useState<Record<string, Record<string, string>>>({});

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeats(prev => {
      const newSeats = prev.includes(seatId)
        ? prev.filter(id => id !== seatId)
        : prev.length < 3 ? [...prev, seatId] : prev;
      
      if (newSeats.length > 0) {
        startMonitoring();
      }
      
      return newSeats;
    });
  };

  const validateForm = (data: PassengerFormData) => {
    const errors: Record<string, string> = {};
    
    if (!data.firstName?.trim()) errors.firstName = 'İsim alanı zorunludur';
    if (!data.lastName?.trim()) errors.lastName = 'Soyisim alanı zorunludur';
    if (!data.phone?.trim()) {
      errors.phone = 'Telefon alanı zorunludur';
    } else if (!/^[0-9]{10}$/.test(data.phone.replace(/\D/g, ''))) {
      errors.phone = 'Geçerli bir telefon numarası giriniz';
    }
    if (!data.email?.trim()) {
      errors.email = 'E-posta alanı zorunludur';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Geçerli bir e-posta adresi giriniz';
    }
    if (!data.gender) errors.gender = 'Cinsiyet seçimi zorunludur';
    if (!data.birthDate) errors.birthDate = 'Doğum tarihi zorunludur';
    
    return errors;
  };

  const handleFormChange = (seatId: string, data: PassengerFormData) => {
    setPassengerForms(prev => ({
      ...prev,
      [seatId]: data
    }));
  };

  const handleCompleteReservation = () => {
    const allErrors: Record<string, Record<string, string>> = {};
    let hasErrors = false;

    selectedSeats.forEach(seatId => {
      const formData = passengerForms[seatId] || emptyFormData;
      const errors = validateForm(formData);
      
      if (Object.keys(errors).length > 0) {
        hasErrors = true;
        allErrors[seatId] = errors;
      }
    });

    setFormErrors(allErrors);

    if (hasErrors) {
      showToast('Lütfen tüm alanları doğru şekilde doldurunuz.');
      return;
    }

    showToast('Rezervasyon işleminiz başarıyla tamamlanmıştır!');
    setTimeout(() => {
      setSelectedSeats([]);
      setPassengerForms({});
      setFormErrors({});
    }, 2000);
  };

  return (
    <>
      {showWarning && <InactivityWarning onContinue={handleContinue} />}
      {isVisible && <Toast message={message} onClose={hideToast} />}
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-6">Koltuk Seçimi</h2>
                <AirplaneSeatMap
                  selectedSeats={selectedSeats}
                  onSeatSelect={handleSeatSelect}
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-6">Yolcu Bilgileri</h2>
                {selectedSeats.length > 0 ? (
                  selectedSeats.map((seat, index) => (
                    <PassengerForm
                      key={seat}
                      passengerNumber={index + 1}
                      seatNumber={seat}
                      isOpen={openPassenger === index + 1}
                      onToggle={() => setOpenPassenger(index + 1)}
                      onChange={(data) => handleFormChange(seat, data)}
                      formData={passengerForms[seat] || emptyFormData}
                      errors={formErrors[seat] || {}}
                    />
                  ))
                ) : (
                  <div className="text-gray-500 text-center py-8 bg-gray-50 rounded-lg">
                    Lütfen koltuk seçimi yapınız
                  </div>
                )}
                
                {selectedSeats.length > 0 && (
                  <div className="mt-6">
                    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
                      <div>
                        <span className="text-sm text-gray-600">
                          {selectedSeats.length} koltuk x 1,000 TL
                        </span>
                        <p className="text-xl font-bold">
                          {selectedSeats.length * 1000} TL
                        </p>
                      </div>
                      <button
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        onClick={handleCompleteReservation}
                      >
                        İşlemleri Tamamla
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;