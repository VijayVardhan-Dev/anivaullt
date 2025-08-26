// Anime API functions for video streaming
const BASE_URL = 'https://api.animeapi.skin';

// Search anime by title
export const searchAnimeForStreaming = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/anime/gogoanime/${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search anime');
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching anime for streaming:', error);
    return [];
  }
};

// Get anime info by ID
export const getAnimeInfo = async (animeId) => {
  try {
    const response = await fetch(`${BASE_URL}/anime/gogoanime/info/${animeId}`);
    if (!response.ok) throw new Error('Failed to get anime info');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting anime info:', error);
    return null;
  }
};

// Get episode sources
export const getEpisodeSources = async (episodeId) => {
  try {
    const response = await fetch(`${BASE_URL}/anime/gogoanime/watch/${episodeId}`);
    if (!response.ok) throw new Error('Failed to get episode sources');
    const data = await response.json();
    return data.sources || [];
  } catch (error) {
    console.error('Error getting episode sources:', error);
    return [];
  }
};

// Get streaming URLs
export const getStreamingUrls = async (episodeId) => {
  try {
    const response = await fetch(`${BASE_URL}/anime/gogoanime/watch/${episodeId}`);
    if (!response.ok) throw new Error('Failed to get streaming URLs');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting streaming URLs:', error);
    return null;
  }
};

// Search anime by AniList ID (convert to gogoanime format)
export const searchAnimeByAniListId = async (aniListId, title) => {
  try {
    // First try to search by title
    const searchResults = await searchAnimeForStreaming(title);
    
    if (searchResults.length > 0) {
      // Return the first result that seems to match
      return searchResults[0];
    }
    
    return null;
  } catch (error) {
    console.error('Error searching anime by AniList ID:', error);
    return null;
  }
};

// Generate embed URL for video streaming
export const generateEmbedUrl = (animeTitle, episodeNumber) => {
  // Clean the anime title for URL
  const cleanTitle = animeTitle
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
  
  return `https://2anime.xyz/embed/${cleanTitle}-episode-${episodeNumber}`;
};
