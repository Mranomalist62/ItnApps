import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Destinations from "./pages/Destination";
import About from "./pages/About";
import Retreats from "./pages/Retreat";
import FindMyRetreat from "./pages/FindMyRetreat";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import Profile from "./pages/Dashboard";
import Dashboard from "./pages/Dashboard";
import ScrollToTop from "./components/ScrolltoTop";
import { sessionValidate } from "./services/AuthService";


function App() {
  const PrivateRoute = ({ isLoggedIn, children }) => {
    return isLoggedIn ? children : <Navigate to="/login" replace />;
  };
  const PublicRoute = ({ isLoggedIn, children }) => {
    return isLoggedIn ? <Navigate to="/profile" replace /> : children;
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkSession = async () => {
      await sessionValidate(setIsLoggedIn);
      setLoading(false);
    };
    checkSession();
  }, []);
  console.log(isLoggedIn);
  if (loading) {
    return <div className="text-center py-20">Checking session...</div>; // Optional spinner
  }
  return (
    <Router>
      <ScrollToTop />
      <Navbar isLoggedIn={isLoggedIn} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/about" element={<About />} />
          <Route path="/retreats" element={<Retreats />} />
          <Route path="/find-my-retreat" element={<FindMyRetreat />} />
          <Route path="/login" element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <Login setIsLoggedIn={setIsLoggedIn} />
            </PublicRoute>
            } />
          <Route path="/register" element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <Register />
            </PublicRoute>
            } />
          <Route path="/profile" element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <Dashboard setIsLoggedIn={setIsLoggedIn} />
            </PrivateRoute>
            } />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
