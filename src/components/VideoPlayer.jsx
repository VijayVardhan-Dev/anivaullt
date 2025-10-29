import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

const VideoPlayer = ({ 
  videoUrl, 
  title, 
  onEpisodeChange, 
  currentEpisode, 
  totalEpisodes,
  onBack 
}) => {
  const [showEpisodeList, setShowEpisodeList] = useState(false);



  const changeEpisode = (episodeNumber) => {
    if (onEpisodeChange && episodeNumber >= 1 && episodeNumber <= totalEpisodes) {
      onEpisodeChange(episodeNumber);
      setShowEpisodeList(false);
    }
  };

  return (
    <div className="relative bg-black w-full h-screen">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-20 bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-xl text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 button-press hover-glow border border-white/20"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back
      </button>

      {/* Video Element */}
      {videoUrl.includes('embed') ? (
        <iframe
          src={videoUrl}
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      ) : (
        <video
          className="w-full h-full object-contain"
          src={videoUrl}
          controls
          autoPlay
        />
      )}

      {/* Episode List Button */}
      <button
        onClick={() => setShowEpisodeList(!showEpisodeList)}
        className="absolute top-4 right-4 z-20 bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-xl text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300 button-press hover-glow border border-white/20"
      >
        Episodes
      </button>

      {/* Episode List */}
      {showEpisodeList && (
        <div className="absolute top-16 right-4 z-20 bg-black/90 backdrop-blur-sm text-white p-4 rounded-lg max-h-96 overflow-y-auto animate-scale-in shadow-2xl border border-gray-700">
          <h3 className="text-lg font-bold mb-3 text-center">Episodes</h3>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: totalEpisodes }, (_, i) => i + 1).map((episode) => (
              <button
                key={episode}
                onClick={() => changeEpisode(episode)}
                className={`p-2 rounded transition-all duration-200 button-press ${
                  episode === currentEpisode 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-gray-700 hover:bg-gray-600 hover:scale-105'
                }`}
              >
                {episode}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
