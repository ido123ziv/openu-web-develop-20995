export type Validation = {
  isValid: boolean;
  message?: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type UserLogin = {
  id: number;
  name: string;
  password: string;
  role: string;
};

export type UserDetails = {
  id: number;
  name: string;
  role: string;
};
