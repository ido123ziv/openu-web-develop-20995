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
  workingHours: WorkingHours;
  comments?: string;
};

type WorkingHours = {
  sunday: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
};
