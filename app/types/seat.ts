export type SeatStatus = 'available' | 'selected' | 'occupied';

export interface Seat {
  id: string;
  status: SeatStatus;
  occupiedBy?: {
    name: string;
    email: string;
  };
}