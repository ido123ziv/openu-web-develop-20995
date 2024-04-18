import { Card } from "semantic-ui-react";

import styles from "./CardsView.module.css";

//TODO: PROP VALIDATION
const CardsView = ({ data }) => {
  return (
    <>
      <h1 className={styles.h1}>Hello, PLACEHOLDER</h1>
      <div className={styles.cardContainer}>
        {data.map((_card: unknown, index: number) => (
          <Card
            key={index}
            className={styles.card}
            image="/baby.svg"
            header="Elliot Baker"
            meta="Friend"
            description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
          />
        ))}
      </div>
    </>
  );
};

export default CardsView;
