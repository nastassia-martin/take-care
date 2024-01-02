import {
  Department,
  Gender,
  NewUser,
  Contact,
  Role,
} from "./GenericTypes.types";

export interface NewChildProfile extends NewUser {
  date_of_birth: Date;
  department: string;
}

export interface NewParentProfile extends NewUser {
  email: string;
  role: Role.User;
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
  keyTeacher: string;
  allergies: string;
  parents: string[];
}

export interface ParentProfile {
  _id: string;
  contact: Contact;
  children: string[];
  //keyTeacher: Pick<NewTeacherProfile, "contact">;
  isAuthorizedForPickUp: boolean;
  role: Role.User;
}

export interface FamilyProfile {
  child: NewChildProfile;
  parent: NewParentProfile;
}

export interface NewParentCredential {
  parent: {
    firstName: string;
    lastName: string;
    email: string;
    //role: Role.User;
    password?: string;
  };
  child: {
    firstName: string;
    lastName: string;
    date_of_birth: Date;
  };
}
