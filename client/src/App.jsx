import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import GameList from './pages/gameList';
import AboutUs from './pages/aboutus';
import AboutHome from './pages/aboutHome';
import GameDetail from './pages/gameDetail';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/games" element={<GameList/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/abouth" element={<AboutHome/>} />
        <Route path="/games/:id" element={<GameDetail />} />        
      </Routes>
    </Router>
  )
}

export default App
