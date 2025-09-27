import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Booking from "./views/Booking";
import Login from "./views/Login";
import Register from "./views/Register";
import AppNavbar from "./components/AppNavbar";
import AppFooter from "./components/AppFooter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
