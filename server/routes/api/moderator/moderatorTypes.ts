export type User = {
  id: number;
  name: string;
  email: string;
  gender: string;
  phoneNumber: string;
  comments: string;
  role: "babysitter" | "parent";

  imageString?: string;
  minKidAge?: number;
  maxKidAge?: number;
  numOfKids?: number;

  age?: number;
  experience?: string;
};
