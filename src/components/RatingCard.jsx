import React from 'react';
import { Star } from 'lucide-react';

const RatingCard = ({ rating, size = 'sm' }) => {
  if (!rating) return null;

  const score = rating / 10; // Convert from 100 scale to 10 scale
  
  const getRatingColor = (score) => {
    if (score >= 8) return 'bg-green-600';
    if (score >= 7) return 'bg-yellow-600';
    if (score >= 6) return 'bg-orange-600';
    return 'bg-red-600';
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  return (
    <div className={`absolute top-2 right-2 z-10 ${getRatingColor(score)} text-white rounded-lg shadow-lg backdrop-blur-sm border border-white/20 flex items-center gap-1 ${sizeClasses[size]}`}>
      <Star size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} className="fill-current" />
      <span className="font-bold">{score.toFixed(1)}</span>
    </div>
  );
};

export default RatingCard;
