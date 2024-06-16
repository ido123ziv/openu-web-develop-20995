import {Card, Label, Rating} from "semantic-ui-react";

import styles from "./CardsView.module.css";
import {useState} from "react";
import ModalView from "../ModalView/ModalView";
import {CardsData, CardsDataArr} from "./CardViewProps";

const CardsView = ({data, screen}: CardsDataArr) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [card, setCard] = useState<CardsData | undefined>(undefined);

    const handleClick = (element: CardsData) => {
        setCard(element);
        setIsOpen(() => !isOpen);
    };

    return (
        <>
            <div className={styles.cardContainer}>
                {data?.map((element: CardsData) => {
                    const labels = <div>
                        {element?.contacted ? <Label as='a' color='green' size='tiny' tag>Contacted</Label> : null}
                        {element?.workedWith ? <Label as='a' color='orange' size='tiny' tag>Worked With</Label> : null}
                    </div>

                    const description = <div>
                        {labels}
                        <br />
                        {element.comments}
                    </div>

                    const rating =
                        <Rating icon='star' rating={element.rating} maxRating={5} disabled></Rating>

                        return (<Card
                            key={element.email}
                            className={styles.card}
                            image={
                                element.imageString || element.role === "parent"
                                    ? "/baby.svg"
                                    : "/babysitter.svg"
                            }
                            header={element.name}
                            meta={element?.distance ? `Distance: ${element.distance} km` : element.role}
                            description={description}
                            extra={rating}
                            onClick={(_e) => handleClick(element)}
                        />)
                    }
                )}
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
