import React from 'react'
import ShimmerCard from './ShimmerCard'
import AnimeCard from './AnimeCard'

const searchAnime = React.memo(({searchResult , searchloading}) => {
  return (
    <div className="p-4 text-white">
      <p className="text-2xl text-gradient font-bold mb-6 animate-slide-in-left">Search Results</p>
      {searchloading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <ShimmerCard type="grid" count={10} />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {searchResult.map((anime, index) => (
            <AnimeCard key={anime.id} anime={anime} index={index} />
          ))}
        </div>
      )}
    </div>
  );
});

export default searchAnime;