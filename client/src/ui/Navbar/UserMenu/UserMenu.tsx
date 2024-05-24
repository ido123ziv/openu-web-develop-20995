import { Popup, Button } from "semantic-ui-react";
import { useResetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

import styles from "./UserMenu.module.css";
import { userState } from "../../../state/atoms/userAtom";

interface UserMenuProps {
  name: string;
}

const UserMenu = ({ name }: UserMenuProps) => {
  const resetUser = useResetRecoilState(userState);
  const navigate = useNavigate();

  const handleLogout = () => {
    resetUser();
    navigate("/");
  };

  return (
    <Popup trigger={<Button>{`Hello ${name}`}</Button>} flowing hoverable>
      <div className={styles.menu}>
        <Button className={styles.profile}>Profile</Button>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </Popup>
  );
};

export default UserMenu;
