import { GenericName } from "./GenericTypes.types";

export interface ChildProfile extends Omit<GenericName, "_id"> {
  dob: Date;
  department: string;
}

export interface ParentProfile extends Omit<GenericName, "_id"> {
  email: string;
}

export interface FamilyProfile {
  child: ChildProfile;
  parent: ParentProfile;
}
