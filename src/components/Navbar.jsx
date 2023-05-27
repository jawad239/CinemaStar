import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const Navbar = () => 
{
    let[searchword , setSearchword] = useState("");
    let[movienames,SetMovies] =useState([]);
    let[menu,Setmenu]=useState(false);

    useEffect(()=>{
    fetch(" http://localhost:4000/movies")
    .then((res)=>{return res.json()})
    .then((data)=>{
        let names = data.map((m)=>{return {moviename :m.moviename, id: m.id} })
        let filteredNames=  names.filter((movie)=>{return movie.moviename.toLowerCase().includes(searchword.toLowerCase())})
        SetMovies(filteredNames);
    })

    },[searchword])
  return (
    <nav>
        <div id="logo">
            <Link to="/"><h1>🎦Cinemastar🌟 </h1></Link>
        </div>

        <div id="search-bar">
                <input type="search" placeholder="Search for movies" value={searchword}
                onChange={(e)=>{ setSearchword( e.target.value ); }}
                />
                <Link to={`/search/${searchword}`}>
                    <button >search</button></Link>
            </div>

        <div id="fav-movie">
                <Link to="/fav">Favorite movies</Link>
            </div>

        <div id="add-movie">
            <Link to="/add">Add Movies</Link>
        </div>
        <div id="hamberger">
                <span onClick={()=>{Setmenu(!menu)}}>
                    {menu==false ?  <i class='bx bx-menu'></i> :
                                    <i class='bx bx-menu-alt-right'></i>}
                </span>



                {menu && <div id="menu">
                            <div id="menu-fav-movie">
                            <Link to="/fav">Favorite movies</Link>
                            </div>
                            <div id="menu-add-movie">
                                <Link to="/add">Add movie</Link>
                            </div>
                        </div>}
            </div>
    
           { searchword !=="" && <div className='suggestion-box'>
            
            <ul>
                {
                    movienames.map((movie)=>{ return( <Link to={`/moviedetails/${movie.id}`} >
                        <li onClick={()=>{setSearchword("")}}> {movie.moviename}</li></Link> )})
                }
            </ul>
        
    </div>
    }

    </nav>
  );
}
