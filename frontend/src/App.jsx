import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AnimeDetail from './pages/AnimeDetail';
import Watch from './pages/Watch';
import AdminUpload from './pages/AdminUpload';
import AdminUploadEpisode from './pages/AdminUploadEpisode';
import Watchlist from './pages/Watchlist';
import History from './pages/History';
import './App.css';

function Navigation() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🎬 AnimeStream
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          {user && (
            <>
              <li className="nav-item">
                <Link to="/watchlist" className="nav-link">Watchlist</Link>
              </li>
              <li className="nav-item">
                <Link to="/history" className="nav-link">History</Link>
              </li>
              {user.role === 'admin' && (
                <>
                  <li className="nav-item">
                    <Link to="/admin/upload" className="nav-link">Upload Anime</Link>
                  </li>
                </>
              )}
            </>
          )}
          <li className="nav-item auth-items">
            {user ? (
              <>
                <span className="user-name">{user.username}</span>
                <button onClick={logout} className="btn-logout">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-login">Login</Link>
                <Link to="/register" className="btn-register">Register</Link>
              </>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/anime/:id" element={<AnimeDetail />} />
          <Route path="/watch/:episodeId" element={<Watch />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/history" element={<History />} />
          <Route path="/admin/upload" element={<AdminUpload />} />
          <Route path="/admin/upload-episode/:animeId" element={<AdminUploadEpisode />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
