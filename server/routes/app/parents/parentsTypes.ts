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