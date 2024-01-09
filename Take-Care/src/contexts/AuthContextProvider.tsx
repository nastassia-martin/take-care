import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  auth,
  newChildCol,
  newParentCol,
  childrenCol,
  teachersCol,
  parentsCol,
  postsCol,
} from "../services/firebase";
import { Role } from "../types/GenericTypes.types";
import {
  BasicChildProfile,
  BasicParentProfile,
  NewChildProfile,
  NewParentProfile,
  KeyTeacher,
} from "../types/Profile.types";
import { NewPost } from "../types/Posts.types";

type AuthContextType = {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  setPassword: (password: string) => Promise<void>;
  reloadUser: () => Promise<boolean>;
  resetPassword: (email: string) => Promise<void>;
  setEmail: (email: string) => Promise<void>;
  setPhotoUrl: (photoURL: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    newParentProfile: BasicParentProfile,
    newChildProfile: BasicChildProfile
  ) => Promise<UserCredential>;
  userEmail: string | null;
  userPhotoUrl: string | null;
  updateKeyTeacher: (
    childId: string,
    keyTeacher: KeyTeacher,
    parentId: string
  ) => Promise<void>;
  updateResponsibleForChildren: (
    teacherId: string,
    childId: string
  ) => Promise<void>;
  updateParentPhotoUrl: (parentId: string, photoURL: string) => Promise<void>;
  updateTeacherPhotoUrl: (teacherId: string, photoURL: string) => Promise<void>;
  updateChildPhotoUrl: (childId: string, photoURL: string) => Promise<void>;
  removeResponsibleForChild: (
    keyTeacher: KeyTeacher,
    childId: string,
    parentId: string
  ) => Promise<void>;
  createAPost: (data: NewPost, teacherId: string) => Promise<void>;
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
  const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null);

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
    setUserPhotoUrl(auth.currentUser.photoURL);

    return true;
  };

  const createAPost = async (data: NewPost, teacherId: string) => {
    if (!currentUser) {
      throw new Error("Current User is null!");
    }
    try {
      const docRef = doc(postsCol);

      await setDoc(docRef, {
        ...data,
        id: docRef.id,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        authorId: teacherId,
      });
    } catch (error) {
      console.log(createAPost);
    }
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
        updateProfile(userCredential.user, {
          displayName: newParent.contact.firstName,
        });
        await setDoc(childdocRef, newChild);
      }
      return userCredential;
    } catch (error) {
      throw new Error("Server error");
    }
  };

  const setEmail = (email: string) => {
    if (!currentUser) {
      throw new Error("Current User is null!");
    }
    return updateEmail(currentUser, email);
  };

  const setPassword = (password: string) => {
    if (!currentUser) {
      throw new Error("There is no current user");
    }
    return updatePassword(currentUser, password);
  };

  const updateKeyTeacher = async (
    childId: string,
    keyTeacher: KeyTeacher,
    parentId: string
  ) => {
    // only teachers who have admin status are authorised to do this operation
    if (!auth.currentUser) {
      throw new Error("There is no current user");
    }
    const childDocRef = doc(childrenCol, childId);
    const parentDocRef = doc(parentsCol, parentId);

    const keyTeacherWithChildId = { ...keyTeacher, childId };

    await updateDoc(parentDocRef, {
      keyTeacher: arrayUnion(keyTeacherWithChildId),
    });
    return await updateDoc(childDocRef, { keyTeacher: keyTeacher });
  };

  const updateResponsibleForChildren = async (
    teacherId: string,
    childId: string
  ) => {
    if (!auth.currentUser) {
      throw new Error("There is no current user");
    }
    const teacherDocRef = doc(teachersCol, teacherId);

    return await updateDoc(teacherDocRef, {
      responsibileForChildren: arrayUnion(childId),
    });
  };

  const removeResponsibleForChild = async (
    keyTeacher: KeyTeacher,
    childId: string,
    parentId: string
  ) => {
    if (!auth.currentUser) {
      throw new Error("There is no current user");
    }
    const teacherDocRef = doc(teachersCol, keyTeacher._id);
    const parentDocRef = doc(parentsCol, parentId);

    const keyTeacherWithChildId = { ...keyTeacher, childId };

    await updateDoc(parentDocRef, {
      keyTeacher: arrayRemove(keyTeacherWithChildId),
    });
    return await updateDoc(teacherDocRef, {
      responsibileForChildren: arrayRemove(childId),
    });
  };

  const setPhotoUrl = (photoURL: string) => {
    if (!currentUser) {
      throw new Error("There is no current user");
    }
    setUserPhotoUrl(photoURL);
    return updateProfile(currentUser, { photoURL });
  };

  const updateParentPhotoUrl = async (parentId: string, photoURL: string) => {
    if (!currentUser) {
      throw new Error("There is no current user");
    }
    try {
      const parentdoc = doc(parentsCol, parentId);
      const updatedProfile = { "contact.photoURL": photoURL };
      return await updateDoc(parentdoc, updatedProfile);
    } catch (error) {
      throw new Error("Server error");
    }
  };

  const updateTeacherPhotoUrl = async (teacherId: string, photoURL: string) => {
    if (!currentUser) {
      throw new Error("There is no current user");
    }
    try {
      const teacherdoc = doc(teachersCol, teacherId);
      const updatedProfile = { "contact.photoURL": photoURL };
      return await updateDoc(teacherdoc, updatedProfile);
    } catch (error) {
      throw new Error("Server error");
    }
  };

  const updateChildPhotoUrl = async (childId: string, photoURL: string) => {
    if (!currentUser) {
      throw new Error("There is no current user");
    }
    try {
      const childDoc = doc(childrenCol, childId);
      const updatedProfile = { "contact.photoURL": photoURL };
      return await updateDoc(childDoc, updatedProfile);
    } catch (error) {
      throw new Error("Server error");
    }
  };

  // auth-state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);

      if (user) {
        // User is logged in
        setUserEmail(user.email);
        setUserPhotoUrl(user.photoURL);
      } else {
        // No user is logged in
        setUserEmail(null);
        setUserPhotoUrl(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        createAPost,
        login,
        logout,
        reloadUser,
        resetPassword,
        setEmail,
        setPhotoUrl,
        userPhotoUrl,
        setPassword,
        signUp,
        updateKeyTeacher,
        updateChildPhotoUrl,
        updateParentPhotoUrl,
        updateTeacherPhotoUrl,
        updateResponsibleForChildren,
        removeResponsibleForChild,
        userEmail,
      }}
    >
      {loading ? <div>loading...</div> : <>{children}</>}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
