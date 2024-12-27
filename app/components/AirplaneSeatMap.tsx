import React from 'react';
import { Square } from 'lucide-react';
import { Seat } from '../types/seat';
import { useOccupiedSeats } from '../hooks/useOccupiedSeats';
import { useToast } from '../hooks/useToast';
import SeatTooltip from './SeatToolTip';
import Toast from './Toast';


interface Props {
  selectedSeats: string[];
  onSeatSelect: (seatId: string) => void;
}

export default function AirplaneSeatMap({ selectedSeats, onSeatSelect }: Props) {
  const { occupiedSeatsData, loading } = useOccupiedSeats();
  const { isVisible, message, showToast, hideToast } = useToast();

  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    for (let i = 1; i <= 40; i++) {
      const seatId = i.toString();
      const isOccupied = i <= 10;
      seats.push({
        id: seatId,
        status: isOccupied ? 'occupied' : 'available',
        occupiedBy: isOccupied ? occupiedSeatsData[seatId] : undefined
      });
    }
    return seats;
  };

  const seats = generateSeats();

  const getSeatColor = (seat: Seat): string => {
    if (selectedSeats.includes(seat.id)) return 'text-amber-500';
    if (seat.status === 'occupied') return 'text-black';
    return 'text-gray-600 hover:text-blue-500';
  };

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'occupied') {
      showToast(`${seat.id} numaralı koltuk dolu. Lütfen başka bir koltuk seçin.`);
      return;
    }
    onSeatSelect(seat.id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      {isVisible && (
        <Toast
          message={message}
          onClose={hideToast}
        />
      )}
      
      <div className="relative bg-white rounded-3xl p-8">
        <div className="absolute inset-0 bg-gray-100 rounded-3xl"></div>
        
        <div className="relative grid grid-cols-5 gap-4 py-8">
          {seats.map((seat) => (
            <button
              key={seat.id}
              onClick={() => handleSeatClick(seat)}
              className={`relative group transition-colors duration-200 ${
                seat.status === 'occupied' ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <Square
                className={`w-8 h-8 ${getSeatColor(seat)}`}
                fill={selectedSeats.includes(seat.id) || seat.status === 'occupied' ? 'currentColor' : 'none'}
              />
              <span className="text-xs mt-1 block">{seat.id}</span>
              {seat.status === 'occupied' && seat.occupiedBy && (
                <SeatTooltip 
                  name={seat.occupiedBy.name}
                  email={seat.occupiedBy.email}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-6 flex justify-center gap-6">
        <div className="flex items-center gap-2">
          <Square className="w-4 h-4 text-gray-600" />
          <span className="text-sm">Boş</span>
        </div>
        <div className="flex items-center gap-2">
          <Square className="w-4 h-4 text-amber-500" fill="currentColor" />
          <span className="text-sm">Seçili</span>
        </div>
        <div className="flex items-center gap-2">
          <Square className="w-4 h-4 text-black" fill="currentColor" />
          <span className="text-sm">Dolu</span>
        </div>
      </div>
    </div>
  );
}