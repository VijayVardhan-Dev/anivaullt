import React from 'react';

const ShimmerCard = ({ type = 'default', count = 1 }) => {
  const renderShimmer = () => {
    switch (type) {
      case 'hero':
        return (
          <div className="w-full h-[350px] md:h-[400px] lg:h-[500px] bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-pulse rounded-lg">
            <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
          </div>
        );
      
      case 'card':
        return (
          <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden animate-pulse">
            <div className="w-full h-48 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer rounded"></div>
              <div className="h-3 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer rounded w-3/4"></div>
              <div className="h-3 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer rounded w-1/2"></div>
            </div>
          </div>
        );
      
      case 'details':
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 animate-pulse">
            <div className="w-full h-96 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer"></div>
            <div className="container mx-auto px-4 py-8 space-y-6">
              <div className="h-8 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer rounded w-1/3"></div>
              <div className="h-4 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer rounded w-2/3"></div>
              <div className="h-4 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer rounded w-1/2"></div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer rounded mb-2"></div>
            <div className="h-3 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer rounded w-2/3"></div>
          </div>
        );
    }
  };

  if (count === 1) {
    return renderShimmer();
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {renderShimmer()}
        </div>
      ))}
    </div>
  );
};

export default ShimmerCard;
