import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAnimeById } from '../api/aniList';
import { Play, ArrowLeft, Star, Calendar, Clock, Users } from 'lucide-react';
import RatingCard from '../components/RatingCard';

const AnimeDetails = () => {
  const { animeId } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        setLoading(true);
        const animeData = await getAnimeById(animeId);
        if (animeData) {
          setAnime(animeData);
        } else {
          setError('Anime not found');
        }
      } catch (err) {
        console.error('Error fetching anime details:', err);
        setError('Failed to load anime details');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [animeId]);

  const handleWatchNow = () => {
    navigate(`/watch/${animeId}/1`);
  };

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center animate-bounce-in">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading anime details...</p>
        </div>
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="mb-4">{error || 'Anime not found'}</p>
          <button
            onClick={handleBack}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 z-20 bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-xl text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 button-press hover-glow flex items-center space-x-2 animate-slide-in-left border border-white/20"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      {/* Hero Section */}
      <div className="relative h-96 lg:h-[500px]">
        {/* Banner Image */}
        {anime.bannerImage && (
          <img
            src={anime.bannerImage}
            alt={anime.title?.english || anime.title?.romaji}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Cover Image */}
            <div className="relative">
              <img
                src={anime.coverImage?.large}
                alt={anime.title?.english || anime.title?.romaji}
                className="w-48 h-72 object-cover rounded-lg shadow-lg"
              />
              <RatingCard rating={anime.averageScore} size="lg" />
            </div>
            
            {/* Info */}
            <div className="flex-1 text-white">
              <h1 className="text-2xl lg:text-4xl font-bold mb-4 line-clamp-2 animate-fade-in">
                {anime.title?.english || anime.title?.romaji}
              </h1>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-4 mb-4 text-sm">
                {anime.averageScore && (
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400" size={16} />
                    <span>{anime.averageScore / 10}/10</span>
                  </div>
                )}
                
                {anime.episodes && (
                  <div className="flex items-center space-x-1">
                    <Play size={16} />
                    <span>{anime.episodes} Episodes</span>
                  </div>
                )}
                
                {anime.duration && (
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>{anime.duration} min</span>
                  </div>
                )}
                
                {anime.status && (
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span className="capitalize">{anime.status.toLowerCase()}</span>
                  </div>
                )}
              </div>
              
              {/* Genres */}
              {anime.genres && anime.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {anime.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Watch Button */}
              <button
                onClick={handleWatchNow}
                className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-bold text-lg flex items-center space-x-2 transition-all duration-300 button-press hover-glow animate-bounce-in shadow-xl border border-white/20"
              >
                <Play size={24} />
                <span>Watch Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Description */}
          {anime.description && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
              <p 
                className="text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: anime.description }}
              />
            </div>
          )}
          
          {/* Studios */}
          {anime.studios && anime.studios.nodes && anime.studios.nodes.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Studios</h2>
              <div className="flex flex-wrap gap-2">
                {anime.studios.nodes.map((studio, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg"
                  >
                    {studio.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4">Information</h3>
              <div className="space-y-3 text-gray-300">
                {anime.episodes && (
                  <div className="flex justify-between">
                    <span>Episodes:</span>
                    <span>{anime.episodes}</span>
                  </div>
                )}
                {anime.duration && (
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{anime.duration} minutes</span>
                  </div>
                )}
                {anime.status && (
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="capitalize">{anime.status.toLowerCase()}</span>
                  </div>
                )}
                {anime.averageScore && (
                  <div className="flex justify-between">
                    <span>Rating:</span>
                    <span>{anime.averageScore / 10}/10</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-xl shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={handleWatchNow}
                  className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white py-3 rounded-full font-bold transition-all duration-300 button-press shadow-lg border border-white/20"
                >
                  Start Watching
                </button>
                <button
                  onClick={() => navigate(`/watch/${animeId}/1`)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-full font-bold transition-all duration-300 button-press shadow-lg border border-white/20"
                >
                  Episode 1
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;
