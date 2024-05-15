export interface NewUser {
  firstName: string;
  lastName: string;
}

export interface Department {
  // _id: string;
  departmentName: string;
}

export interface Contact {
  firstName: string;
  lastName: string;
  photoURL?: string;
  email: string;
}

export enum Role {
  User = "User",
  Admin = "Admin",
  NotApproved = "Not approved",
}

export enum Gender {
  Male = "Male",
  Female = "Female",
}
export interface LoginCredentials {
  email: string;
  password: string;
}
