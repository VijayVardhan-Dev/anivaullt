
import AnimatedHamburgerButton from "./hamburger";
import SearchIcon from "./searcher";
import NeumorphismButton from "./login";
const header = ({ navstate, navOpen, navClose, searchHandler, searchTerm }) => {
  return (
         <header className="h-[60px] w-full shadow-2xl flex overflow-hidden ">
        {navstate ? (
          <div className="w-full flex justify-start items-center">
            <input onChange = {searchHandler} value = {searchTerm} className="bg-white w-[75%] h-[45px] rounded-full ml-3 outline-0 pl-4 text-text-gradient text-2xl " type="text" />
            <button
              onClick={navClose}
              className="px-4 py-2 text-white rounded-mdfocus:outline-none border-2 border-amber-100 rounded-2xl ml-5"
              >
              Cancel
            </button>
          </div>
        ) : (
          <>
          <div className="flex-1 flex items-center justify-start pl-4">
              <div className="overflow-hidden">
              <AnimatedHamburgerButton />
            </div>
            <div className="justify-start">
              <p className="text-4xl text-white font-bold">
                Ani<span className="text-gradient">Vault</span>
              </p>
            </div>
          </div>
          <div className="flex-1 flex justify-end items-center pr-4">
            <div className="  mr-3 justify-end">
              <SearchIcon onClick={navOpen} />
            </div>
            <div className="mr-2 justify-end">
              <NeumorphismButton />
            </div>
          </div>
          </>
        )}
      </header>
  )
}

export default header