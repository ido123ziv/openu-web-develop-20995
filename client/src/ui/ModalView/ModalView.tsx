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
            card?.image || card?.role === "parent"
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
            <Icon name={card?.gender === "F" ? "female" : "male"} />
            {card?.gender}
          </p>
          <p>
            <Icon name="phone" />
            {card?.phoneNumber}
          </p>
          <p>{card?.comment}</p>
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
