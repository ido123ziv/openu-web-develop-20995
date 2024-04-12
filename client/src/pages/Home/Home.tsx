import React from "react";
import { Image } from 'semantic-ui-react';
import styles from './Home.module.css';

import babyImage from '../../../public/babysitter.png';
import goodBaby from '../../../public/goodBaby.jpg';
import Info from './Info';

function Home() {
    return (
        <>
            <div className={styles.imageContainer}>
                <Image src={goodBaby} />
                <div className={styles.textOverImage}>
                    What We Do
                </div>
            </div>
            <Info />
        </>
    );
}

export default Home;
