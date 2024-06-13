import { Card } from "semantic-ui-react";

import styles from "./CardsView.module.css";
import { useState } from "react";
import ModalView from "../ModalView/ModalView";
import { CardsData, CardsDataArr } from "./CardViewProps";

const CardsView = ({ data, screen }: CardsDataArr) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [card, setCard] = useState<CardsData | undefined>(undefined);

  const handleClick = (element: CardsData) => {
    setCard(element);
    setIsOpen(() => !isOpen);
  };

  return (
    <>
      <div className={styles.cardContainer}>
        {data?.map((element: CardsData) => (
          <Card
            key={element.email}
            className={styles.card}
            image={
              element.imageString || element.role === "parent"
                ? "/baby.svg"
                : "/babysitter.svg"
            }
            header={element.name}
            meta={element.role}
            description={element.comments}
            onClick={(_e) => handleClick(element)}
          />
        ))}
      </div>

      {isOpen && (
        <ModalView
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          card={card}
          screen={screen}
        />
      )}
    </>
  );
};

export default CardsView;
