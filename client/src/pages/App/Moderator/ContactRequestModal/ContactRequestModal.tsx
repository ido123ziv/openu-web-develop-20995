import {
  Button,
  Header,
  Icon,
  Modal,
  ModalActions,
  ModalContent,
  ModalDescription,
  ModalHeader,
  SemanticICONS,
} from "semantic-ui-react";

import styles from "./ContactRequestModal.module.css";
import { contactRequestProps } from "./contactRequestProps";
import { Icons } from "../ContactRequestsCards/ContactRequestsCardsProps";

const ContactRequestModal = ({
  isOpen,
  setIsOpen,
  contactRequest: data,
}: contactRequestProps) => {
  return (
    <Modal
      closeIcon
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
      open={isOpen}
    >
      <ModalHeader>{data?.name}</ModalHeader>
      <ModalContent>
        <ModalDescription>
          <Header>{data?.title}</Header>
          <div>
            <p>
              <Icon
                name={data && (Icons[data.requestStatus] as SemanticICONS)}
                className={styles.icon}
              />
              Status: {data?.requestStatus}
            </p>

            <p>
              <Icon name="mail" className={styles.icon} />
              {data?.email}
            </p>

            <p>{data?.message}</p>
          </div>
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button positive>Approve</Button>
        <Button negative>Decline</Button>
      </ModalActions>
    </Modal>
  );
};

export default ContactRequestModal;
