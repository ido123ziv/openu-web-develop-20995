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
  imageString: string;
  comments?: string;
};

export type Validation = {
  isValid: boolean;
  message?: string;
};

export type Interaction = {
  contacted: boolean;
  workedWith: boolean;
};
