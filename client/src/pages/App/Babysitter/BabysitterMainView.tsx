import { Image } from "semantic-ui-react";

import styles from "./Babysitter.module.css";

const BabysitterMainView = () => {
  return (
    <div className={styles.container}>
      <h1>Hello, PLACEHOLDER</h1>
      <div className={styles.main}>
        <div className={styles.analytics}>
          <h2>Analytics</h2>
          <p>X People viewed your profile</p>
          <p>You have X recommendations</p>
          <p>STARS</p>
        </div>
        <Image src="/babysitter.svg" size="small" />
      </div>
      <div className={styles.imageContainer}>
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdecJ73IuzOaZdrDLa0aP8eAPc0VKJYuhI72hhEVEzeQ&s"
          size="medium"
        />
      </div>
    </div>
  );
};

export default BabysitterMainView;
