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
}

export interface NewTeacherProfile {
  _id: string;
  contact: NewUser;
  role: Role.Admin;
}

export interface TeacherProfile {
  _id: string;
  contact: Contact;
  department: Department;
  role: Role.Admin;
  responsibileForChildren: Omit<Contact, "email">[];
}
export interface ChildProfile {
  _id: string;
  contact: Omit<Contact, "email">;
  department: Department;
  gender: Gender;
  date_of_birth: Date;
  keyTeacher: string;
  allergies: string;
  parents: Contact[];
}

export interface ParentProfile {
  _id: string;
  contact: Contact;
  children: ChildProfile[];
  keyTeacher: Pick<NewTeacherProfile, "contact">;
  isAuthorizedForPickUp: boolean;
  role: Role.User;
}

export interface FamilyProfile {
  child: NewChildProfile;
  parent: NewParentProfile;
}
