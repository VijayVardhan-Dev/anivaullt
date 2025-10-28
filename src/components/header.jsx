
import AnimatedHamburgerButton from "./hamburger";
import SearchIcon from "./searcher";
import NeumorphismButton from "./login";
import React, { useState } from "react";

const Header = ({ navstate, navOpen, navClose, searchHandler, searchTerm }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = (next) => setMenuOpen(typeof next === 'boolean' ? next : (p) => !p);
  const closeMenu = () => setMenuOpen(false);

  return (
         <header className="h-[60px] w-full shadow-2xl flex overflow-hidden fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-white/10">
        {navstate ? (
          <div className="w-full flex justify-start items-center px-3 md:px-4">
            <input onChange = {searchHandler} value = {searchTerm} className="bg-white w-[75%] h-[45px] rounded-full ml-1 md:ml-3 outline-0 pl-4 text-black text-lg md:text-2xl font-medium" type="text" placeholder="Search anime..." />
            <button
              onClick={navClose}
              className="px-3 md:px-4 py-2 text-white rounded-md focus:outline-none border-2 border-purple-400 hover:border-purple-300 rounded-2xl ml-3 md:ml-5 transition-all duration-300"
              >
              Cancel
            </button>
          </div>
        ) : (
          <>
          <div className="flex-1 flex items-center justify-start pl-3 md:pl-4">
              <div className="overflow-hidden">
              {/* Pass isOpen so the icon turns into an X when open */}
              <AnimatedHamburgerButton onToggle={toggleMenu} isOpen={menuOpen} />
            </div>
            <div className="justify-start ml-1 md:ml-2">
              <p className="text-2xl md:text-4xl text-white font-bold">
                Ani<span className="text-gradient">Vault</span>
              </p>
            </div>
          </div>
          <div className="flex-1 flex justify-end items-center pr-3 md:pr-4 gap-2">
            <div className="mr-1 md:mr-3 justify-end cursor-pointer hover:opacity-80 transition-opacity">
              <SearchIcon onClick={navOpen} />
            </div>
            {/* Hide login button on small screens */}
            <div className="hidden md:block mr-2 justify-end">
              <NeumorphismButton />
            </div>
          </div>

          {/* Full-screen menu below header (header remains visible) */}
          {menuOpen && (
            <div className="fixed inset-x-0 top-[60px] bottom-0 z-40">
              {/* Backdrop (click to close) */}
              <button aria-label="Close menu" onClick={closeMenu} className="absolute inset-0 w-full h-full bg-black/60 backdrop-blur-xl" />
              {/* Panel occupying 70% width below header, slide down */}
              <div className={`absolute left-0 top-0 bottom-0 w-[70%] bg-[#0f0d23]/95 p-0 m-0 flex flex-col items-start justify-start transform transition-transform duration-300 ease-out ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                <nav className="flex flex-col items-start justify-start m-0 p-0 w-full text-left">
                  <a href="#hero" onClick={closeMenu} className="block w-full text-left text-white text-lg px-4 py-3 hover:bg-white/10 transition-colors">Home</a>
                  <a href="#trending" onClick={closeMenu} className="block w-full text-left text-white text-lg px-4 py-3 hover:bg-white/10 transition-colors">Trending</a>
                  <a href="#popular" onClick={closeMenu} className="block w-full text-left text-white text-lg px-4 py-3 hover:bg-white/10 transition-colors">Popular</a>
                  <a href="#favourites" onClick={closeMenu} className="block w-full text-left text-white text-lg px-4 py-3 hover:bg-white/10 transition-colors">Favourites</a>
                </nav>
              </div>
            </div>
          )}
          </>
        )}
      </header>
  )
}

export default Header