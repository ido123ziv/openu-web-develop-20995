import { CardsData } from "../CardsView/CardViewProps";

export interface ModalViewProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  card: CardsData | undefined;

  screen?: string;
}

export interface Interaction {
  contacted: boolean;
  workedWith: boolean;
}
