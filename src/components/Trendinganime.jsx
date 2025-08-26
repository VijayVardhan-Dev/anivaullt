import React from 'react';
import ShimmerCard from './ShimmerCard';
import AnimeCard from './AnimeCard';

const TrendAnime = ({ TrendanimeList, trendloading }) => {
  const list = TrendanimeList || [];

  return (
    <div className="trending">
      <h2 className="pl-4 text-gradient">Trending</h2>
      
      {trendloading ? (
        <ShimmerCard type="card" count={10} />
      ) : (
        <ul className="scrollbar-hide">
          {list.map((anime, index) => (
            <li key={anime.id}>
              <p className="fancy-text">{index + 1}</p>
              <img
                src={anime.coverImage?.large}
                alt={anime.title?.romaji}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrendAnime;