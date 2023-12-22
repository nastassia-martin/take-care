export interface NewUser {
  firstName: string;
  lastName: string;
}

export interface Department {
  _id: string;
  departmentName: string;
}

export interface Contact {
  firstName: string;
  lastName: string;
  photoURL: string;
  email: string;
}
export enum Role {
  User = "user",
  Admin = "admin",
}

export enum Gender {
  Male = "male",
  Female = "female",
}
