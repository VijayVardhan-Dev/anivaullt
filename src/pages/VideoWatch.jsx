import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { generateEmbedUrl } from '../api/animeapi';
import { getAnimeById } from '../api/aniList';

const VideoWatch = () => {
  const { animeId, episode = 1 } = useParams();
  const navigate = useNavigate();
  
  const [animeInfo, setAnimeInfo] = useState(null);
  const [currentEpisode, setCurrentEpisode] = useState(parseInt(episode));
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalEpisodes, setTotalEpisodes] = useState(12); // Default fallback

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        setLoading(true);
        setError('');

        // Get anime info from AniList
        const aniListAnime = await getAnimeById(animeId);
        if (!aniListAnime) {
          throw new Error('Anime not found');
        }
        setAnimeInfo(aniListAnime);

        // Set total episodes from AniList data
        if (aniListAnime.episodes) {
          setTotalEpisodes(aniListAnime.episodes);
        }
        
        // Load first episode
        await loadEpisode(currentEpisode, aniListAnime);
      } catch (err) {
        console.error('Error fetching anime data:', err);
        setError(err.message || 'Failed to load anime');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeData();
  }, [animeId]);

  const loadEpisode = async (episodeNumber, anime) => {
    try {
      setLoading(true);
      
      // Generate embed URL using the correct format
      const title = anime.title?.english || anime.title?.romaji;
      const embedUrl = generateEmbedUrl(title, episodeNumber);
      
      setVideoUrl(embedUrl);
    } catch (err) {
      console.error('Error loading episode:', err);
      setError('Failed to load episode');
    } finally {
      setLoading(false);
    }
  };

  const handleEpisodeChange = async (episodeNumber) => {
    if (animeInfo) {
      setCurrentEpisode(episodeNumber);
      await loadEpisode(episodeNumber, animeInfo);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (loading && !animeInfo) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center animate-bounce-in">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading anime...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="mb-4">{error}</p>
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

  if (!animeInfo) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Anime Not Found</h1>
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
    <div className="min-h-screen bg-black">
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-xl text-white px-6 py-3 rounded-full animate-bounce-in shadow-2xl border border-white/20">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            <span className="text-lg">Loading episode...</span>
          </div>
        </div>
      )}
      
      <VideoPlayer
        videoUrl={videoUrl}
        title={animeInfo.title?.english || animeInfo.title?.romaji}
        onEpisodeChange={handleEpisodeChange}
        currentEpisode={currentEpisode}
        totalEpisodes={totalEpisodes}
        onBack={handleBack}
      />
    </div>
  );
};

export default VideoWatch;
