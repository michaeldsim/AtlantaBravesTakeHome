import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import PlayerProfile from './pages/PlayerProfile';
import Leaderboard from './pages/Leaderboard';
import axios from 'axios';
import { API_URL } from './config';

function App() {
 const [players, setPlayers] = useState([]);
  
  useEffect(() => {
    axios.get(`${API_URL}/api/players`)
    .then(res => {
      setPlayers(res.data.players);
    })
  }, [])

  return (
    <Router>
      <NavBar players={players}/>
      <div className="min-h-screen mt-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/batter/:id" element={<PlayerProfile type={"batter"}/>} />
          <Route path="/pitcher/:id" element={<PlayerProfile type={"pitcher"}/>} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
