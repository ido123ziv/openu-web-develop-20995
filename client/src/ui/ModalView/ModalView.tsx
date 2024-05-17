import {
  Button,
  Header,
  Icon,
  Image,
  Modal,
  ModalActions,
  ModalContent,
  ModalDescription,
  ModalHeader,
} from "semantic-ui-react";
import { ModalViewProps } from "./ModalViewInterface";

const ModalView = ({ isOpen, setIsOpen, card }: ModalViewProps) => {
  console.log(card);
  return (
    <Modal
      closeIcon
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
    >
      <ModalHeader>Select a Photo</ModalHeader>
      <ModalContent image>
        <Image
          size="medium"
          src={
            card?.imageString || card?.role === "parent"
              ? "/baby.svg"
              : "/babysitter.svg"
          }
          wrapped
        />
        <ModalDescription>
          <Header>{card?.name}</Header>
          <p>
            <Icon name="mail outline" />
            {card?.email}
          </p>

          <p>
            <Icon name="phone" />
            {card?.phoneNumber}
          </p>

          <p>
            <Icon name={card?.gender === "F" ? "female" : "male"} />
            {card?.gender === "F" ? "Female" : "Male"}
          </p>

          <p>
            <Icon name="phone" />
            {card?.phoneNumber}
          </p>

          <p>Age: {card?.age}</p>

          {card?.minKidAge && (
            <>
              <p>Youngest Child Age: {card.minKidAge}</p>

              <p>Eldest Child Age: {card.maxKidAge}</p>

              <p>Total Number of Kids: {card.numOfKids}</p>
            </>
          )}

          <p>{card?.comments}</p>
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button color="black" onClick={() => setIsOpen(false)}>
          Add a review
        </Button>
        <Button
          content="Worked with"
          labelPosition="right"
          icon="checkmark"
          onClick={() => setIsOpen(false)}
          positive
        />
      </ModalActions>
    </Modal>
  );
};

export default ModalView;
