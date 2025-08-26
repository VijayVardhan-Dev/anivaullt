import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ShimmerCard from '../components/ShimmerCard';
import RatingCard from '../components/RatingCard';

const VideoWatch = () => {
  const { id, episode = 1 } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentEpisode, setCurrentEpisode] = useState(parseInt(episode));

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        setLoading(true);
        // Fetch anime data from AniList
        const query = `
          query ($id: Int) {
            Media(id: $id, type: ANIME) {
              id
              title {
                romaji
                english
              }
              coverImage {
                large
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

  const generateEmbedUrl = (animeTitle, episodeNumber) => {
    const cleanTitle = animeTitle
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    return `https://2anime.xyz/embed/${cleanTitle}-episode-${episodeNumber}`;
  };

  const changeEpisode = (episodeNumber) => {
    if (episodeNumber >= 1 && episodeNumber <= (anime?.episodes || 1)) {
      setCurrentEpisode(episodeNumber);
      navigate(`/watch/${id}/${episodeNumber}`);
    }
  };

  const handleBack = () => {
    navigate(`/anime/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900">
        <ShimmerCard type="details" />
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Anime not found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const videoUrl = generateEmbedUrl(anime.title?.english || anime.title?.romaji, currentEpisode);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center text-white hover:text-blue-400 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Details
            </button>
            
            <div className="text-center">
              <h1 className="text-white font-bold text-lg">
                {anime.title?.english || anime.title?.romaji}
              </h1>
              <p className="text-gray-300 text-sm">Episode {currentEpisode}</p>
            </div>
            
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Video Player */}
      <div className="container mx-auto px-4 py-6">
        <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          {/* Video Container with Glass Effect */}
          <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-black">
            <iframe
              src={videoUrl}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title={`${anime.title?.english || anime.title?.romaji} Episode ${currentEpisode}`}
            />
            
            {/* Overlay with Glass Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
            
            {/* Video Controls Overlay - Removed episode info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/20 to-transparent p-6 pointer-events-none">
              {/* Overlay removed - clean video player */}
            </div>
          </div>
        </div>

        {/* Episode Navigation */}
        {anime.episodes && anime.episodes > 1 && (
          <div className="mt-6 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-white font-semibold mb-4 text-xl flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Episodes
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {Array.from({ length: anime.episodes }, (_, i) => i + 1).map((ep) => (
                <button
                  key={ep}
                  onClick={() => changeEpisode(ep)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    ep === currentEpisode
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/10 hover:border-white/20'
                  }`}
                >
                  {ep}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Anime Info */}
        <div className="mt-6 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <img
                src={anime.coverImage?.large}
                alt={anime.title?.english || anime.title?.romaji}
                className="w-28 h-36 object-cover rounded-xl shadow-lg"
              />
              <div className="absolute -top-2 -right-2">
                <RatingCard rating={anime.averageScore} size="md" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-white text-2xl font-bold mb-3">
                {anime.title?.english || anime.title?.romaji}
              </h2>
              <p className="text-gray-300 text-base mb-4 line-clamp-3 leading-relaxed">
                {anime.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {anime.genres?.map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm text-white text-xs rounded-full border border-purple-500/30"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                {anime.episodes && (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    {anime.episodes} Episodes
                  </span>
                )}
                {anime.duration && (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    {anime.duration} min
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoWatch;
