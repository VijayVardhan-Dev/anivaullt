import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import VideoWatch from './pages/VideoWatch'
import AnimeDetails from './pages/animedetails'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:animeId" element={<AnimeDetails />} />
        <Route path="/watch/:animeId/:episode?" element={<VideoWatch />} />
      </Routes>
    </Router>
  )
}

export default App