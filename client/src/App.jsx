import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Destinations from './pages/Destination'
import About from './pages/About'
import Retreats from './pages/Retreat'
import FindMyRetreat from './pages/FindMyRetreat'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Dashboard'
import Dashboard from './pages/Dashboard';
import ScrollToTop from './components/ScrolltoTop';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <ScrollToTop/>
      <Navbar isLoggedIn={isLoggedIn} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/about" element={<About />} />
          <Route path="/retreats" element={<Retreats />} />
          <Route path="/find-my-retreat" element={<FindMyRetreat />} />
          <Route 
            path="/login" 
            element={<Login setIsLoggedIn={setIsLoggedIn} />} 
          />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  )
}

export default App;
