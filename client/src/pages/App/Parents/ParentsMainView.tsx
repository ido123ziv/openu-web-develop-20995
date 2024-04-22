import { useState } from "react";
import { Icon } from "semantic-ui-react";

import CardsView from "../../../ui/CardsView/CardsView";
import styles from "./Parents.module.css";

const ParentsMainView = () => {
  // CALL TO DB TO GET ALL DATA
  const [data, setData] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 1, 1]);

  return (
    <>
      <div className={styles.iconContainer}>
        <Icon name="address card outline" size="huge" className={styles.icon} />
        <p>Here you can see the babysitters available in your area</p>
      </div>
      <h1 className={styles.h1}>Hello, PLACEHOLDER</h1>

      <CardsView data={data} />
    </>
  );
};

export default ParentsMainView;
