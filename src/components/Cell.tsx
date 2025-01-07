import React from 'react';
import { Player } from '../types';

interface CellProps {
  value: Player | null;
  onClick: () => void;
  isClickable: boolean;
}

const Cell: React.FC<CellProps> = ({ value, onClick, isClickable }) => {
  const getColor = () => {
    switch (value) {
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-yellow-500';
      default:
        return 'bg-white hover:bg-gray-200';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={!isClickable}
      className={`w-12 h-12 md:w-16 md:h-16 rounded-full ${getColor()} 
        shadow-inner transition-colors duration-200 
        ${isClickable ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
      aria-label={`Colonne ${value || 'vide'}`}
    />
  );
};

export default Cell;