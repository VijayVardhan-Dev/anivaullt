import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Info, Star, Calendar, Clock, Users } from 'lucide-react';
import ShimmerCard from '../components/ShimmerCard';
import RatingCard from '../components/RatingCard';

const AnimeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        setLoading(true);
        const query = `
          query ($id: Int) {
            Media(id: $id, type: ANIME) {
              id
              title {
                romaji
                english
                native
              }
              coverImage {
                large
                extraLarge
              }
              bannerImage
              description
              averageScore
              episodes
              duration
              status
              genres
              studios {
                nodes {
                  name
                }
              }
              startDate {
                year
                month
                day
              }
              endDate {
                year
                month
                day
              }
              season
              seasonYear
              format
              source
              countryOfOrigin
              popularity
              trending
              favourites
              siteUrl
            }
          }
        `;

        const response = await fetch('https://graphql.anilist.co', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: { id: parseInt(id) }
          })
        });

        const data = await response.json();
        if (data.data?.Media) {
          setAnime(data.data.Media);
        }
      } catch (error) {
        console.error('Error fetching anime data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAnimeData();
    }
  }, [id]);

  const handleBack = () => {
    console.log('Back button clicked!');
    try {
      navigate('/');
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to window.location if navigate fails
      window.location.href = '/';
    }
  };

  const handleWatch = () => {
    navigate(`/watch/${id}/1`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
        <ShimmerCard type="details" />
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Anime not found</h1>
          <button
            onClick={handleBack}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (date) => {
    if (!date?.year) return 'Unknown';
    return `${date.year}${date.month ? `/${date.month}` : ''}${date.day ? `/${date.day}` : ''}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900">
      {/* Hero Section with Banner */}
      <div className="relative h-80 lg:h-[400px] overflow-hidden">
        {anime.bannerImage ? (
          <img
            src={anime.bannerImage}
            alt={anime.title?.english || anime.title?.romaji}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-purple-600 to-blue-600"></div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
        
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-6 left-6 bg-black/30 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/50 transition-all duration-300 hover:scale-110 z-20"
          title="Go Back"
          type="button"
        >
          <ArrowLeft size={24} />
        </button>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
          <div className="container mx-auto">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
              {/* Cover Image */}
              <div className="relative flex-shrink-0">
                <img
                  src={anime.coverImage?.extraLarge || anime.coverImage?.large}
                  alt={anime.title?.english || anime.title?.romaji}
                  className="w-20 h-28 sm:w-24 sm:h-36 lg:w-32 lg:h-48 object-cover rounded-xl shadow-2xl border-2 border-white/20"
                />
                <RatingCard rating={anime.averageScore} size="lg" className="absolute -top-2 -right-2" />
              </div>
              
              {/* Title and Info */}
              <div className="flex-1 text-white text-center sm:text-left">
                <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold mb-2 sm:mb-3 [text-shadow:_2px_2px_4px_rgb(0_0_0_/_0.8)]">
                  {anime.title?.english || anime.title?.romaji}
                </h1>
                {anime.title?.native && (
                  <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-2 sm:mb-3 font-medium">
                    {anime.title.native}
                  </p>
                )}
                
                {/* Quick Stats */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                  {anime.episodes && (
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-full">
                      <Play size={14} className="sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm font-medium">{anime.episodes} Episodes</span>
                    </div>
                  )}
                  {anime.duration && (
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-full">
                      <Clock size={14} className="sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm font-medium">{anime.duration} min</span>
                    </div>
                  )}
                  {anime.season && anime.seasonYear && (
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-2 rounded-full">
                      <Calendar size={14} className="sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm font-medium">{anime.season} {anime.seasonYear}</span>
                    </div>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3">
                  <button
                    onClick={handleWatch}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 sm:px-6 py-2 rounded-full font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-2"
                  >
                    <Play size={16} className="sm:w-[18px] sm:h-[18px]" />
                    Watch Now
                  </button>
                  <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 sm:px-6 py-2 rounded-full font-bold text-sm sm:text-base transition-all duration-300 hover:scale-105 border border-white/20 flex items-center gap-2">
                    <Info size={16} className="sm:w-[18px] sm:h-[18px]" />
                    More Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Description */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Description */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                <Info size={20} className="sm:w-6 sm:h-6" />
                Synopsis
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
                {anime.description || 'No description available.'}
              </p>
            </div>

            {/* Genres */}
            {anime.genres && anime.genres.length > 0 && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Genres</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {anime.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm text-white text-sm rounded-full border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 cursor-pointer hover:scale-105"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Studios */}
            {anime.studios?.nodes && anime.studios.nodes.length > 0 && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Studios</h3>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {anime.studios.nodes.map((studio, index) => (
                    <span
                      key={index}
                      className="px-3 sm:px-4 py-1 sm:py-2 bg-white/10 backdrop-blur-sm text-white text-sm rounded-full border border-white/20"
                    >
                      {studio.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Stats */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Statistics</h3>
              <div className="space-y-3 sm:space-y-4">
                {anime.averageScore && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm sm:text-base">Rating</span>
                    <div className="flex items-center gap-2">
                      <Star size={14} className="sm:w-4 sm:h-4 text-yellow-400" />
                      <span className="text-white font-semibold text-sm sm:text-base">{anime.averageScore / 10}</span>
                    </div>
                  </div>
                )}
                
                {anime.episodes && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm sm:text-base">Episodes</span>
                    <span className="text-white font-semibold text-sm sm:text-base">{anime.episodes}</span>
                  </div>
                )}
                
                {anime.duration && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm sm:text-base">Duration</span>
                    <span className="text-white font-semibold text-sm sm:text-base">{anime.duration} min</span>
                  </div>
                )}
                
                {anime.status && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm sm:text-base">Status</span>
                    <span className="text-white font-semibold text-sm sm:text-base capitalize">{anime.status.toLowerCase()}</span>
                  </div>
                )}
                
                {anime.format && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm sm:text-base">Format</span>
                    <span className="text-white font-semibold text-sm sm:text-base capitalize">{anime.format.toLowerCase()}</span>
                  </div>
                )}
                
                {anime.source && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm sm:text-base">Source</span>
                    <span className="text-white font-semibold text-sm sm:text-base capitalize">{anime.source.toLowerCase()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Dates */}
            {(anime.startDate?.year || anime.endDate?.year) && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Release Dates</h3>
                <div className="space-y-2 sm:space-y-3">
                  {anime.startDate?.year && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm sm:text-base">Started</span>
                      <span className="text-white font-semibold text-sm sm:text-base">{formatDate(anime.startDate)}</span>
                    </div>
                  )}
                  {anime.endDate?.year && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm sm:text-base">Ended</span>
                      <span className="text-white font-semibold text-sm sm:text-base">{formatDate(anime.endDate)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Popularity */}
            {anime.popularity && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/10">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Popularity</h3>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm sm:text-base">Rank</span>
                    <span className="text-white font-semibold text-sm sm:text-base">#{anime.popularity}</span>
                  </div>
                  {anime.favourites && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm sm:text-base">Favorites</span>
                      <span className="text-white font-semibold text-sm sm:text-base">{anime.favourites.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;
