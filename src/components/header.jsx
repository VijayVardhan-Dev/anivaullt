
import AnimatedHamburgerButton from "./hamburger";
import SearchIcon from "./searcher";
import NeumorphismButton from "./login";
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

const header = ({ navstate, navOpen, navClose, searchHandler, searchTerm }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`h-[60px] w-full flex justify-conten overflow-hidden fixed top-2 left-4 right-8 z-50 transition-all duration-300 ${
      isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
    }`}>
      <div className="w-full h-full bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl">
      {navstate ? (
        <div className="w-full flex justify-center items-center animate-slide-in-right px-4">
          <div className="relative flex-1 max-w-2xl">
            <input 
              onChange={searchHandler} 
              value={searchTerm} 
              className="bg-white/10 backdrop-blur-xl w-full h-[50px] rounded-full outline-none pl-14 pr-6 text-white text-lg placeholder-gray-300 border border-white/20 focus:border-blue-400/50 focus:bg-white/15 transition-all duration-300 shadow-lg" 
              type="text"
              placeholder="Search for your favorite anime..."
              autoFocus
            />
            <Search size={22} className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-300" />
          </div>
          <button
            onClick={navClose}
            className="ml-4 px-6 py-2 text-white rounded-full focus:outline-none bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 button-press hover-glow"
          >
            Cancel
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 flex items-center justify-start pl-6">
            <div className="overflow-hidden">
              <AnimatedHamburgerButton />
            </div>
            <div className="justify-start animate-slide-in-left ml-4">
              <p className="text-4xl text-white font-bold hover-glow transition-all duration-300">
                Ani<span className="text-gradient">Vault</span>
              </p>
            </div>
          </div>
          <div className="flex-1 flex justify-end items-center pr-6">
            <div className="mr-4 justify-end">
              <SearchIcon onClick={navOpen} />
            </div>
            <div className="mr-2 justify-end">
              <NeumorphismButton />
            </div>
          </div>
        </>
      )}
      </div>
    </header>
  )
}

export default header