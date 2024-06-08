import { Icon, Image } from "semantic-ui-react";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { useState } from "react";

import styles from "./Babysitter.module.css";
import { userState } from "../../../state/atoms/userAtom";
import BackgroundSVG from "../../../ui/BackgroundSVG/BackgroundSVG";
import RecommendationCards from "./RecommendationCards/RecommendationCards";
import {
  getInteractionsData,
  getNumOfViews,
  getRecommendations,
} from "./babysitterServices";
import Nodata from "../../../ui/NoData/NoData";
import StatsChart from "./StatsChart/StatsChart";

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
    queryKey: ["getNumOfViews"],
    queryFn: () => getNumOfViews(user.id),
    onError: (error) => console.log(error),
  });

  const { data: interactionsData } = useQuery({
    queryKey: ["getInteractionsData"],
    queryFn: () => getInteractionsData(user.id),
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
          {!recommendations?.length ? (
            <Nodata role={user.role} />
          ) : (
            <RecommendationCards data={recommendations} />
          )}
        </div>

        <StatsChart data={interactionsData || []} />
      </div>
    </>
  );
};

export default BabysitterMainView;
