import { Card } from "semantic-ui-react";

import styles from "./RecommendationCards.module.css";
import { RecommendationCardArr } from "./RecommendationInterfaces";

const RecommendationCards = ({ data }: RecommendationCardArr) => {
  return (
    <div className={styles.cardsContainer}>
      {data.map((el) => (
        <Card
          key={el.id}
          header={el.parentName}
          meta={`Rating: ${el.rating} ⭐`}
          description={el.recommendationText}
          className={styles.card}
        />
      ))}
    </div>
  );
};

export default RecommendationCards;
