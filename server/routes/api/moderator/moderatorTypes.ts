export type User = {
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
};

export type ContactRequest = {
  requestStatus: string;
  name: string;
  email: string;
  title: string;
  message: string;
};
