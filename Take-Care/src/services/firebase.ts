import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  CollectionReference,
  DocumentData,
  collection,
  getFirestore,
} from "firebase/firestore";
import {
  ChildProfile,
  NewChildProfile,
  NewParentProfile,
  NewTeacherProfile,
  ParentProfile,
  TeacherProfile,
} from "../types/CreateProfile.types";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get firestore instance
export const db = getFirestore(app);

// Get auth instance
export const auth = getAuth(app);

// Helper function to add type to db responses
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};

// Export collection references

// Current collections - READ
export const parentsCol = createCollection<ParentProfile>("parents");
export const childrenCol = createCollection<ChildProfile>("children");
export const teachersCol = createCollection<TeacherProfile>("teachers");

// New collections - CREATE
export const newChildCol = createCollection<NewChildProfile>("children");
export const newParentCol = createCollection<NewParentProfile>("parents");
export const newTeacherCol = createCollection<NewTeacherProfile>("teachers");
