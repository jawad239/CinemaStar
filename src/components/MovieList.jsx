
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

export const MovieList = ({ movies, title }) => 
{

  let[favId , setFavId] = useState([]);
  let[altered, SetAltered] =  useState(0);

    useEffect(()=>{
        let fav = JSON.parse(localStorage.getItem("fav"));
        setFavId(fav.map((m)=>{return m.id}));
    } , [altered])

  let add = (movie)=>{
    let fav = JSON.parse(localStorage.getItem("fav"));
    fav.push(movie);
    fav = JSON.stringify(fav);
    localStorage.setItem("fav" , fav);
    // alert("movie added to favorites list")
    SetAltered(altered +1);
  }
  let removeMovie= (id)=> {
    let fav = JSON.parse(localStorage.getItem("fav"));
    fav = fav.filter((m)=>{return m.id != id})
    fav = JSON.stringify(fav);
    localStorage.setItem("fav" , fav);
    // alert("movie removed from favorites list")
    SetAltered(altered+1)
  }
  
  return (
    <div>
      <h1 id='title'>{title}</h1>


      <div className="all-movies movie-list-background">

        {movies.map((movie) => {
          return (
            <div className="movie movie-cards">

              {favId.includes(movie.id)  ?
            <button className='remove-btn'  onClick={()=>{removeMovie(movie.id) } }> ❤️  </button>  :
            <button className='add-btn' onClick={()=>{add(movie) } }> 🤍</button>
             } 
          
              <Link to={`/moviedetails/${movie.id}`}>
                
                <img src={movie.poster} width="250px" height="300px" />
                <h5> {movie.moviename}</h5>
                <p>{movie.genre}</p>
                <p>{movie.rating} </p>
              </Link>
            </div>
          )
        })}

      </div>

    </div>
  )
}
