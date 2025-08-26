import React from 'react';

const ShimmerCard = ({ type = 'default', count = 1 }) => {
  const cards = Array.from({ length: count }, (_, index) => index);

  const renderCard = () => {
    switch (type) {
      case 'hero':
        return (
          <div className="relative h-[350px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden bg-gray-800">
            <div className="absolute inset-0 shimmer-bg"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                <div className="w-48 h-72 bg-gray-700 rounded-lg shimmer-pulse"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-8 bg-gray-700 rounded shimmer-pulse w-3/4"></div>
                  <div className="flex gap-4">
                    <div className="h-4 bg-gray-700 rounded shimmer-pulse w-16"></div>
                    <div className="h-4 bg-gray-700 rounded shimmer-pulse w-20"></div>
                    <div className="h-4 bg-gray-700 rounded shimmer-pulse w-16"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-700 rounded-full shimmer-pulse w-16"></div>
                    <div className="h-6 bg-gray-700 rounded-full shimmer-pulse w-20"></div>
                    <div className="h-6 bg-gray-700 rounded-full shimmer-pulse w-14"></div>
                  </div>
                  <div className="h-12 bg-gray-700 rounded shimmer-pulse w-32"></div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'trending':
        return (
          <div className="min-w-[230px] flex flex-row items-center">
            <div className="fancy-text mt-[22px] text-nowrap shimmer-pulse bg-gray-700 w-16 h-20 rounded"></div>
            <div className="w-[127px] h-[163px] bg-gray-700 rounded-lg shimmer-pulse ml-4"></div>
          </div>
        );
      
      case 'grid':
        return (
          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 shadow-xl">
            <div className="relative overflow-hidden">
              <div className="w-full h-64 bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded shimmer-pulse"></div>
              
              {/* Shimmer badges */}
              <div className="absolute top-3 right-3 w-12 h-6 bg-gray-600/50 rounded shimmer-pulse"></div>
              <div className="absolute top-3 left-3 w-16 h-6 bg-gray-600/50 rounded shimmer-pulse"></div>
            </div>
            
            <div className="p-4">
              <div className="h-4 bg-gray-700/50 rounded shimmer-pulse w-3/4 mb-2"></div>
              <div className="flex gap-1 mb-2">
                <div className="w-12 h-5 bg-gray-700/50 rounded-full shimmer-pulse"></div>
                <div className="w-16 h-5 bg-gray-700/50 rounded-full shimmer-pulse"></div>
              </div>
              <div className="flex justify-between">
                <div className="w-8 h-3 bg-gray-700/50 rounded shimmer-pulse"></div>
                <div className="w-16 h-3 bg-gray-700/50 rounded shimmer-pulse"></div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-3 rounded shadow-md bg-gray-800">
            <div className="w-full h-48 bg-gray-700 rounded mb-2 shimmer-pulse"></div>
            <div className="h-6 bg-gray-700 rounded shimmer-pulse w-3/4"></div>
          </div>
        );
    }
  };

  return (
    <>
      {cards.map((_, index) => (
        <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          {renderCard()}
        </div>
      ))}
    </>
  );
};

export default ShimmerCard;
