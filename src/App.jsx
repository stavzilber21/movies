// import { useState,useEffect } from 'react'
// import './App.css'
// import { Routes, Route, Link } from 'react-router-dom';
// function App() {
//   const [popular, setPopular] = useState({})
  
 
// useEffect(() => {
//   fetchPopularMovies()
//   fetchNowPlayingMovies()
//   fetchAllMovies()
// }, [])

// const fetchPopularMovies =async()=>{
//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzEyNDNhMjA3Zjg4MzFmZWNlYjE5MjlmOTYzNzUzNCIsIm5iZiI6MTczMzgxMzMzMC45NjUsInN1YiI6IjY3NTdlNDUyMTU0NDIwMTFmZmU4MGFlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KLUfH2ULPcYw-dnLUAO8kRNfP57aCoE4ntV8NFu-ifo'
//     }
//   };
  
//   await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
//     .then(res => res.json())
//     .then(res => console.log(res.results))
//     .catch(err => console.error(err));
// }

// const fetchNowPlayingMovies =async()=>{
//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzEyNDNhMjA3Zjg4MzFmZWNlYjE5MjlmOTYzNzUzNCIsIm5iZiI6MTczMzgxMzMzMC45NjUsInN1YiI6IjY3NTdlNDUyMTU0NDIwMTFmZmU4MGFlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KLUfH2ULPcYw-dnLUAO8kRNfP57aCoE4ntV8NFu-ifo'
//     }
//   };
  
//   fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
//     .then(res => res.json())
//     .then(res => console.log(res.results))
//     .catch(err => console.error(err));
// }

// const fetchAllMovies =async()=>{
//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzEyNDNhMjA3Zjg4MzFmZWNlYjE5MjlmOTYzNzUzNCIsIm5iZiI6MTczMzgxMzMzMC45NjUsInN1YiI6IjY3NTdlNDUyMTU0NDIwMTFmZmU4MGFlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KLUfH2ULPcYw-dnLUAO8kRNfP57aCoE4ntV8NFu-ifo'
//     }
//   };
  
//   fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
//     .then(res => res.json())
//     .then(res => console.log(res.results))
//     .catch(err => console.error(err));
// }

//   return (
//     <>
     
//     </>
//   )
// }

// export default App
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home';
function App() {  
  return (
    <>
    <Router>
    <Routes>
     <Route path='/' element={<Home />} />
     </Routes>
    </Router>
    
    </>
  )
}

export default App