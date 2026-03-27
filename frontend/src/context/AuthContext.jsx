import { createContext, useContext, useState, useEffect } from "react";
import { apiLogin, apiMe, apiSignup } from "../lib/backendClient";

const AuthContext = createContext(null);

const SESSION_KEY = "auditmystore_session";
const TOKEN_KEY = "auditmystore_token";

function getSession() {
   try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
   } catch {
      return null;
   }
}

function saveSession(user) {
   if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
   } else {
      localStorage.removeItem(SESSION_KEY);
   }
}

function getToken() {
   try {
      return localStorage.getItem(TOKEN_KEY) || "";
   } catch {
      return "";
   }
}

function saveToken(token) {
   try {
      if (token) localStorage.setItem(TOKEN_KEY, token);
      else localStorage.removeItem(TOKEN_KEY);
   } catch {
      // ignore
   }
}

export function AuthProvider({ children }) {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

   // Restore session on mount
   useEffect(() => {
      const session = getSession();
      const token = getToken();

      if (session) setUser(session);

      async function init() {
         // If we don't have a token, we can only show the cached session (if any).
         if (!token) return;
         try {
            const res = await apiMe(token);
            if (res?.success && res.user) {
               setUser(res.user);
               saveSession(res.user);
            }
         } catch {
            // Backend may be down; keep cached session.
         }
      }

      init().finally(() => setLoading(false));
   }, []);

   const signup = async (name, email, password) => {
      const res = await apiSignup(name, email, password);
      if (!res.success) return { success: false, message: res.message || "Signup failed." };

      saveToken(res.token);
      setUser(res.user);
      saveSession(res.user);

      return { success: true, user: res.user };
   };

   const login = async (email, password) => {
      const res = await apiLogin(email, password);
      if (!res.success) return { success: false, message: res.message || "Login failed." };

      saveToken(res.token);
      setUser(res.user);
      saveSession(res.user);

      return { success: true, user: res.user };
   };

   const logout = () => {
      setUser(null);
      saveToken("");
      saveSession(null);
   };

   const value = {
      user,
      isAuthenticated: !!user,
      loading,
      signup,
      login,
      logout,
   };

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
   const ctx = useContext(AuthContext);
   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
   return ctx;
}

export default AuthContext;
