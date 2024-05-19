import { Menu, MenuItem, Button, Image, MenuMenu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

import styles from "./NavigationBar.module.css";
import { userState } from "../../state/atoms/userAtom";

function NavigationBar() {
  const user = useRecoilValue(userState);
  const loggedIn = user.id ?? false;

  return (
    <Menu inverted className={styles.navbar}>
      <MenuItem>
        <Image src="taf-03.svg" className={styles.logo} />
      </MenuItem>

      <MenuMenu>
        <MenuItem as={Link} to="/" name="home">
          Home
        </MenuItem>

        <MenuItem as={Link} to="/about" name="about">
          About
        </MenuItem>

        <MenuItem as={Link} to="/contact" name="contact">
          Contact
        </MenuItem>

        {!loggedIn ? (
          <MenuItem as={Link} to="/signup" name="signup">
            <Button primary>Sign up</Button>
          </MenuItem>
        ) : (
          <MenuItem as={Link} to={`/app/${user.role}`} name="signup">
            <Button primary>To App</Button>
          </MenuItem>
        )}
      </MenuMenu>

      {!loggedIn ? (
        <MenuItem as={Link} to="/login" position="right">
          <Button>Login</Button>
        </MenuItem>
      ) : (
        <MenuItem position="right">
          {/* //TODO: once get profile is ready */}
          <Button primary>{`Hello ${user.name}`}</Button>
        </MenuItem>
      )}
    </Menu>
  );
}

export default NavigationBar;
