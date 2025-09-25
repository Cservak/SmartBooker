import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./view/Home";
import Booking from "./view/Booking";
import Login from "./view/Login";
import Register from "./view/Register";
import AppNavbar from "./components/AppNavbar";
import AppFooter from "./components/AppFooter";

function App() {
  return (
    <BrowserRouter>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <AppFooter />
    </BrowserRouter>
  );
}

export default App
