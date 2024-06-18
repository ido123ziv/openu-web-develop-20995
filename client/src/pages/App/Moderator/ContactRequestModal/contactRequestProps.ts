import { ContactData } from "../ContactRequestsCards/ContactRequestsCardsProps";

export interface contactRequestProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  contactRequest: ContactData | undefined;
}
