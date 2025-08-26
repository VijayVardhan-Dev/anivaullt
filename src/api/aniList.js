// src/api/anilistAPI.js
export const getTopAnime = async () => {
  const query = `
    query {
      Page(perPage: 10, page: 1) {
        media(sort: POPULARITY_DESC, type: ANIME) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
          description
          popularity
        }
      }
    }
  `;

  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    return data.data.Page.media;
  } catch (error) {
    console.error("Error fetching data from AniList:", error);
    return [];
  }
};


export async function searchAnime(query) {
  const gqlQuery = `
    query ($search: String) {
      Page(perPage: 10) {
        media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
          id
          title {
            romaji
          }
          coverImage {
            large
          }
          description
        }
      }
    }
  `;

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: gqlQuery,
      variables: {
        search: query,
      },
    }),
  });

  const data = await response.json();
  return data.data.Page.media;
}

export const trending = async () => {
  const query = `
    query {
      Page(perPage: 10, page: 1) {
        media(sort: TRENDING_DESC, type: ANIME) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
          description
        }
      }
    }
  `;

  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ query }),
     
    });

    const data = await response.json();
    return data.data.Page.media;
  } catch (error) {
    console.error("Error fetching data from AniList:", error);
    return [];
  }
};


export const favourites = async () => {
  const query = `
    query {
      Page(perPage: 10, page: 1) {
        media(sort: FAVOURITES_DESC, type: ANIME) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
          description
        }
      }
    }
  `;

  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ query }),
     
    });

    const data = await response.json();
    return data.data.Page.media;
  } catch (error) {
    console.error("Error fetching data from AniList:", error);
    return [];
  }
};



export const recentanime = async () => {
  const query = `
    query {
      Page(perPage: 10, page: 1) {
        media(type: ANIME, sort: TRENDING_DESC) {
          id
          title {
            romaji
            english
          }
          coverImage {
            large
          }
          description
          averageScore
          bannerImage
        }
      }
    }
  `;

  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ query }),
     
    });

    const data = await response.json();
    return data.data.Page.media;
  } catch (error) {
    console.error("Error fetching data from AniList:", error);
    return [];
  }
};

export const getAnimeById = async (id) => {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title {
          romaji
          english
        }
        coverImage {
          large
        }
        bannerImage
        description
        averageScore
        episodes
        duration
        status
        genres
        studios {
          nodes {
            name
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ 
        query,
        variables: { id: parseInt(id) }
      }),
    });

    const data = await response.json();
    return data.data.Media;
  } catch (error) {
    console.error("Error fetching anime by ID from AniList:", error);
    return null;
  }
};