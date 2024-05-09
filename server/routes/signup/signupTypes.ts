export type Validation = {
  isValid: boolean;
  message?: string;
};

export type ParentSignup = {
  name: string;
  email: string;
  password: string;
  city: string;
  street: string;
  gender: string;
  phoneNumber: string;
  minKidAge: number;
  maxKidAge: number;
  numOfKids: number;
  comments: string;
};

export type BabysitterSignup = {
  name: string;
  email: string;
  password: string;
  city: string;
  street: string;
  experience: string;
  age: number;
  phoneNumber: string;
  gender: string;
  comments?: string;
};
