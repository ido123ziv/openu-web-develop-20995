import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardMeta,
  Icon,
  SemanticICONS,
} from "semantic-ui-react";
import { useState } from "react";

import styles from "./ContactRequestsCards.module.css";
import { ContactData, ContactDataArr } from "./ContactRequestsCardsProps";
import ContactRequestModal from "../ContactRequestModal/ContactRequestModal";
import { Icons } from "./contactTypes";

const ContactRequestsCards = ({ data }: ContactDataArr) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [contactRequest, setContactRequest] = useState<ContactData | undefined>(
    undefined
  );

  const handleClick = (element: ContactData) => {
    setContactRequest(element);
    setIsOpen(true);
  };

  return (
    <>
      <div className={styles.cardContainer}>
        {data?.map((element: ContactData) => (
          <Card
            className={styles.card}
            key={element.requestId}
            onClick={(_e) => handleClick(element)}
          >
            <CardContent>
              <CardHeader className={styles.cardHeader}>
                {element.name}
                <Icon
                  name={Icons[element.requestStatus] as SemanticICONS}
                  className={styles.cardIcon}
                />
              </CardHeader>
              <CardMeta>{element.title}</CardMeta>
              <CardDescription>{element.message}</CardDescription>
            </CardContent>
            <CardContent extra>
              <div>
                <Button positive onClick={(_e) => handleClick(element)}>
                  Open Request
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {isOpen && (
        <ContactRequestModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          contactRequest={contactRequest}
        />
      )}
    </>
  );
};

export default ContactRequestsCards;
