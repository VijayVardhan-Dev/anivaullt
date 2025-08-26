import React from 'react';

const RatingCard = ({ rating, size = 'sm' }) => {
  if (!rating) return null;

  const getRatingColor = (score) => {
    if (score >= 90) return 'from-green-400 to-emerald-500';
    if (score >= 80) return 'from-blue-400 to-cyan-500';
    if (score >= 70) return 'from-yellow-400 to-orange-500';
    if (score >= 60) return 'from-orange-400 to-red-500';
    return 'from-red-400 to-pink-500';
  };

  const getSizeClasses = (size) => {
    switch (size) {
      case 'lg':
        return 'px-3 py-1 text-sm';
      case 'md':
        return 'px-2 py-1 text-xs';
      default:
        return 'px-2 py-0.5 text-xs';
    }
  };

  return (
    <div className={`inline-flex items-center bg-gradient-to-r ${getRatingColor(rating)} text-white font-bold rounded-full ${getSizeClasses(size)} shadow-lg`}>
      <span className="mr-1">★</span>
      {rating}
    </div>
  );
};

export default RatingCard;
