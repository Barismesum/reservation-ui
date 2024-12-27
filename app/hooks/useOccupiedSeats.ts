"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

export function useOccupiedSeats() {
  const [occupiedSeatsData, setOccupiedSeatsData] = useState<Record<string, { name: string; email: string }>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOccupiedSeatsData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users: User[] = await response.json();
        
        const seatsData: Record<string, { name: string; email: string }> = {};
        users.slice(0, 10).forEach((user, index) => {
          seatsData[(index + 1).toString()] = {
            name: user.name,
            email: user.email
          };
        });
        
        setOccupiedSeatsData(seatsData);
      } catch (err) {
        setError('Failed to fetch occupied seats data');
      } finally {
        setLoading(false);
      }
    };

    fetchOccupiedSeatsData();
  }, []);

  return { occupiedSeatsData, loading, error };
}