import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import MovieDetails from './pages/MovieDetails';


function App() {  
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movie/:id/:category' element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
