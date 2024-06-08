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
import { useMutation, useQueryClient } from "react-query";

import styles from "./ContactRequestModal.module.css";
import { contactRequestProps } from "./contactRequestProps";
import { Icons } from "../ContactRequestsCards/contactTypes";
import { setNextStatus } from "../ContactRequestsCards/helpers";
import { updateRequestStatus } from "../ContactRequestsCards/contactRequestsServices";

const ContactRequestModal = ({
  isOpen,
  setIsOpen,
  contactRequest: data,
}: contactRequestProps) => {
  const queryClient = useQueryClient();

  const nextStatus = data && setNextStatus(data?.requestStatus);

  const { mutate } = useMutation({
    mutationKey: ["updateStatus"],
    mutationFn: () =>
      updateRequestStatus(data?.requestId as number, nextStatus as string),
    onSuccess: () => {
      queryClient.invalidateQueries(["getAllContactRequests"]);
      setIsOpen(false);
    },
    onError: (error) => console.log(error),
  });

  const handleUpdateStatus = () => {
    mutate();
  };

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
        <Button positive onClick={handleUpdateStatus}>
          Set status as {nextStatus}
        </Button>
        <Button negative>Decline</Button>
      </ModalActions>
    </Modal>
  );
};

export default ContactRequestModal;
