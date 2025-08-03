import React from 'react'

const topAnime = ({TopanimeList,popularloading}) => {
  return (
     <div className="p-4 text-white">
      <p className="text-2xl text-gradient font-bold mb-4">Popular</p>
      {popularloading?(
        <div>Loading...</div>
      ):
      (      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {TopanimeList.map((anime) => (
          <li key={anime.id} className=" p-3 rounded shadow-md">
            <img
              src={anime.coverImage.large}
              alt={anime.title.romaji}
              className="w-full rounded mb-2"
            />
            <h2 className="text-lg font-semibold truncate">{anime.title.english}</h2>
         
          </li>
        ))}
      </ul>)}

    </div>
  )
}

export default topAnime