
import React from 'react';
import ShimmerCard from './ShimmerCard';
import AnimeCard from './AnimeCard';

const FavourAnime = ({FavouranimeList, favorloading}) => {
  return (
    <div className="p-4 md:p-6 text-white pb-10">
      <p className="text-2xl md:text-3xl text-gradient font-bold mb-6">Fan Favourites</p>
      {favorloading ? (
        <ShimmerCard type="card" count={10} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {FavouranimeList.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavourAnime