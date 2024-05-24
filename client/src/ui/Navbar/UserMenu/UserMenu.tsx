import { Popup, Button } from "semantic-ui-react";
import { useResetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import styles from "./UserMenu.module.css";
import { userState } from "../../../state/atoms/userAtom";
import { User } from "../../../pages/Login/LoginInterfaces";

interface UserMenuProps {
  user: User;
}

const UserMenu = ({ user }: UserMenuProps) => {
  const resetUser = useResetRecoilState(userState);
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate(`${user.role}/profile/${user.id}`);
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });

    if (result.isConfirmed) {
      resetUser();
      navigate("/");
    }
  };

  return (
    <Popup trigger={<Button>{`Hello ${user.name}`}</Button>} flowing hoverable>
      <div className={styles.menu}>
        <Button className={styles.profile} onClick={handleProfile}>
          Profile
        </Button>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </Popup>
  );
};

export default UserMenu;
