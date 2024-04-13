import { useState, useEffect } from "react";
import { Image } from "semantic-ui-react";
import styles from "./Home.module.css";

import babysitterImage1 from "/babysitter.png";
import babysitterImage2 from "/new.png";
import babysitterImage3 from "/more.png";
import babysitterImage4 from "/baby4.png";
import Info from "./Info/Info";

const images = [
  babysitterImage2,
  babysitterImage3,
  babysitterImage1,
  babysitterImage4,
];

function Home() {
  const [currentImage, setCurrentImage] = useState(babysitterImage3);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className={styles.imageContainer}>
        <Image src={currentImage} className={styles.image} alt="homepage-bg" />
        <div className={styles.overlayText}>
          Find the perfect match
          <br />
          for your kids
        </div>
      </div>
      <Info />
    </>
  );
}

export default Home;
