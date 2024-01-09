import { doc, setDoc } from "firebase/firestore";
import { parentsCol } from "./services/firebase";
import { Role } from "./types/GenericTypes.types";

export const updateParentRole = async (
  parentId: string,
  newRole: Role,
  isAuthorizedForPickUp: boolean
) => {
  const parentDocRef = doc(parentsCol, parentId);
  await setDoc(
    parentDocRef,
    { role: newRole, isAuthorizedForPickUp },
    { merge: true }
  );
};
