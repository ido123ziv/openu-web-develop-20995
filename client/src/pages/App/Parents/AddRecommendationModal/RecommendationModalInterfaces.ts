import { FieldValues } from "react-hook-form";

export interface ModalAddReviewProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  parentId: number;
  babysitterId: number | undefined;
  babysitterName: string | undefined;
}

export interface IAxiosResponse {
  message?: string;
}

export interface FormData {
  data: FieldValues;
  babysitterId: number | undefined;
  parentId: number;
}
