import { Menu, MenuItem, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

import styles from "./NavigationBar.module.css";

function NavigationBar() {
  console.log("test");
  return (
    <Menu inverted pointing className={styles.navbar}>
      <MenuItem as={Link} to="/" name="home">
        Home
      </MenuItem>

      <MenuItem as={Link} to="/about" name="about">
        About
      </MenuItem>

      <MenuItem as={Link} to="/contact" name="contact">
        Contact
      </MenuItem>

      <MenuItem as={Link} to="/signup" name="signup">
        <Button primary>Sign up</Button>
      </MenuItem>

      <MenuItem as={Link} to="/login" position="right">
        <Button>Login</Button>
      </MenuItem>
    </Menu>
  );
}

export default NavigationBar;
