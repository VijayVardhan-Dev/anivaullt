
import React from 'react'
import ShimmerCard from './ShimmerCard'
import AnimeCard from './AnimeCard'

const FavourAnime= React.memo(({FavouranimeList , favorloading}) => {
  return (
     <div className="p-4 text-white">
      <p className="text-2xl text-gradient font-bold mb-6 animate-slide-in-left">Favourites</p>
      {favorloading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <ShimmerCard type="grid" count={10} />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {FavouranimeList.map((anime, index) => (
            <AnimeCard key={anime.id} anime={anime} index={index} />
          ))}
        </div>
      )}
    </div>
  );
});

export default FavourAnime;