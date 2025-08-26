import React, { useEffect, useState, useCallback } from "react";
import { favourites, getTopAnime, searchAnime ,trending ,recentanime} from "../api/aniList";
import TopAnime from "../components/popanime";
import Header from "../components/header";
import SearchAnime from "../components/searchresults";
import  TrendAnime  from "../components/Trendinganime";
import FavourAnime from "../components/favouriteanime";
import Herosec from "../components/hero"
const Home = () => {
  const [navstate, setnavstate] = useState(false);
  const [searchTerm, setsearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [TopanimeList, setTopanimeList] = useState([]);
  const [TrendanimeList, setTrendanimeList] = useState([]);
  const [recentanimelist, setrecentanimeList] = useState([]);
  const [FavouranimeList, setFavouranimeList] = useState([]);
  const [searchResult, setsearchResult] = useState([]);
  const [trendloading,settrendloading] = useState(true);
  const [heroloading,setheroloading] = useState(true);
  const [favorloading,setfavorloading] = useState(true);
  const [popularloading,setpopularloading] = useState(true);
  const [searchloading,setsearchloading] = useState(true);

  // Memoized fetch function to prevent unnecessary re-renders
  const fetchAnimeData = useCallback(async () => {
    try {
      // Fetch all data in parallel for better performance
      const [Topresult, Trendresult, heroresult, Favourresult] = await Promise.all([
        getTopAnime(),
        trending(),
        recentanime(),
        favourites()
      ]);

      setTopanimeList(Topresult);
      setTrendanimeList(Trendresult);
      setrecentanimeList(heroresult);
      setFavouranimeList(Favourresult);
    } catch (error) {
      console.error("Error fetching anime data:", error);
    } finally {
      // Set all loading states to false
      setpopularloading(false);
      settrendloading(false);
      setheroloading(false);
      setfavorloading(false);
    }
  }, []);

  // Initial popular anime fetch
  useEffect(() => {
    fetchAnimeData();
  }, [fetchAnimeData]);

  // Debounce effect (300ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 700);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Search anime when debounced term changes
  useEffect(() => {
    const fetchSearch = async () => {
      
      if (debouncedTerm.trim() === '') {
        setsearchResult([]);
        return;
      }
      setsearchloading(true);
      try{
      const SearchResults = await searchAnime(debouncedTerm);
      setsearchResult(SearchResults);
      }
      catch(error){
        console.error("error during fetch",error);
      }
      finally{
        setsearchloading(false);
      }
    };
    fetchSearch();
  }, [debouncedTerm]);

  const searchHandler = (e) => {
    setsearchTerm(e.target.value);
  };

  const navOpen = () => setnavstate(true);
  const navClose = () => {setnavstate(false)
  setsearchTerm("");       // clear search input
  setsearchResult([]);  
  };

  return (
    <main className="overflow-x-hidden">
      <Header
        navstate={navstate}
        navOpen={navOpen}
        navClose={navClose}
        searchHandler={searchHandler}
        searchTerm={searchTerm}
      />

      <div className="pt-[100px]">
        {
          searchTerm.trim() !== '' ? (
           <SearchAnime searchResult = {searchResult} searchloading = {searchloading}/>
          ) : (
            <>
              <section>
                <Herosec recentanimelist = {recentanimelist} heroloading = {heroloading}/>
              </section>
              <section>
              <TrendAnime TrendanimeList={TrendanimeList} trendloading = {trendloading} />
              </section>

              <section>
              <TopAnime TopanimeList={TopanimeList} popularloading = {popularloading}/>
              </section>
           
              <section>
              <FavourAnime FavouranimeList={FavouranimeList} favorloading = {favorloading} />
              </section>
            </>
          )
        }
      </div>
    </main>
  );
};

export default Home;
