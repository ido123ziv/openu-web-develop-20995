import { Card } from "semantic-ui-react";

import styles from "./CardsView.module.css";
import { useState } from "react";
import ModalView from "../ModalView/ModalView";
import { CardsData, CardsProps } from "./CardViewProps";

const CardsView = ({ data }: CardsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [card, setCard] = useState<CardsData | undefined>(undefined);

  const handleClick = (element: CardsData) => {
    setCard(element);
    setIsOpen(() => !isOpen);
  };

  console.log(card);
  return (
    <>
      <div className={styles.cardContainer}>
        {data?.map((element) => (
          <Card
            key={element.email}
            className={styles.card}
            image={
              element.image || element.role === "parent"
                ? "/baby.svg"
                : "/babysitter.svg"
            }
            header={element.name}
            meta={element.role}
            description={element.comment}
            onClick={(_e) => handleClick(element)}
          />
        ))}
      </div>

      {isOpen && (
        <ModalView isOpen={isOpen} setIsOpen={setIsOpen} card={card} />
      )}
    </>
  );
};

export default CardsView;
