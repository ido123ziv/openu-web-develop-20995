export type User = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  gender: string;
  role: string;
  age?: number;
  experience?: string;
  imageString?: string;
  comments?: string;
  minKidAge?: number;
  maxKidAge?: number;
  numOfKids?: number;
};
