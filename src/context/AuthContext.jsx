import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider(props) {
  const { children } = props;
  const [globalUser, setGlobalUser] = useState(null);
  const [globalData, setGlobalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }
  function logout() {
    setGlobalUser(null);
    setGlobalData(null);
    return signOut(auth);
  }
  const value = {
    globalUser,
    globalData,
    setGlobalData,
    isLoading,
    signup,
    login,
    logout,
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Current user:", user);
      setGlobalUser(user);
      // no user, empty user state and return this listener
      if (!user) {
        console.log("No User");
        return;
      }
      // if have user, then check if the user has data? then fecth call data and update the global state
      try {
        //create a ref for doc then get the doc and snapshot it to see if there's anything here ?
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        setIsLoading(true);
        let firebaseData = {};
        if (docSnap.exists()) {
          firebaseData = docSnap.data();
          console.log("Found user data", firebaseData);
        }
        setGlobalData(firebaseData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
