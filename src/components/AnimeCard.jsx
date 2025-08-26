import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Star } from 'lucide-react';

const AnimeCard = ({ anime, index, showRating = true }) => {
  const navigate = useNavigate();

  const getRatingColor = (score) => {
    if (score >= 8) return 'bg-gradient-to-r from-green-500 to-emerald-600';
    if (score >= 7) return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    if (score >= 6) return 'bg-gradient-to-r from-orange-500 to-red-500';
    return 'bg-gradient-to-r from-red-500 to-pink-600';
  };

  const score = anime.averageScore ? anime.averageScore / 10 : null;

  return (
    <div 
      className="group relative overflow-hidden rounded-xl hover-lift cursor-pointer animate-fade-in bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 shadow-xl" 
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => navigate(`/anime/${anime.id}`)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={anime.coverImage?.large}
          alt={anime.title?.english || anime.title?.romaji}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
            <Play size={24} className="text-white" fill="white" />
          </div>
        </div>

        {/* Rating Badge */}
        {showRating && score && (
          <div className={`absolute top-3 right-3 ${getRatingColor(score)} text-white rounded-lg shadow-lg backdrop-blur-sm border border-white/20 flex items-center gap-1 px-2 py-1 text-xs font-bold`}>
            <Star size={12} className="fill-current" />
            <span>{score.toFixed(1)}</span>
          </div>
        )}

        {/* Episode Count Badge */}
        {anime.episodes && (
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white rounded-lg px-2 py-1 text-xs font-semibold border border-white/20">
            {anime.episodes} EP
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-sm line-clamp-2 mb-2 group-hover:text-blue-300 transition-colors duration-300">
          {anime.title?.english || anime.title?.romaji}
        </h3>
        
        {/* Genres */}
        {anime.genres && anime.genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {anime.genres.slice(0, 2).map((genre, idx) => (
              <span 
                key={idx} 
                className="bg-white/10 backdrop-blur-sm text-white/80 text-xs px-2 py-1 rounded-full border border-white/20"
              >
                {genre}
              </span>
            ))}
          </div>
        )}

        {/* Rating and Episodes Row */}
        <div className="flex items-center justify-between text-xs text-white/70">
          <div className="flex items-center gap-1">
            {score && (
              <>
                <Star size={12} className="text-yellow-400" />
                <span>{score.toFixed(1)}</span>
              </>
            )}
          </div>
          {anime.episodes && (
            <span>{anime.episodes} Episodes</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
