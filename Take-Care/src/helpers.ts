import { doc, setDoc } from "firebase/firestore";
import { parentsCol } from "./services/firebase";
import { Role } from "./types/GenericTypes.types";

export const updateParentRole = async (parentId: string, newRole: Role) => {
  const parentDocRef = doc(parentsCol, parentId);
  await setDoc(parentDocRef, { role: newRole }, { merge: true });
};
