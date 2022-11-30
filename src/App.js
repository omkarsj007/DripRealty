import Navigation from "./components/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Discover from "./pages/Discover";
import PropertyInfo from "./pages/PropertyInfo";
import Profile from "./pages/Profile";
import mongoose from "mongoose";
import BecomeHost from "./pages/BecomeHost";
import EditProperties from "./pages/EditProperties";
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
        <Route path="/becomeHost" element={<BecomeHost />} />
        <Route path="/editProperties" element={<EditProperties />} />
      </Routes>
    </Router>
  );
}

export default App;
