import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  User,
  UserCredential,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import {
  auth,
  newChildCol,
  newParentCol,
  childrenCol,
  teachersCol,
} from "../services/firebase";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import {
  BasicChildProfile,
  BasicParentProfile,
  NewChildProfile,
  NewParentProfile,
} from "../types/CreateProfile.types";
import { Role } from "../types/GenericTypes.types";
import { KeyTeacher } from "../components/Forms/EditKeyTeacher";

type AuthContextType = {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  reloadUser: () => Promise<boolean>;
  resetPassword: (email: string) => Promise<void>;
  setEmail: (email: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    newParentProfile: BasicParentProfile,
    newChildProfile: BasicChildProfile
  ) => Promise<UserCredential>;
  userEmail: string | null;
  updateKeyTeacher: (
    childId: string,
    keyTeacher: KeyTeacher
  ) => Promise<false | void>;
  updateResponsibleForChildren: (
    teacherId: string,
    childId: string
  ) => Promise<false | void>;
};

// This creates the context and sets the context's initial/default value
export const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextProps = {
  children: React.ReactNode;
};

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const reloadUser = async () => {
    if (!auth.currentUser) {
      return false;
    }
    setUserEmail(auth.currentUser.email);

    return true;
  };

  const resetPassword = (email: string) => {
    if (!currentUser) {
      throw new Error("Current User is null!");
    }
    return sendPasswordResetEmail(auth, email);
  };

  const signUp = async (
    email: string,
    password: string,
    newParentProfile: BasicParentProfile,
    newChildProfile: BasicChildProfile
  ) => {
    // try to sign up user using email & password
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // if user is verified assign ids
      if (userCredential.user) {
        const parentUID = userCredential.user.uid;
        const childdocRef = doc(newChildCol);
        const parentdocRef = doc(newParentCol, parentUID);
        const childID = childdocRef.id;

        // assign defualt values to satisfy type. These will be overrided in the form component.
        const defaultParentProfile: NewParentProfile = {
          _id: "",
          contact: { firstName: "", lastName: "", email: "", photoURL: "" },
          role: Role.NotApproved,
          children: [""],
          childrenContact: {
            firstName: "",
            lastName: "",
            date_of_birth: new Date(),
          },
          isAuthorizedForPickUp: false,
        };

        // assign the auth id to the parent id to connect the user colleciton
        const newParent: NewParentProfile = {
          ...defaultParentProfile,
          ...newParentProfile,
          _id: parentUID,
          children: [childID],
        };

        // assign the parent id inside the children doc to connect the collections
        const newChild: NewChildProfile = {
          ...newChildProfile,
          _id: childID,
          parents: [parentUID],
        };

        await setDoc(parentdocRef, newParent);
        await setDoc(childdocRef, newChild);
      }
      return userCredential;
    } catch (error) {
      throw new Error();
    }
  };

  const setEmail = (email: string) => {
    if (!currentUser) {
      throw new Error("Current User is null!");
    }
    return updateEmail(currentUser, email);
  };

  const updateKeyTeacher = async (childId: string, keyTeacher: KeyTeacher) => {
    if (!auth.currentUser) {
      return false;
    }
    const childDocRef = doc(childrenCol, childId);

    return await updateDoc(childDocRef, { keyTeacher: keyTeacher });
  };

  const updateResponsibleForChildren = async (
    teacherId: string,
    childId: string
  ) => {
    if (!auth.currentUser) {
      return false;
    }
    const teacherDocRef = doc(teachersCol, teacherId);

    return await updateDoc(teacherDocRef, {
      responsibileForChildren: arrayUnion(childId),
    });
  };

  // auth-state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user) {
        // User is logged in
        setUserEmail(user.email);
      } else {
        // No user is logged in
        setUserEmail(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
        reloadUser,
        resetPassword,
        setEmail,
        signUp,
        updateKeyTeacher,
        updateResponsibleForChildren,
        userEmail,
      }}
    >
      {loading ? <div>loading...</div> : <>{children}</>}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
