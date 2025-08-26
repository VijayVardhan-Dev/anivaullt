import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import AnimeDetails from './pages/animedetails'
import VideoWatch from './pages/VideoWatch'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
        <Route path="/watch/:id/:episode" element={<VideoWatch />} />
      </Routes>
    </Router>
  )
}

export default App