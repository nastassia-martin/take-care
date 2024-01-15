import { doc, setDoc } from "firebase/firestore";
import { parentsCol, storage, childrenCol } from "./services/firebase";
import { Role } from "./types/GenericTypes.types";
import { Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { getDocs, query, where } from "firebase/firestore";

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

export const getChildIdForSecondCareGiver = async (
  firstName: string,
  lastName: string
) => {
  const querySnapshot = await getDocs(
    query(
      childrenCol,
      where("contact.firstName", "==", firstName),
      where("contact.lastName", "==", lastName)
    )
  );
  if (querySnapshot.empty) {
    throw new Error("no child found!");
  } else if (querySnapshot.docs.length > 1) {
    throw new Error("We found too many matches");
  } else {
    const childDoc = querySnapshot.docs[0];
    return childDoc ? childDoc.id : null;
  }
};
