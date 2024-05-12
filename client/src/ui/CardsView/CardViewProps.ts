export interface CardsData {
  data: {
    image: string;
    header: string;
    meta: string;
    description: string;
  };
}

export interface CardsProps {
  data: CardsData[];
}
