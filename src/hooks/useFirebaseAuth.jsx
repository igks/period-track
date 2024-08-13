import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../services/fb";
import { useUser } from "../states/userState";

const useFirebaseAuth = () => {
  const [loading, setLoading] = useState(false);
  const { setUser, resetUser } = useUser((state) => state);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, username, password);
      setUser(res.user);
    } catch (e) {
      console.log("Login failed", e);
    }
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    auth.signOut();
    resetUser();
    setLoading(false);
  };

  const checkActiveUser = () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  };

  return {
    login,
    logout,
    loading,
    checkActiveUser,
  };
};

export default useFirebaseAuth;
