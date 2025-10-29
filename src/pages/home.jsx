import React, { useEffect, useState } from "react";
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

  // Initial popular anime fetch
  useEffect(() => {
    
    const fetchDetails = async () => {
      try{
      const Topresult = await getTopAnime();
      setpopularloading(false);
      const Trendresult = await trending();
       settrendloading(false);
      const heroresult  = await recentanime();
      setheroloading(false);

      const Favourresult = await favourites();
      setfavorloading(false);
      setTopanimeList(Topresult);
      setTrendanimeList(Trendresult)
      setFavouranimeList(Favourresult)
      setrecentanimeList(heroresult);
     
      }
      catch(error){
        console.error("there is a error fetching anime",error)
      }
    };
    fetchDetails();
  
  }, []);

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
    </main>
  );
};

export default Home;
