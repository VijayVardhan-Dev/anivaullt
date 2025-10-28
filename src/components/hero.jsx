import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShimmerCard from './ShimmerCard';
import '../index.css'; 

const HeroSec = ({ recentanimelist, heroloading }) => {
  const navigate = useNavigate();
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (recentanimelist && recentanimelist.length > 0) {
      const filteredSlides = recentanimelist.filter(anime => !!anime.bannerImage);
      setSlides(filteredSlides);
      setCurrentIndex(0);
    }
  }, [recentanimelist]);

  useEffect(() => {
    if (!isHovering && slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isHovering, slides.length]);

  // Safe guard: if no slides yet or still loading, show shimmer
  if (heroloading || slides.length === 0) {
    return (
      <div className="mt-7">
        <ShimmerCard type="hero" count={1} />
      </div>
    );
  }

  const currentSlide = slides[currentIndex];

  return (
    <div
      className="flex lg:block w-full h-[350px] mt-7 mx-4 md:mx-6 md:h-[400px] lg:h-[500px] lg:slideshow-container lg:relative relative rounded-lg shadow-2xl overflow-hidden border border-white/10"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className='flex-1 lg:hidden'></div>

      {/* SMALL SCREEN layout (cover image) */}
      <div className="slideshow-container relative flex-1 lg:hidden">
        <img
          src={currentSlide.coverImage?.large}
          alt={currentSlide.title?.english || "Anime Cover"}
          className="object-cover w-full h-full"
          key={`${currentSlide.id}-cover`}
        />
      </div>

      {/* LARGE SCREEN layout (banner image) */}
      <div className="hidden lg:block relative w-full h-full">
        <img
          src={currentSlide.bannerImage}
          alt={currentSlide.title?.english || "Anime Banner"}
          className="absolute inset-0 w-full h-full object-cover"
          key={`${currentSlide.id}-banner`}
        />
      </div>
      <div className="hidden lg:block absolute inset-0 bg-black/60 z-0"></div>

      {/* TEXT AND BUTTON */}
      <div className="absolute top-0 left-0 w-1/2 h-full p-4 z-10 
                     flex flex-col justify-center
                     lg:w-full lg:items-center lg:text-center lg:px-8">
        <h2 className="text-2xl md:text-4xl font-bold text-white [text-shadow:_1px_1px_3px_rgb(0_0_0_/_0.7)]">
          {currentSlide.title?.english || currentSlide.title?.romaji}
        </h2>

        <p
          className="text-gray-300 lg:text-gray-200 text-sm md:text-base line-clamp-3 md:line-clamp-4 mt-4 max-w-xl"
          dangerouslySetInnerHTML={{ __html: currentSlide.description || "No description available." }}
        />

        <div className="text-sm text-gray-400 lg:text-gray-300 mt-4 font-semibold">
          Average Score: {currentSlide.averageScore ?? 'N/A'}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button 
            onClick={() => navigate(`/watch/${currentSlide.id}/1`)}
            className="text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-full px-6 py-3 transition-all duration-300 cursor-pointer font-bold button-press hover-glow shadow-lg hover:shadow-red-500/50"
          >
            ▶ Watch Now
          </button>
          <button 
            onClick={() => navigate(`/anime/${currentSlide.id}`)}
            className="text-white border-2 border-white/80 hover:border-purple-400 rounded-full px-6 py-3 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 cursor-pointer font-bold button-press"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSec;
