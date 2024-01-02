import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
  updateEmail,
  User,
  UserCredential,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";

type AuthContextType = {
  currentUser: User | null;
  logout: () => Promise<void>;
  reloadUser: () => Promise<boolean>;
  resetPassword: (email: string) => Promise<void>;
  setEmail: (email: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  userEmail: string | null;
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
  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const setEmail = (email: string) => {
    if (!currentUser) {
      throw new Error("Current User is null!");
    }
    return updateEmail(currentUser, email);
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
        userEmail,
        setEmail,
        signUp,
        logout,
        reloadUser,
        resetPassword,
      }}
    >
      {loading ? <div>im not ready</div> : <>{children}</>}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
