import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Callback from './pages/Callback';
import PlaylistSelect from './pages/PlaylistSelect';
import MusicMash from './pages/MusicMash';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/callback" element={<Callback />} />
          <Route
            path="/playlists"
            element={
              <PrivateRoute>
                <PlaylistSelect />
              </PrivateRoute>
            }
          />
          <Route
            path="/mash/:playlistId"
            element={
              <PrivateRoute>
                <MusicMash />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;