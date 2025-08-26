import {Search} from 'lucide-react'
import react from 'react';

const SearchIcon = ({onClick}) => {
  return (
    <div 
      onClick={onClick}
      className="cursor-pointer hover:scale-110 transition-transform duration-200 button-press"
    >
       <Search size={32} className="text-white hover:text-blue-400 transition-colors duration-200"/>
    </div>
  )
}

export default SearchIcon