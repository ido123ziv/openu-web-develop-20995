import { Icon, Image } from "semantic-ui-react";
import { useRecoilValue } from "recoil";

import styles from "./Babysitter.module.css";
import { userState } from "../../../state/atoms/userAtom";
import BackgroundSVG from "../../../ui/BackgroundSVG/BackgroundSVG";
import RecommendationCards from "./RecommendationCards/RecommendationCards";

const arr = [
  {
    id: 1,
    parentId: 1,
    parentName: "Eli",
    rating: 5,
    recommendation: "the bex",
  },
  {
    id: 2,
    parentId: 1,
    parentName: "Eli",
    rating: 5,
    recommendation: "the bex",
  },
  {
    id: 3,
    parentId: 1,
    parentName: "Eli",
    rating: 5,
    recommendation: "the bex",
  },
  {
    id: 4,
    parentId: 1,
    parentName: "Eli",
    rating: 5,
    recommendation: "the bex",
  },
];

const BabysitterMainView = () => {
  const user = useRecoilValue(userState);

  //TODO: ADD REACT QUERY SHHIT

  return (
    <>
      <BackgroundSVG />

      <div className={styles.iconContainer}>
        <Icon name="address card outline" size="huge" className={styles.icon} />
        <p>Here you can see your analytics</p>
      </div>
      <h1 className={styles.h1}>Hello, {user.name}</h1>
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.analytics}>
            <h2>Analytics</h2>
            <p>X People viewed your profile</p>
            <p>You have X recommendations</p>
            <p>AVG Rating</p>
          </div>
          <Image src="/babysitter.svg" size="small" />
        </div>
        <div className={styles.CardsContainer}>
          <RecommendationCards data={arr} />
        </div>
      </div>
    </>
  );
};

export default BabysitterMainView;
