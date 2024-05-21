import { Icon, Image } from "semantic-ui-react";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";

import styles from "./Babysitter.module.css";
import { userState } from "../../../state/atoms/userAtom";
import BackgroundSVG from "../../../ui/BackgroundSVG/BackgroundSVG";
import RecommendationCards from "./RecommendationCards/RecommendationCards";
import { getNumOfViews, getRecommendations } from "./babysitterServices";
import { useState } from "react";

const BabysitterMainView = () => {
  const [avgRating, setAvgRating] = useState<number>(0);
  const user = useRecoilValue(userState);

  const { data: recommendations } = useQuery({
    queryKey: ["getRecommendations"],
    queryFn: () => getRecommendations(user.id),
    onSuccess: (data) => {
      if (!data.length) {
        return;
      }

      const totalRating = data.reduce((acc, obj) => acc + obj.rating, 0);
      setAvgRating(Number((totalRating / data.length).toFixed(1)));
    },
    onError: (error) => console.log(error),
  });

  const { data: numOfViews } = useQuery({
    queryKey: ["getRNumOfViews"],
    queryFn: () => getNumOfViews(user.id),
    onError: (error) => console.log(error),
  });

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
            <p>{numOfViews || "0"} People viewed your profile</p>
            <p>You have {recommendations?.length || "0"} recommendations</p>
            <p>{avgRating} AVG Rating</p>
          </div>
          <Image src="/babysitter.svg" size="small" />
        </div>
        <div className={styles.CardsContainer}>
          {!recommendations ? (
            <p>NO DATA</p>
          ) : (
            <RecommendationCards data={recommendations} />
          )}
        </div>
      </div>
    </>
  );
};

export default BabysitterMainView;
