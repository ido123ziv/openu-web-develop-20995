import { Popup, Button } from "semantic-ui-react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import Swal from "sweetalert2";

import styles from "./UserMenu.module.css";
import { userState } from "../../../state/atoms/userAtom";

const UserMenu = () => {
  const user = useRecoilValue(userState);
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
        {user.role !== "moderator" && (
          <Button className={styles.profile} onClick={handleProfile}>
            <FaRegUserCircle className={styles.icon} />
            Profile
          </Button>
        )}

        <Button onClick={handleLogout} className={styles.logout}>
          <GrLogout className={styles.icon} />
          Logout
        </Button>
      </div>
    </Popup>
  );
};

export default UserMenu;
