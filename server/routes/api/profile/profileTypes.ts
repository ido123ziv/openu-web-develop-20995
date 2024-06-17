export type ParentProfile = {
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

export type BabysitterProfile = {
  name: string;
  email: string;
  password: string;
  city: string;
  street: string;
  experience: string;
  phoneNumber: string;
  gender: string;
  imageString: string;
  comments?: string;
};

export type Validation = {
  isValid: boolean;
  message?: string;
};

export type BabysitterUpdate = {
  babysitterName?: string;
  email?: string;
  city?: string;
  street?: string;
  experience?: string;
  age?: number;
  phoneNumber?: string;
  gender?: string;
  comments?: string;
};

export type ParentUpdate = {
  parentName?: string;
  email?: string;
  city?: string;
  street?: string;
  gender?: string;
  phoneNumber?: string;
  minKidAge?: number;
  maxKidAge?: number;
  numOfKids?: number;
  comments?: string;
};
