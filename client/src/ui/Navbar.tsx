import { Link } from "react-router-dom";
import { useState } from "react";

import "../index.css";
import LoginPopup from "../routes/home/LoginPopup/LoginPopup";

//TODO: change the buttons to LINKS
const Navbar = () => {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  return (
    <nav className="navbar">
      {/* LITTLE LOGO */}

      {/* <Link to={"/"}>ELi</Link> */}
      <button>Contact Us</button>
      <button onClick={() => setShowPopup(!showPopup)}>Login</button>
      {showPopup && <LoginPopup />}
    </nav>
  );
};

export default Navbar;
