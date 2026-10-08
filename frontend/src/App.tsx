import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/about";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Navbar />

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;