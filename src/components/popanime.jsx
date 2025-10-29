import React from 'react';
import ShimmerCard from './ShimmerCard';
import AnimeCard from './AnimeCard';

const topAnime = ({TopanimeList, popularloading}) => {
  return (
    <div className="p-4 text-white">
      <p className="text-2xl text-gradient font-bold mb-4">Popular</p>
      {popularloading ? (
        <ShimmerCard type="card" count={10} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {TopanimeList.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
};

export default topAnime