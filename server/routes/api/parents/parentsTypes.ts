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
  comments?: string;
  distance: number;
  contacted?: boolean;
  workedWith?: boolean;
  rating: number;
  didParentRate: boolean;
};

export type Validation = {
  isValid: boolean;
  message?: string;
};

export type Interaction = {
  contacted: boolean;
  workedWith: boolean;
};
