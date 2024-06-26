export interface CardsData {
  id: number;
  name: string;
  email: string;
  gender: string;
  phoneNumber: string;
  comments: string;
  imageString?: string;
  role: "babysitter" | "parent";

  // Parent unique properties
  minKidAge?: number;
  maxKidAge?: number;
  numOfKids?: number;

  // Babysitter unique properties
  age?: number;
  experience?: string;
  city?: string;
  street?: string;
  distance?: string;
  contacted?: boolean;
  workedWith?: boolean;
  rating?: number;
  didParentRate?: number;
}

export interface CardsDataArr {
  data: CardsData[] | undefined;

  // Moderator Screen
  screen?: string;
}
