import React from 'react';

interface SeatTooltipProps {
  name: string;
  email: string;
}

export default function SeatTooltip({ name, email }: SeatTooltipProps) {
  return (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
      <div>{name}</div>
      <div className="text-gray-300 text-xs">{email}</div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-4 border-transparent border-t-gray-900"></div>
    </div>
  );
}