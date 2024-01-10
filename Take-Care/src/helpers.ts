import { doc, setDoc } from "firebase/firestore";
import { parentsCol } from "./services/firebase";
import { Role } from "./types/GenericTypes.types";
import { Timestamp } from "firebase/firestore";

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
/**
 * Convert a Date to `YYYY-MM-DD HH:mm:ss` string
 * @param date
 * @returns {string}
 */
export const dateToYmdHms = (date: Date) => {
  return Intl.DateTimeFormat("sv-SE", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
};

/**
 * Convert a Firebase Timestamp to a Date
 *
 * @param firebaseTimestamp
 * @returns {Date}
 */
export const firebaseTimestampToDate = (firebaseTimestamp: Timestamp) => {
  return firebaseTimestamp.toDate();
};

/**
 * Convert a Firebase Timestamp to an string
 *
 * @param firebaseTimestamp
 * @returns {string}
 */
export const firebaseTimestampToString = (firebaseTimestamp: Timestamp) => {
  return dateToYmdHms(firebaseTimestampToDate(firebaseTimestamp));
};
