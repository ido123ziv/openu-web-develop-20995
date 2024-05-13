import { CardsData } from "../CardsView/CardViewProps";

export interface ModalViewProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  card: CardsData | undefined;
}
