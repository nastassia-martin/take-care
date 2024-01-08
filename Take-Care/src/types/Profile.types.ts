import {
  Department,
  Gender,
  NewUser,
  Contact,
  Role,
} from "./GenericTypes.types";

export interface NewChildProfile {
  _id: string;
  contact: {
    firstName: string;
    lastName: string;
    photoURL: string;
  };
  date_of_birth: Date;
  parents: string[];
}

export interface BasicParentProfile {
  contact: Contact;
}

export interface BasicChildProfile {
  contact: {
    firstName: string;
    lastName: string;
    photoURL: string;
  };
  date_of_birth: Date;
}

export interface NewParentProfile {
  _id: string;
  contact: Contact;
  role: Role;
  children: string[];
  childrenContact: {
    firstName: string;
    lastName: string;
    date_of_birth: Date;
  };
  isAuthorizedForPickUp: boolean;
  password?: string;
}

export interface NewTeacherProfile {
  contact: Contact;
  role: Role.Admin;
}

export interface TeacherProfile {
  _id: string;
  contact: Contact;
  department: Department;
  role: Role.Admin;
  responsibileForChildren: string[];
}
export interface ChildProfile {
  _id: string;
  contact: Omit<Contact, "email">;
  department: string;
  //gender: Gender;
  date_of_birth: Date;
  keyTeacher: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  allergies: string;
  parents: string[];
}

export type KeyTeacher = {
  _id: string;
  firstName: string;
  lastName: string;
  childId?: string;
};
export type ParentProfile = Omit<NewParentProfile, "password">;

export interface FamilyProfile {
  child: NewChildProfile;
  parent: NewParentProfile;
}

export interface NewParentCredential {
  parent: {
    firstName: string;
    lastName: string;
    email: string;
    role?: Role.User;
    password?: string;
  };
  child: {
    firstName: string;
    lastName: string;
    date_of_birth: Date;
  };
}
