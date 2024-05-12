import {
  Button,
  Header,
  Image,
  Modal,
  ModalActions,
  ModalContent,
  ModalDescription,
  ModalHeader,
} from "semantic-ui-react";
import { ModalViewProps } from "./ModalViewInterface";

const ModalView = ({ isOpen, setIsOpen, id }: ModalViewProps) => {
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
          src="https://react.semantic-ui.com/images/avatar/large/rachel.png"
          wrapped
        />
        <ModalDescription>
          <Header>Default Profile Image</Header>
          <p>
            We've found the following gravatar image associated with your e-mail
            address.
          </p>
          <p>Is it okay to use this photo?</p>
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button color="black" onClick={() => setIsOpen(false)}>
          Nope
        </Button>
        <Button
          content="Yep, that's me"
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
