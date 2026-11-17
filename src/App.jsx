
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar.jsx";
import Landing_Page from "./components/Landing_Page/Landing_Page.jsx";
import Signup from "./components/Signup/Signup.jsx";
import Login from "./components/Login/Login.jsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing_Page />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Add this when the component is ready */}
        {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
