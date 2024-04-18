import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavigationBar from "./Navbar/Navbar";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import ScrollToTopButton from "../ui/ScrollToTopButton";
import SignupSelection from "../pages/Signup/SignupSelection/SignupSelection";
import SignupParents from "../pages/Signup/SignupParents/SignupParents";
import SignupBabySitter from "../pages/Signup/SignupBabysitter/SignupBabysitter";
import Login from "../pages/Login/Login";
import ParentsMainView from "../pages/App/Parents/ParentsMainView";
import BabysitterMainView from "../pages/App/Babysitter/BabysitterMainView";
import ModeratorMainView from "../pages/App/Moderator/ModeratorMainView";

function Layout() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignupSelection />} />
        <Route path="/signup/parents" element={<SignupParents />} />
        <Route path="/signup/babysitter" element={<SignupBabySitter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app/parents" element={<ParentsMainView />} />
        <Route path="/app/babysitter" element={<BabysitterMainView />} />
        <Route path="/app/moderator" element={<ModeratorMainView />} />
      </Routes>
      <ScrollToTopButton />
    </Router>
  );
}

export default Layout;
