import { Icon } from "semantic-ui-react";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";

import BackgroundSVG from "../../../ui/BackgroundSVG/BackgroundSVG";
import CardsView from "../../../ui/CardsView/CardsView";
import styles from "./Parents.module.css";
import { userState } from "../../../state/atoms/userAtom";
import { getAllBabysitters } from "./parentServices";

const ParentsMainView = () => {
  const user = useRecoilValue(userState);

  const { data } = useQuery({
    queryKey: ["getAllBabysitters"],
    queryFn: getAllBabysitters,
    onError: (error) => console.log(error),
  });

  return (
    <>
      <BackgroundSVG />

      <div className={styles.iconContainer}>
        <Icon name="address card outline" size="huge" className={styles.icon} />
        <p>Here you can see the babysitters available in your area</p>
      </div>
      <h1 className={styles.h1}>Hello, {user.name}</h1>

      <CardsView data={data} />
    </>
  );
};

export default ParentsMainView;
