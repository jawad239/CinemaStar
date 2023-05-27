import { useEffect, useState } from "react";
import { MovieList } from "./MovieList";

const Favorites = () => {

    let[favoriteMovies , setFav] = useState(null);

    useEffect(()=>{
        setFav(JSON.parse(localStorage.getItem("fav")))
    } , [])

    return ( 
    <div>
       {favoriteMovies &&
        <MovieList movies={favoriteMovies} title="Favorite movies"/>}
    </div> );
}
 
export default Favorites;