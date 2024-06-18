export type Babysitter = {
  name: string;
  email: string;
  password: string;
  city: string;
  street: string;
  experience: string;
  age: number;
  phoneNumber: string;
  gender: string;
  imageString?: string;
  comments?: string;
  distance: string;
  contacted?: boolean;
  workedWith?: boolean;
  rating: number;
  didParentRate: number;
};

export type Validation = {
  isValid: boolean;
  message?: string;
};

export type Interaction = {
  contacted: boolean;
  workedWith: boolean;
};
