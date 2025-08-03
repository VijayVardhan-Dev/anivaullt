// src/components/TrendAnime.js

import React from 'react';
import '../index.css'; 

const TrendAnime = ({ TrendanimeList ,trendloading}) => {
  // Fallback to an empty array to prevent errors if TrendanimeList is not provided
  const list = TrendanimeList || [];

  return (
    // Use the "trending" class from your CSS file to style this whole section
    
    <div className="trending ">
      <h2 className="pl-4 text-gradient">Trending</h2>
      
      {/* The <ul> automatically gets styled by the ".trending ul" rule in your CSS */}
      {trendloading ? ( <div className='text-white'>Loading...</div>):(
              <ul className = "scrollbar-hide">
        {list.map((anime, index) => (
          // The <li> now contains the large number and the image
          <li key={anime.id}>
            {/* 1. THE BIG NUMBER */}
            {/* We use the index from .map() to get the number (index + 1) */}
            <p className="fancy-text">{index + 1}</p>

            {/* 2. THE ANIME POSTER */}
            {/* The styling for this image is now fully controlled by your CSS file */}
            <img
              src={anime.coverImage?.large}
              alt={anime.title?.romaji}
              
            />
            
          </li>
        ))}
      </ul>
      ) }

    </div>
  );
};

export default TrendAnime;