export interface ChildProfile extends GenericName {
  dob: Date;
  department: string;
}

interface GenericName {
  firstName: string;
  lastName: string;
}
