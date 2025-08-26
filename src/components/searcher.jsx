import {Search} from 'lucide-react'
import react from 'react';
const SearchIcon = ({onClick}) => {
  return (
    <div onClick = {onClick}>
       <Search size = {32} className = "text-white"/>
    </div>
   
  )
}

export default SearchIcon