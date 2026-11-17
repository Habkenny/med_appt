
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";
import "./components/Navbar/Navbar.css";
import "./App.css";
import Landing_Page from './Components/Landing_Page/Landing_Page';
import "."

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/" element={<Landing_Page/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
