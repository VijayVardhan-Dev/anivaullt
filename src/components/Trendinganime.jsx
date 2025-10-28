import React from 'react';
import ShimmerCard from './ShimmerCard';
import AnimeCard from './AnimeCard';

const TrendAnime = ({ TrendanimeList, trendloading }) => {
  const list = TrendanimeList || [];

  return (
    <div className="trending px-4 md:px-6">
      <h2 className="pl-0 text-gradient">Trending</h2>
      
      {trendloading ? (
        <ShimmerCard type="card" count={10} />
      ) : (
        <ul className="scrollbar-hide">
          {list.map((anime, index) => (
            <li key={anime.id} className="group">
              <p className="fancy-text transition-all group-hover:scale-105">{index + 1}</p>
              <img
                src={anime.coverImage?.large}
                alt={anime.title?.romaji}
                className="transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-purple-500/50"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrendAnime;