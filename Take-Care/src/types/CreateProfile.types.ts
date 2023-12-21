import { GenericName } from "./GenericTypes.types";

export interface ChildProfile extends GenericName {
  dob: Date;
  department: string;
}

export interface ParentProfile extends GenericName {
  email: string;
}

export interface FamilyProfile {
  child: ChildProfile;
  parent: ParentProfile;
}
