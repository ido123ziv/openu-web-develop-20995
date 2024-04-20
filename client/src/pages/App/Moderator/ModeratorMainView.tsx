import { useState } from "react";
import { Icon } from "semantic-ui-react";

import CardsView from "../../../ui/CardsView/CardsView";
import styles from "./Moderator.module.css";

const ModeratorMainView = () => {
  const [data, setData] = useState([0, 1, 2, 3, 4]);

  return (
    <>
      <div className={styles.iconContainer}>
        <Icon name="address card outline" size="huge" className={styles.icon} />
        <p>Here you can see the accounts waiting on action</p>
      </div>
      <h1 className={styles.h1}>Hello, PLACEHOLDER</h1>
      <CardsView data={data} />
    </>
  );
};

export default ModeratorMainView;
