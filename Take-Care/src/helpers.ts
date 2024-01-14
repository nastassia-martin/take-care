import { doc, setDoc } from "firebase/firestore";
import { parentsCol, storage } from "./services/firebase";
import { Role } from "./types/GenericTypes.types";
import { Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

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

export const uploadPhotoAndGetURL = async (
  photoFile: File,
  teacherId: string
) => {
  const uuid = uuidv4();
  const fileRef = ref(
    storage,
    `posts/${teacherId}/photos/${uuid}/${photoFile.name}`
  );

  await uploadBytesResumable(fileRef, photoFile); // Await the upload

  const url = await getDownloadURL(fileRef); // Get the download URL after upload is complete
  return url;
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
