import Navigation from "./components/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import PropertyInfo from "./pages/PropertyInfo";
import Profile from "./pages/Profile";
import mongoose from "mongoose";
// const cors = require("cors");

function App() {
  return (
    <Router>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/propertyInfo" element={<PropertyInfo />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
