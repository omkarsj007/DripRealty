import Navigation from "./components/Navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Discover from "./pages/Discover";
import PropertyInfo from "./pages/PropertyInfo";
function App() {
  return (
    <Router>
      <Navigation />
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/propertyInfo" element={<PropertyInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
