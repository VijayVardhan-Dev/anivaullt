import React from 'react';
import { useNavigate } from 'react-router-dom';
import RatingCard from './RatingCard';

const AnimeCard = ({ anime }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/anime/${anime.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full"
    >
      <div className="relative overflow-hidden rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 h-full flex flex-col">
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 z-10">
          <RatingCard rating={anime.averageScore} size="sm" />
        </div>
        
        {/* Episode Count Badge */}
        {anime.episodes && (
          <div className="absolute top-2 left-2 z-10 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
            EP {anime.episodes}
          </div>
        )}
        
        {/* Image */}
        <div className="relative overflow-hidden h-48">
          <img
            src={anime.coverImage?.large}
            alt={anime.title?.english || anime.title?.romaji}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 space-y-2 flex-1 flex flex-col">
          <h3 className="font-semibold text-white line-clamp-2 text-sm flex-1">
            {anime.title?.english || anime.title?.romaji}
          </h3>
          
          {/* Genres */}
          {anime.genres && anime.genres.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {anime.genres.slice(0, 2).map((genre, index) => (
                <span 
                  key={index}
                  className="text-xs bg-white/10 backdrop-blur-sm text-gray-300 px-2 py-1 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
          
          {/* Bottom Info */}
          <div className="flex items-center justify-between text-xs text-gray-400 mt-auto">
            <span>{anime.episodes || '?'} Episodes</span>
            <RatingCard rating={anime.averageScore} size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
