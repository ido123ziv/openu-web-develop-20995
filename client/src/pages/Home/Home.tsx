import { Image } from "semantic-ui-react";
import styles from "./Home.module.css";

// import babyImage from "../../../public/babysitter.png";
// import "goodBaby.png" from "../../../public/goodBaby.png";
import Info from "./Info/Info";

function Home() {
  return (
    <>
      <div className={styles.imageContainer}>
        <Image src="goodBaby.png" className={styles.image} alt="homepage-bg" />
        <div className={styles.textOverImage}>
          <h1>Find The Perfect Match.</h1>
          <h2>For Your Kids</h2>
        </div>
      </div>
      <Info />
    </>
  );
}

export default Home;
