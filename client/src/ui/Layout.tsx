import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavigationBar from "./Navbar"; // Your NavigationBar component
import Home from "../pages/Home/Home"; // Example component for Home page
// import About from './About'; // Example component for About page
import Contact from "../pages/Contact/Contact"; // Example component for Contact page
import ScrollToTopButton from "../ui/ScrollToTopButton"; // Ensure the path is correct
import SignupSelection from "../pages/Signup/SignupSelection/SignupSelection";
import SignupParents from "../pages/Signup/SignupParents/SignupParents";
import SignupBabySitter from "../pages/Signup/SignupBabysitter/SignupBabysitter";
import Login from "../pages/Login/Login";

function Layout() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/*<Route path="/about" element={<About />} />*/}
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignupSelection />} />
        <Route path="/signup/parents" element={<SignupParents />} />
        <Route path="/signup/babysitter" element={<SignupBabySitter />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ScrollToTopButton />
    </Router>
  );
}

export default Layout;
