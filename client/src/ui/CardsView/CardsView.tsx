import { Card } from "semantic-ui-react";

import styles from "./CardsView.module.css";
import { useState } from "react";
import ModalView from "../ModalView/ModalView";
import { CardsProps } from "./CardViewProps";

const CardsView = ({ data }: CardsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);

  const handleClick = (
    _e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    index: number
  ) => {
    setId(index);
    setIsOpen(() => !isOpen);
  };
  return (
    <>
      <div className={styles.cardContainer}>
        {data.map((_card: unknown, index: number) => (
          <Card
            key={index}
            className={styles.card}
            image="/baby.svg"
            header="Elliot Baker"
            meta="Friend"
            description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
            onClick={(_e) => handleClick(_e, index)}
          />
        ))}
      </div>

      {isOpen && <ModalView isOpen={isOpen} setIsOpen={setIsOpen} id={id} />}
    </>
  );
};

export default CardsView;
