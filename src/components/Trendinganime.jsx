// src/components/TrendAnime.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import ShimmerCard from './ShimmerCard';
import { Star } from 'lucide-react';
import '../index.css'; 

const TrendAnime = React.memo(({ TrendanimeList ,trendloading}) => {
  const navigate = useNavigate();
  // Fallback to an empty array to prevent errors if TrendanimeList is not provided
  const list = TrendanimeList || [];

  return (
    // Use the "trending" class from your CSS file to style this whole section
    
    <div className="trending">
      <h2 className="pl-4 text-gradient animate-slide-in-left">Trending</h2>
      
      {/* The <ul> automatically gets styled by the ".trending ul" rule in your CSS */}
      {trendloading ? (
        <ul className="scrollbar-hide">
          <ShimmerCard type="trending" count={10} />
        </ul>
      ) : (
        <ul className="scrollbar-hide">
          {list.map((anime, index) => (
            // The <li> now contains the large number and the image
            <li 
              key={anime.id} 
              onClick={() => navigate(`/anime/${anime.id}`)} 
              className="group cursor-pointer hover-lift transition-all duration-300 animate-fade-in rounded-xl p-3"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* 1. THE BIG NUMBER */}
              {/* We use the index from .map() to get the number (index + 1) */}
              <p className="fancy-text group-hover:scale-110 transition-transform duration-300">{index + 1}</p>

              {/* 2. THE ANIME POSTER */}
              {/* The styling for this image is now fully controlled by your CSS file */}
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={anime.coverImage?.large}
                  alt={anime.title?.romaji}
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Episode Count Badge */}
                {anime.episodes && (
                  <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white rounded-lg px-2 py-1 text-xs font-semibold border border-white/20">
                    {anime.episodes} EP
                  </div>
                )}
                
                {/* Rating Badge */}
                {anime.averageScore && (
                  <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg px-2 py-1 text-xs font-bold shadow-lg backdrop-blur-sm border border-white/20 flex items-center gap-1">
                    <Star size={12} className="fill-current" />
                    <span>{(anime.averageScore / 10).toFixed(1)}</span>
                  </div>
                )}
              </div>
              
            </li>
          ))}
        </ul>
      )}

    </div>
  );
});

export default TrendAnime;