interface User {
  email: string;
  role: string;
}

export interface IParentUser extends User {
  parent_id: number;
  parent_name: string;
}

export interface IBabysitterUser extends User {
  babysitter_id: number;
  babysitter_name: string;
}
