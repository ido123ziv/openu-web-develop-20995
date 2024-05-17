import { Icon } from "semantic-ui-react";
import { useRecoilValue } from "recoil";

import CardsView from "../../../ui/CardsView/CardsView";
import styles from "./Moderator.module.css";
import { useQuery } from "react-query";
import { getAllUsers } from "./moderatorServices";
import BackgroundSVG from "../../../ui/BackgroundSVG/BackgroundSVG";
import { userState } from "../../../state/atoms/userAtom";

const ModeratorMainView = () => {
  const user = useRecoilValue(userState);

  const { data } = useQuery({
    queryKey: ["getAllUsers"],
    queryFn: getAllUsers,
    onError: (error) => console.log(error),
  });

  return (
    <>
      <BackgroundSVG />

      <div className={styles.iconContainer}>
        <Icon name="address card outline" size="huge" className={styles.icon} />
        <p>Here you can see the accounts waiting on action</p>
      </div>
      <h1 className={styles.h1}>Hello, {user?.name}</h1>
      {!data ? <p>NODATA</p> : <CardsView data={data} />}
    </>
  );
};

export default ModeratorMainView;
