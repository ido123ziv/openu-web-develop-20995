export interface CardsData {
  id: number;
  name: string;
  gender: string;
  email: string;
  phoneNumber?: string; //TODO: ADD TO THE REQUEST
  role: string;
  image?: string;
  comment?: string;
}

export interface CardsProps {
  data: CardsData[];
}
